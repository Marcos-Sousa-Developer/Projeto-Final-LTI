import React from 'react'

import './Footer.css';
import images from '../../assets/images.js';

const Footer = () => {
  return (
    <div className='app__footer app__container'>
        <div className='app__support'>
            <h5 className='primary-font'><strong>Suporte</strong></h5>
            <div className='app__support2'>
              <p>FAQ</p>
              <p>Termos e Condições</p>
              <p>Política de Privacidade</p>
            </div>
        </div>   
    

        <div className='app__support'>
          <h5 className='primary-font'><strong>Sobre nós</strong></h5>
          <div className='app__support2'>
              <p>Equipa</p>
              <p>Conceito</p>
            </div>
        </div>   

        <div className='app__support'>
          <h5 className='primary-font'><strong>Tipos de Pagamento</strong></h5>
          <div className='app__support2'>
            <img src={images.mastercard} alt="" />
            <img src={images.visa} alt="" />
            <img src={images.paypal} alt="" />
            <p style={{marginTop: '1.5rem'}}>© Copyright <strong>FCUL Grupo 1</strong>. All Rights Reserved.</p>
          </div>
        </div>   
    </div>  
  )
}

export default Footer