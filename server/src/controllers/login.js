const { Router } = require("express");
const User = require("../models").User;
const createUserSchema = require("../moulds/user");
const bcrypt = require("bcryptjs");
class LoginController {
  async init() {
    const router = Router();
    router.post("/", await this.post);
    return router;
  }

  post = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    var schemaInfo = false;
    try {
      await createUserSchema().validate({ username, password });
    }
    catch(e) {
        schemaInfo = false;
    }
    if(schemaInfo) {
      User.findOne({
        where: {
          username: username,
        },
      })
      .then(function (data) {
        if (!data) {
          res.status(401);
          res.send({
            code: 401,
            message: "登录失败",
          });
        }
        else {
          if (bcrypt.compareSync(password, data.dataValues.password)) {
            req.session.user = {
              username: username
            };
            req.session.logined = true;
            res.status(200);
            res.send({
              code: 200,
              message: "登录成功",
              sessionId: req.session.id
            });
          } else {
            req.session.logined = false;
            res.status(401);
            res.send({
              code: 401,
              message: "登录失败",
            });
          }
        }
      })
      .catch(function (error) {
        console.error("登录遇到错误:", error);
        req.session.logined = false;
        res.status(401);
        res.send({
          code: 401,
          message: "登录失败",
        });
      });
    }
    else {
      res.status(400);
      res.send({
        code: 400,
        message: '格式错误'
      })
    }
  };
}

module.exports = async () => {
  const c = new LoginController();
  return await c.init();
};
