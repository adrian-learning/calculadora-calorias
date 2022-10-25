require('dotenv').config()
const express = require('express')
const app = express()
const flash = require('express-flash')
const session = require('express-session')

const passport = require('passport')
const passportConfig = require('./config/passaport.config')

const route = require('./routes')

//View engine
app.set('view-engine', 'ejs')

//Use Json
//app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

//Passport
passportConfig.localConfig(passport)
app.use(passport.initialize())
app.use(passport.session())

//Flash
app.use(flash())


//Rotas
app.use(route(passport))


//Iniciando servidor
app.listen(process.env.PORT)