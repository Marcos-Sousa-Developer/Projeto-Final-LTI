import {useEffect,useState} from 'react' 
import axios from 'axios' 

function getConsumers(url) { 

    const [state, setState]= useState([]);

    useEffect(() => { 

        axios.get(url).then((response) => {
            
            setState(response.data)
        })
      
    }, [url]); //dependecy, we need to put the thing that change

    return state
}

export default getConsumers
