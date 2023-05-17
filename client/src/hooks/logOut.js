import axios from "axios";

const logOut = () => {

    return new Promise((resolve, reject) => {
        
        axios.post('/logout', {withCredentials: true})
        
        .then((response) => {
            localStorage.clear();
            window.location.href = "/signin"
        })

        .catch((error) => {
            reject("error")
        })
    })      
}

export default logOut