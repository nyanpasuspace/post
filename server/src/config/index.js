const merge = require("lodash.merge");

const config = {
  default: {
    sessionCookieSecret: "842d918ced1888c65a650f993077c3d36b8f114d",
    sessionCookieMaxAge: 7 * 24 * 60 * 60 * 1000,
    homepagePath: "/",
    loginPath: "/login.html",
    registerPath: '/register.html',
    loginWhiteList: {
      "/api/login": ["post"],
      "/api/register": ["post"],
      "/api/session": ["get"],
    },
    db: {
      dialect: "sqlite",
      storage: "database/dev.db",
      define: {
        underscored: true,
      },
      migrationStorageTableName: "sequelize_meta",
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
      sessionCookieMaxAge: 3 * 24 * 60 * 60 * 1000,
      db: {
        storage: "database/index.db",
      },
    },
  },
};

module.exports = merge(
  {},
  config.default,
  config[process.env.NODE_ENV || "development"]
);
