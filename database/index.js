const {Sequelize, DataTypes} = require('sequelize')
const User = require('./models/user')
const config = require('../config/sequelize.json')['development']

const sequelize = new Sequelize(config.database, config.username, config.password,config)

const user = User(sequelize, DataTypes)

module.exports = {
    sequelize,
    User: user
}