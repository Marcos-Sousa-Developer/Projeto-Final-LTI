import React, { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import './SignIn.css';

const SignInC = () => {
    return (
        <>
        <div className='app_SignIn'>
        <h1>Sign In</h1>
          <div className='app_SignIn__box flex'>
              <div className='app_SignIn__box1'>
                  <form>
                      <div>
                          <p>E-mail</p>
                          <div>
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
                          <div>
                              <FiLock fontSize={22} color='black'  aria-hidden="true"/>
                              <input
                                  name=""
                                  id=""
                                  type="password"
                                  required
                              />
                          </div>
                      </div>
                      <button type='submit'>
                          Login
                      </button>
                  </form>
              </div>

              <div className='app_SignIn__box2'>
                  <p>or</p>    

              </div>
              <div className='app_SignIn__box3'>
                  <button>
                      Google
                  </button>
                  <button>
                      Facebook
                  </button>
                  <button>
                      Twitter
                  </button>
              </div>
          </div>    
    </div>  
    </>
    )
  }
  
  export default SignInC


