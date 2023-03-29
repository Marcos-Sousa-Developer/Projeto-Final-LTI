import axios from 'axios'

async function getProduct(url, params) {

    return await axios.get("/api" + url, null, {params: params})
        .then((response) => {
            if(response.status == 200){
                return response.data
            }
        })
        .catch((error) => {
            return error
        })
}

export default getProduct