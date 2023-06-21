import axios from 'axios'

function getAllFromDB(url, params = null) { 

    return new Promise((resolve, reject) => { 

        if (params === null) {

            axios.get(url, {withCredentials:true}).then((response) => {
                resolve(response.data)
            })
    
            .catch((error) => { 
                reject("")
            })    
        } else {
            axios.get(url, {params, withCredentials:true})
            
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