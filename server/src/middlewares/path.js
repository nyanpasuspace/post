const { parse } = require('url');
const { homepagePath, loginPath, registerPath, apiList } = require('../config');
const path = require('path');
const { Router } = require('express');
const router = Router();
module.exports = function pathMiddleware() {
    const whiteList = Object.assign({}, apiList, {
        [homepagePath]: ['get'],
        [loginPath]: ['get'],
        [registerPath]: ['get']
    });
    return (req, res, next) => {
        const { pathname } = parse(req.url, true);
        if((whiteList[pathname] && whiteList[pathname].includes(req.method.toLowerCase()))) {
            next();
            return;
        }
        else {
            next();
            return;
        }
    }
}