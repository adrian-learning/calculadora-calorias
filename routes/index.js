const express = require('express')
const router = express.Router()
const InitialController = require('./controllers/InitialController')
const LoginController = require('./controllers/LoginController')
const HomeController = require('./controllers/HomeController')
const UserController = require('./controllers/UserController')


module.exports = (passport) => {
    router.get('/', InitialController.initial)
    router.get('/login', LoginController.login)
    router.get('/register', LoginController.showRegister)
    router.get('/home/:id', HomeController.home)
    //router.get('/user/:id/info', UserController.getInfo)
    
    router.post('/login', (req,res,next) => {
        console.log(req.body)
        next()
    } ,LoginController.authenticateLogin(passport), LoginController.toHome)
    router.post('/register', LoginController.register)
    router.post('/home/:id/info', UserController.setInfo)
    

    return router
}