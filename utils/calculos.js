const sedentaryFactors = [1.2, 1.375, 1.55, 1.725, 1.9]

const basal = (user) => {

    const weight = parseFloat(user.weight)
    const height = parseFloat(user.height)
    const age = parseInt(user.age)


    if (user.gender === 'F') {
        return (655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age)).toFixed(2)
    } else if (user.gender === 'M') {
        return (66.5 + (13.75 * weight) + (5.003 * height) - (6.775 * age)).toFixed(2)
    }

    return null

}

const tdee = (user) => {

    if (user.factor) {
        return (basal(user) * parseFloat(sedentaryFactors[user.factor])).toFixed(2)
    }

    return null
}

const bulking = (user) => {
    return tdee(user) + 500
}

const cutting = (user) => {
    return tdee(user) - 500
}

module.exports = {
    basal,
    tdee,
    bulking,
    cutting
}