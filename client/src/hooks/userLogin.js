import {useEffect,useState} from 'react' 
import axios from 'axios'

const userLogin = async(email, password) => { 

    let islogedIn = false;
    

    let params = {
        email : email,
        password: password
    }
            
    return await axios.post('/signIn', null, {params: params})
    
        .then((response) => { 
            
                console.log(response.data)
        })
}

export default userLogin