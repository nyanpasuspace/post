// 中间件
const { Router } = require('express');

module.exports = async function initMiddlewares() {
    const router = Router();
    // router.use();
    return router;
}