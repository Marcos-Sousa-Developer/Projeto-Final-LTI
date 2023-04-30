import axios from 'axios'
import API_URL from '../config/serverConnect'

async function deleteToDB(url) {

    let url_endpoint = API_URL + url

    return await axios.delete(url_endpoint, null, {withCredentials:true})
        .then((response) => {
            if(response.status == 200){
                return true
            }
        })
        .catch((error) => {
            return false
        })
}

export default deleteToDB