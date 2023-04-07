import React, { useState } from 'react';
import { FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './SignIn.css';
import images from '../../assets/images';

const SignInC = () => {
    return (
    <>
        <img className='app__SignIn_rectangle1' src={images.Rectangle1} alt="" />
        <img className='app__SignIn_rectangle2' src={images.Rectangle2} alt="" />
        <div className='app__SignIn main__container'>
            <Link to='/'><FiArrowLeft></FiArrowLeft></Link>
            <h1 className=''>Sign In</h1>
                <div className='app__SignIn_box'>
                    <div className='app__SignIn_box1'>
                        <form>
                            <div>
                                <p>E-mail</p>
                                <div className='app__SignIn_box11'>
                                    <FiMail fontSize={22} color='black'  aria-hidden="true"/>
                                    <input
                                        name=""
                                        id=""
                                        type="text"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <p>Password</p>
                                <div className='app__SignIn_box11'>
                                    <FiLock fontSize={22} color='black'  aria-hidden="true"/>
                                    <input
                                        name=""
                                        id=""
                                        type="password"
                                        required
                                    />
                                </div>
                                <p>Esqueceu-se da password?</p>
                            </div>
                            <div className='app__SignIn_box13'>
                            <button className='main__action_btn' type='submit'>Login</button>
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