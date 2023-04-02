import axios from 'axios'
import API_URL from '../config/serverConnect'

async function putToDB(url, params) {

    let url_endpoint = API_URL+url

    return await axios.put(url_endpoint, {params})
        .then((response) => {
            if(response.status == 200){
                return true
            }
        })
        .catch((error) => {
            return false
        })
}

export default putToDB