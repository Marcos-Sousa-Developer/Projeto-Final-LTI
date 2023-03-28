import axios from 'axios'

async function postToDB(url, params) {

    return await axios.post("/api" + url, null, {params: params})
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