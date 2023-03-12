import axios from 'axios'

function getClientType(url) { 

    return new Promise((resolve, reject) => {
        
        axios.get(url).then((response) => {

            resolve(response.data)

        })

        .catch((error) => {
            reject("")
        })

    })
    
}

export default getClientType