import React, { useEffect, useState, useRef } from 'react';
import { FiMail, FiLock, FiHome } from 'react-icons/fi';
import { BsTwitter, BsFacebook, BsGoogle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

import { authentication as auth}  from '../../authentication'

import images from '../../assets/images';
import getClientType from '../../hooks/getClientType';
import SnackBar from '../SnackBarNotification/SnackBar';
import './SignIn.css';

const SnackbarType = {
    success: "success",
    fail: "fail",
};

const SignInC = ({checkout=null}) => {
    //-------------------SnackBar--------------
    const snackbarRef = useRef(null);
    const snackbarRef2 = useRef(null);
    //-----------------------------------------

    const [email, setEmail] = useState(null) 

    const [password, setPassword] = useState(null) 

    const [loading, setLoading] = useState(false) 

    const [notValidate, setNotValidade] = useState(false) 

    const [error, setError] = useState(false) 

    const [code, setCode] = useState(undefined)

    const navigate = useNavigate();
  
    const getUserType = async () => {
  
      let response = await getClientType()  
      let type;
      if(response) {
        type = response[0]
      }
      return type
    }

    const handlerLogin = async (event) => {
        setError(false)
        setNotValidade(false)
        setLoading(true)
        event.preventDefault(); 
        let isActive = await auth.signIn(email,password)
        if(isActive === true) {
            let userType = await getUserType();
            if(userType == 'supplier'){
                window.location.href = "/supplier";
            } 
            else if(userType == 'admin'){
                window.location.href = "/admin/perfil";
            }
            else {
                if(checkout == true) {
                    window.location.href = "/cart";
                }
                else {
                    window.location.href = "/";
                }
            }
        }
        else if(isActive === null) {
            setNotValidade(true)
        }
        else{
            setError(true);
        }
        setLoading(false)
        snackbarRef.current.show();
    }

    const sendCode = async () => {

        setNotValidade(false)

        let isActive = await auth.verifyEmail(email,code);

        if(!isActive) {
            setNotValidade(true)
        }
        snackbarRef2.current.show();
    } 

    const getUserTypeInitial = async () => {
        let response = await getClientType()
        if(response) {
            if(response[0] == 'supplier'){
                navigate('/supplier');
            } else {
                navigate('/');
            }
        }
    }

    useEffect(() => {
        getUserTypeInitial()
    },[])

    return (
    <>
        <img className='app__SignIn_rectangle1' src={images.Rectangle1} alt="" />
        <div className='app__SignIn main__container'>
            <div style={{width: '100%'}}>
            <Link to='/'><FiHome></FiHome></Link>
            <h3 className=''>Iniciar Sessão</h3>
                <div className='app__SignIn_box'>
                    <div className='app__SignIn_box1'>
                        <form onSubmit={handlerLogin}>
                            <div>
                                <p>E-mail</p>
                                <div className='app__SignIn_box11'>
                                    <div><FiMail fontSize={22} color='black'  aria-hidden="true"/></div>
                                    <input
                                        type="email"
                                        onChange={(e)=>setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div style={{marginBottom: '1rem'}}>
                                <p>Password</p>
                                <div className='app__SignIn_box11'>
                                    <div><FiLock fontSize={22} color='black'  aria-hidden="true"/></div>
                                    <input
                                        type="password"
                                        onChange={(e)=>setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='app__SignIn_box13'>
                            {/*
                                error && ( 
                                <>
                                    <small style={{color:"red"}}>Email ou Password incorretos.</small>
                                </>
                                )
                                */}
                                <SnackBar
                                    ref={snackbarRef}
                                    message={
                                        error && !notValidate
                                        ? 'Email ou password incorretos!'
                                        : notValidate
                                        ? 'Verifique o seu email!'
                                        : 'Bem-vindo caro utilizador!'
                                    }
                                    type={
                                        error && !notValidate
                                        ? SnackbarType.fail
                                        : notValidate
                                        ? SnackbarType.fail
                                        : SnackbarType.success
                                    }
                                />
                                <SnackBar
                                    ref={snackbarRef2}
                                    message={notValidate ? "O código está inválido" : "O código está valido"}
                                    type={notValidate ? SnackbarType.fail : SnackbarType.success}
                                />
                            {
                                notValidate && ( 
                                    
                                    <>
                                        <div className='app__SignIn_box11' style={{marginTop: '1.5rem'}}>
                                            <input type="text" placeholder='verificar code' onChange={(e) => setCode(e.target.value)}></input>
                                        </div>
                                        <small style={{color:"red"}}>Verifica o teu email com o código que recebeste!</small>
                                        {
                                            (code === undefined || code === "" || code === null) ? 
                                            (
                                                <button className='main__action_btn' style={{opacity:"0.4"}} disabled>Verificar código</button>
                                            )
                                            :
                                            (
                                                <button className='main__action_btn' onClick={() => sendCode()}>Verificar código</button>
                                            )
                                        }
                                    </>
                                    )
                            }
                            {
                                loading || notValidate? 
                                (
                                    <button className='main__action_btn'>Login</button>
                                )
                                :
                                (
                                    <>
                                        <button className='main__action_btn' type='submit'>Login</button>
                                    </>
                                )
                            }
                                <div className='register'>Não tem conta? Registe-se 
                                    <span><Link to="/signup" > aqui.</Link></span>
                                </div>
                                <div className='register'>Transportadora? 
                                    <span><Link to="/transportadora" > aqui.</Link></span>
                                </div>
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
        </div>
    </>
    )
}
  
export default SignInC