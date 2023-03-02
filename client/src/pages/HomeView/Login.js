import React, {useState} from 'react'
import Cookies from 'js-cookie';
import Authentication from '../../config/auth';

const Login = () => { 


  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null) 


  const handleSetEmail = (event) => {
    setEmail(event.target.value)
    console.log(event.target.value)
  }

  const handleSetPassword = (event) => {
    setPassword(event.target.value)
    console.log(event.target.value)
  }

  const handlerLogin = () => {

    const authentication = Authentication() 

    const user = authentication.signIn("ok","ok") 

    console.log(user)

  }

  return (
    <div>
      <form action="" method="post">
      <input type="text" placeholder="email" value = {email ?? ""} name="uname" onChange={handleSetEmail} required></input>
      <input type="password" placeholder="password" value = {password ?? ""} name="psw" onChange={handleSetPassword} required></input>
      </form>
      <button type="submit" onClick={handlerLogin}>Login</button>
    </div>
  );
}

export default Login