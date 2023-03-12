import { useCookies } from 'react-cookie';

export const authContext = () => {
    const [cookies] = useCookies(['userSession']);

    if(!cookies.userSession){
        return false
    }
    return true
}

