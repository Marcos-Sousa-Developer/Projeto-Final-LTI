import axios from 'axios'

async function deleteToDB(url) {

    return await axios.delete(url, null, {withCredentials:true})
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