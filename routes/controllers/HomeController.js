const { UserInfo, User } = require("../../database")

module.exports = {
    home: async (req,res) => {
        try {
            const userId = parseInt(req.params.id)
            console.log(userId)

            const userInfo = await UserInfo.findOne({
                //raw: true,
                where: { userId: userId },
                include: {
                    model: User,
                    attributes: ['firstname']
                }
            })
            

            if(userInfo) res.json(userInfo)
        
        } catch (error) {
            res.send(error)
        }
    }
}