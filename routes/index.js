const express = require('express')
const router = express.Router()
const InitialController = require('./controllers/InitialController')
const LoginController = require('./controllers/LoginController')


module.exports = (passport) => {
    router.get('/', InitialController.initial)
    router.get('/login', LoginController.login)

    router.post('/login', LoginController.authenticateLogin(passport))
}