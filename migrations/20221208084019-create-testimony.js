'use strict';

const masseus = require('../models/masseus');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Testimonies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MasseuId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Masseus',
          key: 'id',
        }, onDelete: 'cascade', onUpdate: 'cascade'
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
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Testimonies');
  }
};