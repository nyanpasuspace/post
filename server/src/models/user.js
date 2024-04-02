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
    name: Sequelize.STRING,
    password: Sequelize.STRING
  }, 
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  });
  return User;
};