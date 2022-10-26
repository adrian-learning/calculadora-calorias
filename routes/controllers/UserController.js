const { User, UserInfo } = require("../../database")
const { basal, tdee } = require("../../utils/calculos")

module.exports = {
    // getInfo: (req,res) => {
    //     res.send('User info get')
    // },

    setInfo: async (req, res) => {
        const userId = parseInt(req.params.id)
        const { age, gender, height, weight, factor, week } = req.body

        console.log('Meu id: ', userId)
        try {
            
            const [userInfo, created] = await UserInfo.findOrCreate({
                where: { userId: userId, week: week },
                defaults: {
                    age: age,
                    gender: gender,
                    height: height,
                    weight: weight,
                    factor: factor
                } 
            })

            if(created){
                const userBasal = basal(userInfo)
                const userTdee = tdee(userInfo)
    
                console.log("Basal: ", userBasal)
                // res.redirect(`/home/${userId}`)
                res.json({ basal: userBasal, tdee: userTdee, ...userInfo.dataValues })
            }
            else{
                const [isUpdated, updatedUser] = await UserInfo.update({
                    age: age,
                    gender: gender,
                    height: height,
                    weight: weight,
                    factor: factor
                },{
                    where: { userId: userId, week: week },
                    returning: true
                })
               
                const userBasal = basal(userInfo)
                const userTdee = tdee(userInfo)
    
                console.log("Basal: ", userBasal)
                
                
                res.json({ basal: userBasal, tdee: userTdee, ...updatedUser[0].dataValues })
            }

        } catch (e) {
            
            res.send(e)
        }
    }
}