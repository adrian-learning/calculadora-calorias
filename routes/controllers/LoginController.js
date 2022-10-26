const { User } = require('../../database')
const bcrypt = require('bcrypt')

module.exports = {
    login: (req, res) => {
        res.render('login/login', { title: 'Login' })
    },

    showRegister: (req, res) => {
        res.render('login/register', { title: 'Register' })
    },

    register: async (req, res) => {
        const { username, password, firstname } = req.body

        if (!username || !password){
            req.flash('message', 'Usuário/Senha inválido')
            res.redirect('/register')
        }

        try{
            if(await User.findOne({ where: { username: username.trim() } })){
                req.flash('message', 'Usuário já existe!')
                res.redirect('/register')
            }else{
                const pass = await bcrypt.hash(password, 10)
                const user = await User.create({ username: username, password: pass, firstname: firstname })
                
                res.redirect(`/home/${user.id}`)
            }

        }catch(e){
            res.send('Error') //Error Page
        }
    },

    authenticateLogin: (passport) => passport.authenticate('local', {
        //successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    }),

    toHome: (req, res) => {
        const user = req.user
        res.redirect(`/home/${user.id}`)
    }
}