'use strict';

const masseus = require('../models/masseus');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Testimonies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MasseusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'masseus',
          key: 'id',
        }
      },
      message: {
        type: Sequelize.STRING
      },
      likeStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Testimonies');
  }
};