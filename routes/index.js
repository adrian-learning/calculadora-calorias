const express = require('express')
const router = express.Router()
const InitialController = require('./controllers/InitialController')
const LoginController = require('./controllers/LoginController')
const HomeController = require('./controllers/HomeController')
const UserController = require('./controllers/UserController')


module.exports = (passport) => {
    router.get('/', InitialController.initial)
    router.get('/login', LoginController.login)
    router.get('/home/:id', HomeController.home)
    router.get('/register', LoginController.showRegister)
    router.get('/user/:id/info', UserController.getInfo)
    
    router.post('/login', LoginController.authenticateLogin(passport))
    router.post('/register', LoginController.register)
    router.post('/user/:id/info', UserController.setInfo)

    return router
}