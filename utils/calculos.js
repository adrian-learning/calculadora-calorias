module.exports = {
    basal: (user) => {
        if (!user) return null

        if (user.gender === 'F') {
            return 655.1 + (9.563 * user.weight) + (1.85 * user.height) - (4.676 * user.age)
        } else if (user.gender === 'M') {
            return 66.5 + (13.75 * user.weight) + (5.003 * user.height) - (6.775 * user.age)
        }

        return null

    },

    tdde: (user) => {
        if (!user.basal) return null

        if (user.factor) {
            return parseInt(user.basal) * parseFloat(user.factor)
        }

        return null
    }
}