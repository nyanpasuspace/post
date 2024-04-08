'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    avatar_url: Sequelize.STRING,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  });
  return User;
};