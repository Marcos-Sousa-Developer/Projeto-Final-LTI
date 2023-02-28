import React, { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import './SignIn.css';

const SignInC = () => {
    return (
        <>
        <h1>Sign In</h1>
        <div className='app__SignIn'>
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
                      </div>
                      <div className='app__SignIn_box13'>
                      <button type='submit'>
                          Login
                      </button>
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


