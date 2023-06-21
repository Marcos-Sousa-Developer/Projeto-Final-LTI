import axios from 'axios' 

const activateOrDeactivateUser = async (url, status) => { 

    let params = {
      account_status : status
    }
    
  await axios.put(url, null, {params,withCredentials:true})
    .then((response) => {
      if (response.status == 200) {
        window.location.reload();
      }
  });
}

export default activateOrDeactivateUser