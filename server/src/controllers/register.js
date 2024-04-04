const { Router } = require('express');
const userService = require("../services/user");
const bcrypt = require('bcryptjs');
class RegisterController {
    userService;
    async init() {
        const router = Router();
        this.userService = await userService();
        router.post('/', this.post);
        return router;
    }

    post = async (req, res) => {
        // const username = req.body.username;
        // const password = bcrypt.hashSync(req.body.password, 10);
        const password = bcrypt.hashSync('123456', 10);
        const user = {
            username: 'username',
            password: password
        };
        const success = await this.userService.create(user);
        if (!success) {
            res.status(404);
        }
        res.redirect('/login.html');
    }
}

module.exports = async () => {
    const c = new RegisterController();
    return await c.init();
}