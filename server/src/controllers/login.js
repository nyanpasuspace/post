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
    try {
      const username = req.body.username;
      const password = req.body.password;
      var schemaInfo = true;
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
              message: "用户名不存在，登录失败",
            });
          }
          else {
            if (bcrypt.compareSync(password, data.dataValues.password)) {
              req.session.user = {
                username: username,
                id: data.dataValues.id
              };
              req.session.logined = true;
              res.status(200);
              res.send({
                code: 200,
                message: "登录成功",
                sessionId: req.session.id,
                userid: data.dataValues.id
              });
            } else {
              res.status(401);
              res.send({
                code: 401,
                message: "密码错误，登录失败",
              });
            }
          }
        })
        .catch(function (error) {
          console.error("登录遇到错误:", error);
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
    }
    catch(error) {
      console.log(error.name);
      res.status(400);
      res.send({
        code: 400,
        message: '服务器错误'
      })
    }
  };
}

module.exports = async () => {
  const c = new LoginController();
  return await c.init();
};
