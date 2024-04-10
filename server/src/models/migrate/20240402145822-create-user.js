'use strict';

const { sequelize } = require('..');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      avatar_url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mastodon_instance: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mastodon_token: {
        allowNull: false,
        type: Sequelize.STRING
      },
      send_time: {
        allowNull: false,
        type: Sequelize.NUMBER,
      },
      is_send_to_world: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      is_live: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};