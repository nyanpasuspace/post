const { Router } = require("express");
const Session = require("../models").Session;
class SessionController {
  async init() {
    const router = Router();
    router.get("/", this.check);
    return router;
  }

  check = async (req, res) => {
    const sessionId = req.query.sessionId;
    if (sessionId) {
      Session.findOne({
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
        } else {
          res.status(200);
          res.send({
            code: 200,
            message: "Pong!",
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
  };
}

module.exports = async () => {
  const c = new SessionController();
  return await c.init();
};
