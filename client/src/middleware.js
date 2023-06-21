import axios from 'axios'; 

let axiosConfig = null;

if(process.env.REACT_APP_ENV == 'local') {
  axiosConfig = () => {
    // Set the common headers
    axios.defaults.headers.common['identification'] = process.env.REACT_APP_ID_KEY;
    axios.defaults.withCredentials = true; // Enables sending cookies from the browser
  };
}
else {
  axiosConfig = () => {
    // Set the common headers
    axios.defaults.headers.common['identification'] = process.env.REACT_APP_ID_KEY;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.baseURL = "https://greatergoods.pt/api";
    axios.defaults.withCredentials = true; // Enables sending cookies from the browser
    axios.defaults.headers.common['credentials'] = true

  };
}



export default axiosConfig;
