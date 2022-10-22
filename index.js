require('dotenv')
const express = require('express')
const app = express()

const passport = require('passport')
const passportConfig = require('./config/passaport.config')

//View engine
app.use('view-engine', 'ejs')

//Use Json
app.use(express.urlencoded({ extended: false }))

//Passport
passportConfig.localConfig(passport)

//Rotas
const route = require('./routes')
app.use(route(passport))


//Iniciando servidor
app.listen(process.env.PORT)