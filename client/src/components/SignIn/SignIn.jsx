import React, { useState } from 'react';
import { RxPerson, RxHamburgerMenu } from 'react-icons/rx';
import { FiShoppingCart, FiSearch } from 'react-icons/fi';
import { MdOutlineClose } from 'react-icons/md';

const SignIn = () => {
    return (
      <div className='app_SignIn flex'>
          <h1>Sign In</h1>
            <div className='app_SignIn__box flex'>
                <div className='app_SignIn__box1 flex'>
                    <p>Email</p>

                    <p>Password</p>

                </div>

                <div className='app_SignIn__box2 flex'>
                    <div className='app_SignIn__box2G flex'>
                        <p>Google</p>
                    </div>
                    <div className='app_SignIn__box2F flex'>
                        <p>Facebook</p>
                    </div>
                    <div className='app_SignIn__box2T flex'>
                        <p>Twitter</p>
                    </div>
                </div>
            </div>    
      </div>  
    )
  }
  
  export default Footer


import './SignIn.css';