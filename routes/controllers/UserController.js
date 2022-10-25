const { User, UserInfo } = require("../../database")

module.exports = {
    getInfo: (req,res) => {
        res.send('User info get')
    },

    setInfo: async (req, res) => {
        const userId = parseInt(req.params.id)
        const { age, height, weight, factor } = req.body

        console.log('Meu id: ', userId)
        try{
            const user = await User.findByPk(userId)
            const userInfo = await UserInfo.create({ 
                userId: userId, 
                age: age, 
                height: height, 
                weight: weight, 
                factor: factor
            })

            res.cookie('userInfo',{ 
                name: user.firstname, 
                ...userInfo
            }).redirect(`/home/${userId}`)


        }catch(e){
            res.send(e)
        }
    }
}