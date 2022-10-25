const express = require('express')
const router = express.Router()
const InitialController = require('./controllers/InitialController')
const LoginController = require('./controllers/LoginController')
const HomeController = require('./controllers/HomeController')


module.exports = (passport) => {
    router.get('/', InitialController.initial)
    router.get('/login', LoginController.login)
    router.get('/home', HomeController.home)

    router.post('/login', LoginController.authenticateLogin(passport))

    return router
}