import React, { useEffect, useState } from 'react';
import { FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { BsTwitter, BsFacebook, BsGoogle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { authentication as auth}  from '../../authentication'
import images from '../../assets/images';
import getClientType from '../../hooks/getClientType';
import './SignIn.css';

const SignInC = () => {

    const [email, setEmail] = useState(null) 

    const [password, setPassword] = useState(null) 

    const [loading, setLoading] = useState(false) 

    const [notValidate, setNotValidade] = useState(false) 

    const [error, setError] = useState(false) 

    const [code, setCode] = useState(undefined)

    const navigate = useNavigate();

    const handlerLogin = async (event) => {
        setError(false)
        setNotValidade(false)
        setLoading(true)
        event.preventDefault(); 
        let isActive = await auth.signIn(email,password)
        if(isActive === true) {
            window.location.href = "/";
        }
        else if(isActive === null) {
            setNotValidade(true)
        }
        else{
            setError(true)
        }
        setLoading(false)
    }

    const sendCode = async () => {

        setNotValidade(false)

        let isActive = await auth.verifyEmail(email,code);

        if(isActive) {
            location.reload()
        }
        else(
            setNotValidade(true)
        )
        
    } 

    const getUserType = async () => {
        let response = await getClientType()
        if(response) {
            navigate('/');
        }
    }

    useEffect(() => {
        getUserType()
    },[])

    return (
    <>
        <img className='app__SignIn_rectangle1' src={images.Rectangle1} alt="" />
        <div className='app__SignIn main__container'>
            <Link to='/'><FiArrowLeft></FiArrowLeft></Link>
            <h1 className=''>Sign In</h1>
                <div className='app__SignIn_box'>
                    <div className='app__SignIn_box1'>
                        <form onSubmit={handlerLogin}>
                            <div>
                                <p>E-mail</p>
                                <div className='app__SignIn_box11'>
                                    <div><FiMail fontSize={22} color='black'  aria-hidden="true"/></div>
                                    <input
                                        type="text"
                                        onChange={(e)=>setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <p>Password</p>
                                <div className='app__SignIn_box11'>
                                    <div><FiLock fontSize={22} color='black'  aria-hidden="true"/></div>
                                    <input
                                        type="password"
                                        onChange={(e)=>setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='forgot_password'>Esqueceu-se da password?</div>
                            </div>
                            <div className='app__SignIn_box13'>
                            {
                                error && ( <small style={{color:"red"}}>Email ou Password incorreto</small>)
                            }
                            {
                                notValidate && ( 
                                    
                                    <>
                                    <small style={{color:"red"}}> Tens de confirmar o teu email</small>
                                    <div className='app__SignIn_box11'>
                                        <input type="text" placeholder='verificar code' onChange={(e) => setCode(e.target.value)}></input>
                                    </div>
                                    <button onClick={() => sendCode()}>Verificar code</button>
                                    </>
                                    )
                            }
                            {
                                loading ? 
                                (
                                    <button className='main__action_btn'>Loading</button>
                                )
                                :
                                (
                                    <button className='main__action_btn' type='submit'>Login</button>
                                )
                            }
                            <div className='register'>Não tem conta? Registe-se <span><Link to="/signup" >aqui</Link></span>.</div>
                            </div>
                        </form>
                    </div>
                    <div className='app__SignIn_box2'>
                        <p>ou</p>    
                    </div>
                    <div className='app__SignIn_box3'>
                        <button className='app__SignIn_box30 ButtonGoogle'><BsGoogle className='signInOptions' style={{backgroundColor:'transparent', color: 'white'}}></BsGoogle><p>Google</p></button>
                        <button className='app__SignIn_box30 ButtonFacebook'><BsFacebook className='signInOptions' style={{backgroundColor:'transparent', color: 'white'}}></BsFacebook><p>Facebook</p></button>
                        <button className='app__SignIn_box30 ButtonTwitter'><BsTwitter className='signInOptions' style={{backgroundColor:'transparent', color: 'white'}}></BsTwitter><p>Twitter</p></button>
                    </div>
                </div>    
        </div>
    </>
    )
}
  
export default SignInC