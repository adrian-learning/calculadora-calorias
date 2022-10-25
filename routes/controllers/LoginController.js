module.exports = {
    login: (req, res) => {
        res.send('Logged fail')
    },

    authenticateLogin: (passport) => passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })
}