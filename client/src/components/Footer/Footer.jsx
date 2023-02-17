import React from 'react'

import './Footer.css';
import images from '../../assets/images.js';

const Footer = () => {
  return (
    <div className='app__footer app__container'>
        <div className='app__support'>
            <h5 className='primary-font'><strong>Support</strong></h5>
            <div className='app__support2'>
              <p>FAQ</p>
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
            </div>
        </div>   
    

        <div className='app__support'>
          <h5 className='primary-font'><strong>About us</strong></h5>
          <div className='app__support2'>
              <p>Team</p>
              <p>Concept</p>
            </div>
        </div>   

        <div className='app__support'>
          <h5 className='primary-font'><strong>We accept</strong></h5>
          <div className='app__support2'>
            <img src={images.mastercard} alt="" />
            <img src={images.visa} alt="" />
            <img src={images.paypal} alt="" />
          </div>
        </div>   
    </div>  
  )
}

export default Footer