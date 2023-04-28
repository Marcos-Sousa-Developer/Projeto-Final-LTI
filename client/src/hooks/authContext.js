import { useCookies } from 'react-cookie';
import getClientType from './getClientType';

export const authContext = async () => {
    
    let response = await getClientType()   
    
    if(response) {
        return false
    }
    return true
}

