import axios from 'axios'
import API_URL from '../config/serverConnect'

async function getFromDB(url, params) {

    let url_endpoint = API_URL + url

    return await axios.get(url_endpoint, {params, withCredentials:true})
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