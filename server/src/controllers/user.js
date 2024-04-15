const { Router } = require("express");
const userService = require("../services/user");
const Session = require("../models").Session;
const mastodonTest = require('../utils/mastodonTest');
class UserController {
  userService;

  async init() {
    this.userService = await userService();
    const router = Router();
    router.get("/:userId", this.getOne);
    router.put("/:userId", this.modifyOne);
    return router;
  }

  getOne = async (req, res) => {
    try {
      const { logging } = req;
      const { userId } = req.params;
      const sessionId = req.query.sessionId;
      const sessionData = await Session.findOne({
        where: {
          sid: sessionId,
        },
      })
      .then(function (data) {
        if(!data) {
          return null;
        }
        else {
          return data.dataValues.data;
        }
      });
      const sessionDataJSON = JSON.parse(sessionData);
      if(Object.is(sessionDataJSON, null)) {
        res.status(400).send({
          code: 400,
          data: null,
          message: '会话过期'
        })
      }
      else if(!sessionDataJSON.logined) {
        res.status(400).send({
          code: 400,
          data: null,
          message: '会话过期'
        })
      }
      else {
        if(sessionDataJSON.user.id == userId) {
          const user = await this.userService.find({ id: userId, logging: logging });
          res.status(200).send({
            code: 200,
            data: user,
            message: '获取用户信息成功'
          })
        }
        else {
          res.status(400).send({
            code: 400,
            data: null,
            message: '未授权'
          });
        }
      }
    }
    catch(error) {
      console.log(error.message);
      res.status(404).send({
        code: 404,
        data: null,
        message: '参数错误'
      });
    }
  };

  modifyOne = async (req, res) => {
    try {
      const { logging } = req;
      const userId = req.params.userId;
      const sessionId = req.body.sessionId;
      const updateData = {};
      const sessionData = await Session.findOne({
        where: {
          sid: sessionId,
        },
      })
      .then(function (data) {
        if(!data) {
          return null;
        }
        else {
          return data.dataValues.data;
        }
      });
      const sessionDataJSON = JSON.parse(sessionData);
      if(Object.is(sessionDataJSON, null)) {
        res.status(400).send({
          code: 400,
          data: null,
          message: '会话过期'
        })
      }
      else if(!sessionDataJSON.logined) {
        res.status(400).send({
          code: 400,
          data: null,
          message: '会话过期'
        })
      }
      else {
        // TODO 使用 Yup 校验
        if(sessionDataJSON.user.id == userId) {
          // console.log(req.body.data);
          if(typeof req.body.data.message !== 'undefined') {
            updateData.message = req.body.data.message;
          }
          if(typeof req.body.data.isSendToWorld !== 'undefined') {
            // console.log(req.body.data.isSendToWorld);
            if(!req.body.data.isSendToWorld) {
              updateData.is_send_to_world = 0;
            }
            else {
              updateData.is_send_to_world = 1;
            }
          }
          if(typeof req.body.data.mastodonInstance !== 'undefined' && typeof req.body.data.mastodonToken !== 'undefined') {
            if(await mastodonTest(req.body.data.mastodonInstance, req.body.data.mastodonToken)) {
              updateData.mastodon_instance = req.body.data.mastodonInstance;
              updateData.mastodon_token = req.body.data.mastodonToken;
            }
            else {
              res.status(400).send({
                code: 400,
                message: '请求错误'
              });
              return;
            }
          }
          if(typeof req.body.data.sendTime !== 'undefined') {
            const tempData = Object.assign({}, req.body.data);
            if(Number(tempData.sendTime.sendTime,10) !== NaN && Number.isInteger(tempData.sendTime / 1) && tempData.sendTime / 1 >= 1 && tempData.sendTime / 1 <= 36500) {
              updateData.send_time = req.body.data.sendTime;
            }
            else {
              console.log(typeof(tempData.sendTime));
              res.status(400).send({
                code: 400,
                message: '请求错误'
              });
              return;
            }
          }
          if(await this.userService.modify({
            id: userId,
            values: updateData,
            logging: logging 
          })) {
            res.status(200).send({
              code: 200,
              message: '修改成功'
            });
          }
          else {
            res.status(400).send({
              code: 400,
              message: '请求错误'
            });
          }
        }
        else {
          res.status(400).send({
            code: 400,
            data: null,
            message: '未授权'
          });
        }
      }
    }
    catch(error) {
      console.log(error.message);
      res.status(400).send({
        code: 400,
        message: '请求错误'
      });
    }
  }
}

module.exports = async () => {
  const c = new UserController();
  return await c.init();
};
