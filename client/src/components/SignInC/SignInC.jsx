import React, { useState } from 'react';
import { FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { authentication as auth}  from '../../authentication'


import './SignIn.css';
import images from '../../assets/images';

const SignInC = () => {

    const [email, setEmail] = useState(null) 

    const [password, setPassword] = useState(null) 

    const [loading, setLoading] = useState(false) 

    const [notValidate, setNotValidade] = useState(false) 

    const [error, setError] = useState(false) 

    const [code, setCode] = useState(undefined)

    const handlerLogin = async (event) => {
        setError(false)
        setNotValidade(false)
        setLoading(true)
        event.preventDefault(); 
        let isActive = await auth.signIn(email,password)
        if(isActive === true) {
            location.reload()

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

    return (
    <>
        <img className='app__SignIn_rectangle1' src={images.Rectangle1} alt="" />
        <img className='app__SignIn_rectangle2' src={images.Rectangle2} alt="" />
        <div className='app__SignIn main__container'>
            <Link to='/'><FiArrowLeft></FiArrowLeft></Link>
            <h1 className=''>Sign In</h1>
                <div className='app__SignIn_box'>
                    <div className='app__SignIn_box1'>
                        <form onSubmit={handlerLogin}>
                            <div>
                                <p>E-mail</p>
                                <div className='app__SignIn_box11'>
                                    <FiMail fontSize={22} color='black'  aria-hidden="true"/>
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
                                    <FiLock fontSize={22} color='black'  aria-hidden="true"/>
                                    <input
                                        type="password"
                                        onChange={(e)=>setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <p>Esqueceu-se da password?</p>
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
                            <p>Não tem conta? Registe-se <span><Link to="/signup" style={{color: "coral"}}>aqui</Link></span>.</p>
                            </div>
                        </form>
                    </div>
                    <div className='app__SignIn_box2'>
                        <p>or</p>    

                    </div>
                    <div className='app__SignIn_box3'>
                            <button className='app__SignIn_box30 ButtonGoogle'>
                                Google
                            </button>
                            <button className='app__SignIn_box30 ButtonFacebook'>
                                Facebook
                            </button>
                            <button className='app__SignIn_box30 ButtonTwitter'>
                                Twitter
                            </button>
                    </div>
                </div>    
        </div>
    </>
    )
}
  
export default SignInC