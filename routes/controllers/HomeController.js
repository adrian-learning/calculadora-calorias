const { UserInfo, User } = require("../../database")
const { basal, tdee } = require('../../utils/calculos')

module.exports = {
    home: async (req, res) => {
        try {
            const userId = parseInt(req.params.id)
            //const userId = 7

            //console.log(userId)
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

            //res.json(userInfo)
            res.cookie('userId', userId)
            res.render('home/home', { 
                title: 'Home Page', 
                user: { basal: userBasal, tdee: userTdee, ...userInfo.dataValues } 
            })

            // if(userInfo) res.json(userInfo)
            // else{
            //     res.json({user: 'vazio'})
            // }

        } catch (error) {
            res.send(error)
        }
    }
}