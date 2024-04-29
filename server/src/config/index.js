const merge = require("lodash.merge");
const logger = require('../utils/logger');
const { logging } = logger;
const config = {
  default: {
    sessionCookieSecret: "842d918ced1888c65a650f993077c3d36b8f114d",
    sessionCookieMaxAge: 7 * 24 * 60 * 60 * 1000,
    homepagePath: "/",
    loginPath: "/login.html",
    registerPath: '/register.html',
    apiList: {
      "/api/login": ["post"],
      "/api/register": ["post"],
      "/api/session": ["get"],
      "/api/user/:userId": ['get', 'put'],
      "/api/config": ['get'],
    },
    db: {
      dialect: "sqlite",
      storage: "database/default.db",
      benchmark: true,
      logging: logging(logger, 'debug'),
      define: {
        underscored: true,
      },
      migrationStorageTableName: "sequelize_meta",
    },
  },

  development: {
    db: {
      storage: "database/dev.db",
    },
  },

  test: {
    db: {
      storage: "database/test.db",
    },
  },

  production: {
    db: {
      storage: "database/production.db",
    },
  },
};

module.exports = merge(
  {},
  config.default,
  config[process.env.NODE_ENV || "development"]
);
