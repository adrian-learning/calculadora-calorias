'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  UserInfo.init({
    age: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    height: DataTypes.DECIMAL,
    weight: DataTypes.DECIMAL,
    factor: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'UserInfo',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  });
  return UserInfo;
};