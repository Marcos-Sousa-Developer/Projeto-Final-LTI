import {useEffect,useState} from 'react' 
import axios from 'axios'
//import API_URL from '../config/serverConnect'

function getUsersType(url) { 

    const [users, setUsers]= useState([]);
    
    useEffect(()=>{
        
        (
           async function(){
                
            //let url_endpoint = API_URL+url

              await axios.get(url).then((response) => {
            
                setUsers(response.data)
            })
           }
        )()
     },[url]) //dependecy, we need to put the thing that change

    return users
}

export default getUsersType