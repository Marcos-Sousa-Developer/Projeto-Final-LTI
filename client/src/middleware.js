import axios from 'axios'; 

let axiosConfig = null;

if(process.env.REACT_APP_ENV == 'local') {
  axiosConfig = () => {
    // Set the common headers
    axios.defaults.headers.common['identification'] = process.env.REACT_APP_ID_KEY;
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
    axios.defaults.withCredentials = true,
    axios.defaults.baseURL = "http://localhost:5000/api";
    axios.credentials = 'include'
  };
}
else {
  axiosConfig = () => {
    // Set the common headers
    axios.defaults.headers.common['identification'] = process.env.REACT_APP_ID_KEY;
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
    axios.defaults.withCredentials = true,
    axios.defaults.baseURL = "https://greatergoods.pt/api";
    axios.credentials = 'include'
  };
}



export default axiosConfig;
