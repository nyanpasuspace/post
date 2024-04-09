// 中间件
const { Router } = require('express');
const cookieParser = require('cookie-parser');
const pathMiddleware = require('./path');
const sessionMiddleware = require('./session');
const { sessionCookieSecret } = require('../config');
const traceMiddleware = require('./trace');
module.exports = async function initMiddlewares() {
    const router = Router();
    router.use(traceMiddleware());
    router.use(cookieParser(sessionCookieSecret));
    router.use(sessionMiddleware());
    router.use(pathMiddleware());
    return router;
}