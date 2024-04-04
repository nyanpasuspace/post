// 中间件
const { Router } = require('express');
const cookieParser = require('cookie-parser');
const loginMiddleware = require('./login');
const sessionMiddleware = require('./session');

const secret = '842d918ced1888c65a650f993077c3d36b8f114d';

module.exports = async function initMiddlewares() {
    const router = Router();
    router.use(cookieParser(secret));
    router.use(sessionMiddleware(secret));
    router.use(loginMiddleware());
    return router;
}