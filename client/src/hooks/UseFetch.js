import {useEffect,useState} from 'react' 
import axios from 'axios' 

function UseFetch(url) { 

    const [state, setState]= useState(null);

    useEffect(() => { 
        axios.get(url).then((response) => {
            
            setState(response.data.express)
        })
      
    }, [url]); //dependecy, we need to put the thing that change

    return {state}
}

export default UseFetch
