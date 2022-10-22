const passport = require('passport')
const bcrypt = require('bcrypt')

const LocalStrategy = require('passport-local').Strategy

const localConfig = (passport) => {
    const authenticate = async (username, password, done) => {
        if(!username || !password) done(null,false, { message: 'Obrigatório informar username/password'})
     
        // BUSCAR USER NO BANCO
        const user = 'get from postgre'

        if(user || user != undefined){
            let { username, password } = user
            if(await bcrypt.compare(password, user.password)){
                done(null, user)
            }
            else{
                done(null, false, { message: 'Senha incorreta' })
            }

        }
        else{
            done(null,false,{ message: 'Usuário não existe' })
        }
    }

    passport.use(new LocalStrategy(authenticate))
    
    //Passport Session
    passport.serializeUser((usr, done) => done(null, usr.id))
    passport.deserializeUser((id, done) => done(null, )) //Get user from db
}

module.exports = {
    localConfig
}