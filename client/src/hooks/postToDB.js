import axios from 'axios'
import API_URL from '../config/serverConnect'

async function postToDB(url, params) {

    let url_endpoint = API_URL+url

    return await axios.post(url_endpoint, null, {params: params})
        .then((response) => {
            if(response.status == 200){
                return true
            }
        })
        .catch((error) => {
            return false
        })
}

export default postToDB