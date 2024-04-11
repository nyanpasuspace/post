const { Router } = require("express");
const Session = require("../models").Session;
class SessionController {
  async init() {
    const router = Router();
    router.get("/", this.check);
    return router;
  }

  check = async (req, res) => {
    try {
      const sessionId = req.query.sessionId;
      const userId = req.query.userId;
      if (sessionId) {
        await Session.findOne({
          where: {
            sid: sessionId,
          },
        }).then(function (data) {
          if (!data) {
            res.status(401);
            res.send({
              code: 401,
              message: "Unauthorized??",
            });
          }
          else if(JSON.parse(data.dataValues.data).user.id == userId) {
            res.status(200);
            res.send({
              code: 200,
              message: "Pong!",
            });
          }
          else {
            res.status(401);
            res.send({
              code: 401,
              message: "Unauthorized",
            });
          }
        });
      } else {
        res.status(401);
        res.send({
          code: 401,
          message: "Unauthorized",
        });
      }
    }
    catch(error) {
      console.log(error.name);
      res.status(400);
      res.send({
        code: 400,
        message: "服务器错误",
      });
    }
  };
}

module.exports = async () => {
  const c = new SessionController();
  return await c.init();
};
