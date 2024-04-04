const { parse } = require('url');

module.exports = function loginMiddleware(
    homepagePath = '/',
    loginPath = '/login.html',
    whiteList = {
        '/api/login': ['post'],
        '/api/register': ['post']
    }
) {
    const registerPath = '/register.html';
    whiteList[loginPath] = ['get'];
    whiteList[registerPath] = ['get']; 
    return (req, res, next) => {
        const { pathname } = parse(req.url);
        if(req.session.logined && pathname == loginPath) {
            res.redirect(homepagePath);
            return;
        }
        if(req.session.logined || (whiteList[pathname] && whiteList[pathname].includes(req.method.toLowerCase()))) {
            next();
            return;
        }
        res.redirect(loginPath);
    }
}