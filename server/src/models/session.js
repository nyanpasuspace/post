`use strict`;
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize) => {
  class Session extends Model {
    static associate(models) {}
  }
  Session.init(
    {
      sid: Sequelize.STRING(36),
      expires: Sequelize.DATE,
      data: Sequelize.TEXT,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    },
    {
      sequelize,
      modelName: "Session",
      tableName: "Session",
    }
  );
  return Session;
};
