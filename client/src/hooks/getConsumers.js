import {useEffect,useState} from 'react' 
import axios from 'axios' 

function getConsumers(url) { 

    const [users, setUsers]= useState([]);
    
    useEffect(()=>{
        
        (
           async function(){
              await axios.get(url).then((response) => {
            
                setUsers(response.data)
            })
           }
        )()
     },[url]) //dependecy, we need to put the thing that change

    return users
}

export default getConsumers
