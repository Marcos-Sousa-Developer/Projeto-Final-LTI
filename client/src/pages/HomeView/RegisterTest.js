import React, {useState} from 'react'
import { authentication as auth}  from '../../authentication'

function RegisterTest() {


  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null) 

  const handleSetEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleSetPassword = (event) => {
    setPassword(event.target.value)
  }

  const handlerCreate = async () => {
     
     console.log(isActive)
  } 

  return (
    <div>

    <form action="" method="post">
        <div className="container">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr></hr>

            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" id="email" onChange={handleSetEmail} required></input>
            <br></br>
            <br></br>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" id="psw" onChange={handleSetPassword} required></input>

            <br></br>
            <br></br>

        </div>
    </form>
    <button type="submit" onClick={() => handlerCreate()}className="registerbtn">Register</button>
    </div>

  )
}

export default RegisterTest
