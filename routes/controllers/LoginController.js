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
            res.render('error/error', {title: "Error Page", error: e})
        }
    },

    authenticateLogin: (passport) => passport.authenticate('local', {
        //successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    }),

    logout: (req, res) => {
        if (req.cookies['userId']) res.clearCookie('userId')

        // req.logOut((err) => {
        //     res.render('error/error', {title: "Error Page", error: err})
        // })
        req.session.destroy(function (err) {
            res.redirect('/login'); 
          });
    },

    toHome: (req, res) => {
        const user = req.user
        res.redirect(`/home/${user.id}`)
    },

    checkAutenticated: (req, res, next) => {
        console.log('Is auth')
        if (req.isAuthenticated()) return next()
        res.redirect('/login')
    },
    
    checkIsNotAuthenticated: (req, res, next) => {
        if(!req.isAuthenticated()) return next()
        console.log('aft not auth')
        const userId = req.user.id
        console.log(userId)
        res.redirect(`/home/${userId}`)
    }
}