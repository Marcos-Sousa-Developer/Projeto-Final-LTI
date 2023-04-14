import axios from 'axios'

function getClientType(params) { 

    return new Promise((resolve, reject) => {
        
        axios.get('/userType',{params}).then((response) => {

            resolve(response.data)

        })

        .catch((error) => {
            reject("")
        })

    })
    
}

export default getClientType