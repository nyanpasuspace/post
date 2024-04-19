const { Router } = require("express");
const userController = require("./user");
const loginController = require('./login');
const registerController = require('./register');
const sessionController = require('./session');
const messageController = require('./message');

module.exports = async function initControllers() {
    const router = Router();
    router.use("/api/user", await userController());
    router.use('/api/login', await loginController());
    router.use('/api/register', await registerController());
    router.use('/api/session', await sessionController());
    router.use('/api/message', await messageController());
    return router;
};
