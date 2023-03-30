import axios from 'axios'

async function putToDB(url, params) {

    return await axios.put("/api" + url, null, {params: params})
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