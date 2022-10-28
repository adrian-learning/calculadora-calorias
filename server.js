require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const flash = require('express-flash')
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts')

const passport = require('passport')
const passportConfig = require('./config/passaport.config')

const cookieParser = require("cookie-parser")

const route = require('./routes')


//View engine
app.set('view engine', 'ejs')
//Layout ejs
app.use(expressLayouts)
app.set('layout', './layouts/main')

//For script load on html
const scriptPath = path.join(__dirname, 'public')
console.log(scriptPath)
app.use('/public', express.static(scriptPath))


//Use Json
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

//Cookie
app.use(cookieParser())

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