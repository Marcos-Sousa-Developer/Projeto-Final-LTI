import axios from 'axios'
import API_URL from '../config/serverConnect'

function getAllFromDB(url, params = null) { 

    return new Promise((resolve, reject) => { 

        let url_endpoint = API_URL+url 

        if (params === null) {

            axios.get(url_endpoint, {withCredentials:true}).then((response) => {
                resolve(response.data)
            })
    
            .catch((error) => { 
                reject("")
            })    
        } else {
            axios.get(url_endpoint, {params, withCredentials:true})
            
                .then((response) => {
                    resolve(response.data)
                })
        
                .catch((error) => { 
                    reject("")
                })    
        }
    })
}

export default getAllFromDB