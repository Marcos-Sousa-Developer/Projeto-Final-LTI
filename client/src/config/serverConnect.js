let API_URL = ""

if (process.env.REACT_APP_ENV === "local") {

    API_URL = process.env.REACT_APP_SERVER_HOST

}

export default API_URL 