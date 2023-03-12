import { Navigate } from "react-router-dom"
import { authContext } from "../hooks/authContext";

function RequireAuth({children}) {

    if(!authContext()){
        return <Navigate to='/login' />
    }

  return children
}

export default RequireAuth
