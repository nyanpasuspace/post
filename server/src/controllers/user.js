const { Router } = require("express");
const userService = require("../services/user");
const { where } = require("sequelize");
const Session = require("../models").Session;
class UserController {
  userService;

  async init() {
    this.userService = await userService();
    const router = Router();
    router.get("/:userId", this.getOne);
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
}

module.exports = async () => {
  const c = new UserController();
  return await c.init();
};
