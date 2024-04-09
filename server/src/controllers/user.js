const { Router } = require("express");
const userService = require("../services/user");
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
      const { sessionId } = req.query.sessionId;
      const userList = await this.userService.find({ id: userId, logging: logging });
  
      if (userList.length) {
        res.status(200).send({ code: 200, data: userList[0], message: '用户信息获取成功'});
      } else {
        res.status(404).send({ code: 404, data: null, message: '用户不存在'});
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
