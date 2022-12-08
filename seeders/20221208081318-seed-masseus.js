'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = JSON.parse(fs.readFileSync('./data/masseus.json','utf-8'))
    data.map(el => {
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    } )
    return queryInterface.bulkInsert('masseus', data, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('masseus', {}, {})
  }
};
