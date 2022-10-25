'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Users',
        'age',
        {
          type: Sequelize.DataTypes.STRING,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Users',
        'height',
        {
          type: Sequelize.DataTypes.STRING,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Users',
        'weight',
        {
          type: Sequelize.DataTypes.STRING,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Users',
        'factor',
        {
          type: Sequelize.DataTypes.STRING,
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('User', 'age', { transaction });
      await queryInterface.removeColumn('User', 'height', { transaction });
      await queryInterface.removeColumn('User', 'weight', { transaction });
      await queryInterface.removeColumn('User', 'factor', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
