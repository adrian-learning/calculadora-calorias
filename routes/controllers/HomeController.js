const { UserInfo, User } = require("../../database")
const { basal, tdee } = require('../../utils/calculos')

module.exports = {
    home: async (req, res) => {
        try {
            const userId = parseInt(req.params.id)

            const userInfo = await UserInfo.findOne({
                //raw: true,
                where: { userId: userId },
                include: {
                    model: User,
                    attributes: ['firstname']
                }
            })

            const userBasal = basal(userInfo)
            const userTdee = tdee(userInfo)
            console.log(userTdee)

            res.cookie('userId', userId)
            res.render('home/home', { 
                title: 'Home Page', 
                user: { basal: userBasal, tdee: userTdee, ...userInfo.dataValues } 
            })

        } catch (error) {
            res.send(error)
        }
    }
}