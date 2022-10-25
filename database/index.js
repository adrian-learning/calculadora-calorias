const {Sequelize, DataTypes} = require('sequelize')
const User = require('./models/user')
const UserInfo = require('./models/userinfo')

const config = require('../config/sequelize.json')['development']

const sequelize = new Sequelize(config.database, config.username, config.password,config)

//Instanciando Models
const user = User(sequelize, DataTypes)
const userInfo = UserInfo(sequelize, DataTypes)

//Associations
user.associate(sequelize.models)
userInfo.associate(sequelize.models)

module.exports = {
    sequelize,
    'User': user,
    'UserInfo': userInfo
}