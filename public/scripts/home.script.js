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

window.updateInfo = updateInfo
window.removeErrorField = removeErrorField
