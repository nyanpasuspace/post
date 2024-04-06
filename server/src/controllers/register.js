const { Router } = require('express');
const userService = require("../services/user");
const createUserSchema = require("../moulds/user");
const bcrypt = require('bcryptjs');

class RegisterController {
    userService;
    async init() {
        const router = Router();
        this.userService = await userService();
        router.post('/', await this.post);
        return router;
    }

    post = async (req, res) => {
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
            const hashPassword = bcrypt.hashSync(req.body.password, 10);
            const user = {
                username: username,
                password: hashPassword
            };
            try {
                await this.userService.create(user);
                res.status(200);
                res.send({
                    code: 200,
                    message: '注册成功'
                });
            }
            catch(error) {
                if(error.name === 'SequelizeUniqueConstraintError') {
                    res.status(409);
                    res.send({
                        code: 409,
                        message: '用户已存在'
                    })
                }
                else {
                    res.status(500);
                    res.send({
                        code: 500,
                        message: '服务器错误'
                    })
                }
            } 
        }
        else {
            res.status(400);
            res.send({
                code: 400,
                message: '格式错误'
            })
        }
    }
}

module.exports = async () => {
    const c = new RegisterController();
    return await c.init();
}