import axios from 'axios'
import API_URL from '../config/serverConnect'

async function postToDB(url, params) {

    let url_endpoint = API_URL + url

    return await axios.post(url_endpoint, null, {params, withCredentials:true})
        .then((response) => {
            if(response.status == 200){
                return response.data
            }
        })
        .catch((error) => {
            return error
        })
}

export default postToDB