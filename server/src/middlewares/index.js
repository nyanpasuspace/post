// 中间件
const { Router } = require('express');
const cookieParser = require('cookie-parser');
const loginMiddleware = require('./login');
const sessionMiddleware = require('./session');
const { sessionCookieSecret } = require('../config');

module.exports = async function initMiddlewares() {
    const router = Router();
    router.use(cookieParser(sessionCookieSecret));
    router.use(sessionMiddleware());
    router.use(loginMiddleware());
    return router;
}