const express = require('express');
const { resolve } = require('path');
const { promisify } = require('util');
const bodyParser = require('body-parser');
const cors = require('cors');
const initSchedules = require('./schedules');
const initControllers = require('./controllers');
const initMiddlewares = require('./middlewares');
const logger = require('./utils/logger');
const helmet = require('helmet');
const server = express();
const port = parseInt(process.env.PORT || '9000');
const publicDir = resolve('public');

async function bootstrap() {
    server.use(cors({
      origin: [process.env.WEB, 'http://localhost:5173'],
      methods: ['GET', 'POST', 'PUT'],
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
    }));
    server.use(helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", 'unsafe-inline'],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      }      
    }));
    server.use(bodyParser.json());
    // parse application/x-www-form-urlencoded
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(await initMiddlewares());
    server.use(express.static(publicDir));
    server.use(await initControllers());
    await initSchedules();
    await promisify(server.listen.bind(server, port))();
    logger.info(`> Started on http://localhost:${port}`);
}

// 监听未捕获的 Promise 异常，
// 直接退出进程
process.on('unhandledRejection', (err) => {
  console.error(err);
  logger.fatal(err);
  process.exit(1);
});

// 监听未捕获的同步异常与 Thunk 异常，
// 输出错误日志
process.on('uncaughtException', (err) => {
  logger.fatal(err);
  process.exit(1);
});

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    // 如果是在返回响应结果时发生了异常，
    // 那么交给 express 内置的 finalhandler 关闭链接
    return next(err);
  }

  // 打印异常
  console.error(err);
  req.logger.error(err);
  // 重定向到异常指引页面
  res.redirect('/500.html');
}

bootstrap();