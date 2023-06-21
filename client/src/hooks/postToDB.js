import axios from 'axios'

async function postToDB(url, params) {

    return await axios.post(url, null, {params, withCredentials:true})
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