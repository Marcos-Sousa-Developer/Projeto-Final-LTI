import axios from 'axios';

const axiosConfig = () => {
  // Set the common headers
  axios.defaults.headers.common['identification'] = process.env.REACT_APP_ID_KEY;
};

export default axiosConfig;
