import axios from 'axios'

function getClientType(params) { 

    return new Promise((resolve, reject) => {
        
        axios.get('/userType',{params, withCredentials: true})
        
        .then((response) => {

            resolve(response.data)

        })

        .catch((error) => {
            reject("")
        })

    })
    
}

export default getClientType