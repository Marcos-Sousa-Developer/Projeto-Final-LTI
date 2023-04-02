import axios from 'axios'
import API_URL from '../config/serverConnect'

function getAllFromDB(url) { 

    return new Promise((resolve, reject) => { 

        let url_endpoint = API_URL+url

        axios.get(url_endpoint).then((response) => {
            resolve(response.data)
        })

        .catch((error) => { 

            reject("")

        })


    })
}

export default getAllFromDB