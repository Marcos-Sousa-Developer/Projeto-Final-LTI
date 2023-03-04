import React, {useState} from 'react'
import userLogin from '../../hooks/userLogin'

function Login() { 

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null) 


  const handleSetEmail = (event) => {
    setEmail(event.target.value)
    
  }

  const handleSetPassword = (event) => {
    setPassword(event.target.value)
    
  }

  const handlerLogin = async () => {

     console.log(await userLogin("test@outlook.com", "Grupo01PTRPTI!"))

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