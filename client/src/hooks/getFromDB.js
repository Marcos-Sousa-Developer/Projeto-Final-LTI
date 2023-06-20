import axios from 'axios'

async function getFromDB(url, params) {

    return await axios.get(url, {params, withCredentials:true})
        .then((response) => {
            if(response.status == 200){
                return response.data
            }
        })
        .catch((error) => {
            return error
        })
}

export default getFromDB