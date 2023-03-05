import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { authentication as auth}  from '../../authentication'

function Login() { 

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null) 
  const navigate = useNavigate()

  const handleSetEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleSetPassword = (event) => {
    setPassword(event.target.value)
  }

  const handlerLogin = async () => {
     let isActive = await auth.signIn("test@outlook.com","Grupo01PTRPTI!")
     if(isActive) {
      
      navigate('/')
     }
  } 

  return (
    <div>
      <form action="" method="post">
      <input type="text" placeholder="email" value = {email ?? ""} name="uname" onChange={handleSetEmail} required></input>
      <input type="password" placeholder="password" value = {password ?? ""} name="psw" onChange={handleSetPassword} required></input>
      </form>
      <button type="submit" onClick={() => handlerLogin()}>Login</button>
    </div>
  );
}

export default Login