const express = require('express')
const router = express.Router()
const InitialController = require('./controllers/InitialController')
const LoginController = require('./controllers/LoginController')
const HomeController = require('./controllers/HomeController')
const UserController = require('./controllers/UserController')


module.exports = (passport) => {
    router.get('/', InitialController.initial)
    router.get('/login', LoginController.checkIsNotAuthenticated, LoginController.login)
    router.get('/register', LoginController.checkIsNotAuthenticated, LoginController.showRegister)
    router.get('/home/:id', LoginController.checkAutenticated, HomeController.home)
    
    router.post('/login',LoginController.authenticateLogin(passport), LoginController.toHome)
    router.post('/register', LoginController.register)
    router.post('/home/:id/info', UserController.setInfo)
    router.post('/logout', LoginController.logout)

    return router
}