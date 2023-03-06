import axios from 'axios'
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';

function getClientType(url) { 

    const [cookies] = useCookies(['userSession']);

    const [userType, setUserType] = useState(null)

    useEffect(()=>{
        
        (
           async function(){
            
            if(cookies.userSession !== null) { 
                
                await axios.post(url).then((response) => {
            
                    setUserType(response.data)
                })
            }
            
           }
        )()
     },[url]) //dependecy, we need to put the thing that change

    return userType
}

export default getClientType