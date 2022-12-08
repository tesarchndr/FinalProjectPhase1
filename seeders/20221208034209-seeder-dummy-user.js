'use strict';
const bcrypt = require('bcryptjs')
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
    const data = JSON.parse(fs.readFileSync('./data/dummy-user.json','utf-8'))
    const salt = bcrypt.genSaltSync(10)
    data.map(el => {
      el.password = bcrypt.hashSync(el.password, salt)
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    } )
    return queryInterface.bulkInsert('Users', data, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', {}, {})
  }
};
