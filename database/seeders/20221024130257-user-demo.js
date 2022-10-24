'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('User', [{
        username: 'User 01',
        password: '$2a$10$5BU1ChTt5chQ7.RFCTAKUOUaHbkxpWqM2RDQKFlN59bMVM7A/4dKu' //decrypted: user01pass
      }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('User', null, {});
  }
};
