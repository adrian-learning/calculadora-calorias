module.exports = {
    login: (req, res) => {
        
    },

    authenticateLogin: (passport) => passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
}