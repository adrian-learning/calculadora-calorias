const bcrypt = require('bcrypt')
const { User } = require('../database')

const LocalStrategy = require('passport-local').Strategy

const localConfig = (passport) => {
    const authenticate = async (username, password, done) => {

        if (!username || !password) done(null, false, { message: 'Obrigatório informar username/password' })

        const user = await User.findOne({ username: username })

        if (user || user != undefined) {

            if (await bcrypt.compare(password, user.password)) {
                done(null, user)
            }
            else {
                done(null, false, { message: 'Senha incorreta' })
            }

        }
        else {
            done(null, false, { message: 'Usuário não existe' })
        }
    }

    passport.use(new LocalStrategy(authenticate))

    //Passport Session
    passport.serializeUser((usr, done) => done(null, usr.id))
    passport.deserializeUser(async (id, done) => {
        const user = await User.findByPk(id)
        done(null, user)
    })
}

module.exports = {
    localConfig
}