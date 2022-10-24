'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Users', [{
        username: 'user01',
        password: '$2a$10$5BU1ChTt5chQ7.RFCTAKUOUaHbkxpWqM2RDQKFlN59bMVM7A/4dKu', //decrypted: user01pass
        firstname: 'User 01',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
