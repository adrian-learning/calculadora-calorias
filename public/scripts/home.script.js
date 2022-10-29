import axiosInstance from './axios.js'

export const updateInfo = async () => {

    const age = document.getElementsByName('age')[0]
    const height = document.getElementsByName('height')[0]
    const weight = document.getElementsByName('weight')[0]
    const activity = document.getElementsByName('activity')[0].value
    const genderRadio = document.querySelector('input[name="genderRadio"]:checked').value

    if(!validateNumberFields([age, height, weight])){
        const userId = document.cookie
            .split('; ')
            .find((row) => row.startsWith('userId='))
            ?.split('=')[1]
    
    
        try {
            const response = await axiosInstance.post(`/home/${userId}/info`, {
                age: parseInt(age.value),
                height: parseInt(height.value),
                weight: parseInt(weight.value),
                factor: activity,
                gender: genderRadio,
                week: 2
            });
    
            if(response.data.userId){
                document.getElementById('showBasal').innerHTML = Math.round(response.data.basal)
                document.getElementById('showTdee').innerHTML = Math.round(response.data.tdee)
    
                console.log(response.data);

                changeIcon(true)

                setTimeout(() => {
                    changeIcon(false)
                },1500)
            }
        } catch (error) {
            console.error(error);
        }
    }


}

const validateNumberFields = (fields) => {
    let isInvalid = false
    fields.forEach(element => {
        let value = parseInt(element.value)
        if(Number.isNaN(value) || value == '' || value == undefined){
            addErrorField(element)
            isInvalid = true
        }
    });

    return isInvalid
}

const addErrorField = (field) => {
    field.classList.add('input-error')
}

export const removeErrorField = (field) => {
    field.classList.remove('input-error')
}

const changeIcon = (toggle) => {
    const arrowOne = document.getElementById('arrowOne')
    const arrowTwo = document.getElementById('arrowTwo')
    const divButton = document.getElementById('updateBtn')
    const tdee = document.getElementById('showTdee')
    
    if(toggle){
        arrowOne.classList.add('gg-check')
        
        arrowTwo.classList.remove('arrow')
    
        divButton.classList.remove('updateBtn')
        tdee.classList.add('zoom')

    }else{
        arrowOne.classList.remove('gg-check')
        
        setTimeout(() => {
            arrowTwo.classList.add('arrow')
            tdee.classList.remove('zoom')
        }, 500);
        divButton.classList.add('updateBtn')
    }
}

const logout = () => {
    axiosInstance.post('/logout').then((res) => {
        document.location.href = '/login'
    })
}

window.updateInfo = updateInfo
window.removeErrorField = removeErrorField
window.changeIcon = changeIcon
window.logout = logout
