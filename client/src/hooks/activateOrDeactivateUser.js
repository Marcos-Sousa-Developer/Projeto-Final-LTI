import axios from 'axios' 
import API_URL from '../config/serverConnect'

const activateOrDeactivateUser = async (url, status) => { 

    let url_endpoint = API_URL+url

    let params = {
      account_status : status
    }
    
  await axios.put(url_endpoint, {params})
    .then((response) => {
      if (response.status == 200) {
        window.location.reload();
      }
  });
}

export default activateOrDeactivateUser