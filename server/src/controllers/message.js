const { Router } = require("express");
const Session = require("../models").Session;
const userService = require("../services/user");

class MessageController {
  userService;
  async init() {
    this.userService = await userService();
    const router = Router();
    router.get("/", this.getAll);
    router.get("/:query", this.getMessageList);
    return router;
  }

  getMessageList = async (req, res) => {
    try {
      const { logging } = req;
      const sessionId = req.query.sessionId;
      const userId = req.query.userId;
      const { query } = req.params;
      const sessionData = await Session.findOne({
        where: {
          sid: sessionId,
        },
      })
      .then(function (data){
        if(!data) {
          return null;
        }
        else {
          return data.dataValues.data;
        }
      })
      const sessionDataJSON = JSON.parse(sessionData);
      // console.log(sessionDataJSON);
      if(!Object(sessionDataJSON, null) && sessionDataJSON.logined) {
        res.status(400).send({
          code: 400,
          data: null,
          message: '会话过期'
        })
      }
      else {
        if(sessionDataJSON.user.id == userId) {
          // 返回公开 message 列表
          const userList = await this.userService.getSpecialMessage({ query, logging });
          res.status(200).send({
            code: 200,
            data: userList,
            message: '获取世界信息成功'
          })
        } 
        else {
          res.status(400).send({
            code: 400,
            data: null,
            message: '会话过期'
          })
        }
      }
    }
    catch(error) {
      console.log(error);
      res.status(400);
      res.send({
        code: 400,
        message: "服务器错误",
      });
    }
  }

  getAll = async (req, res) => {
    // console.log(req);
    try {
      const { logging } = req;
      const sessionId = req.query.sessionId;
      const userId = req.query.userId;
      const sessionData = await Session.findOne({
        where: {
          sid: sessionId,
        },
      })
      .then(function (data){
        if(!data) {
          return null;
        }
        else {
          return data.dataValues.data;
        }
      })
      const sessionDataJSON = JSON.parse(sessionData);
      // console.log(sessionDataJSON);
      if(!Object(sessionDataJSON, null) && sessionDataJSON.logined) {
        res.status(400).send({
          code: 400,
          data: null,
          message: '会话过期'
        })
      }
      else {
        if(sessionDataJSON.user.id == userId) {
          // 返回公开 message 列表
          const userList = await this.userService.getPublicMessage({ logging });
          res.status(200).send({
            code: 200,
            data: userList,
            message: '获取世界信息成功'
          })
        } 
        else {
          res.status(400).send({
            code: 400,
            data: null,
            message: '会话过期'
          })
        }
      }
    } 
    catch (error) {
      console.log(error);
      res.status(400);
      res.send({
        code: 400,
        message: "服务器错误",
      });
    }
  };
}

module.exports = async () => {
  const c = new MessageController();
  return await c.init();
};
