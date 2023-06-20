import axios from 'axios'

async function putToDB(url, params) {

    return await axios.put(url, null, {params,withCredentials:true})
        .then((response) => {
            if(response.status == 200){
                return response.data
            }
        })
        .catch((error) => {
            return error
        })
}

export default putToDB