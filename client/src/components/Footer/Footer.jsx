import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';
import images from '../../assets/images.js';

const Footer = () => {
  return (
    <div className='app__footer main__container'>
        <div className='app__support'>
            <h5><strong>Suporte</strong></h5>
            <div className='app__support2'>
              <Link to='/FAQ'>FAQ</Link>
              <Link to='/'>Termos e Condições</Link>
              <Link to='/'>Política de Privacidade</Link>
            </div>
        </div>   
    
        <div className='app__support'>
          <h5><strong>Sobre nós</strong></h5>
          <div className='app__support2'>
              <Link to='/api/v1/login'>API</Link>
              <Link to='/'>Equipa</Link>
              <Link to='/'>Conceito</Link>
            </div>
        </div>   

        <div className='app__support'>
          <h5><strong>Tipos de Pagamento</strong></h5>
          <div className='app__support3'>
            <img src={images.mastercard} alt="" />
            <img src={images.visa} alt="" />
            <img src={images.paypal} alt="" />
            <p>© Copyright <strong>FCUL Grupo 1</strong>. All Rights Reserved.</p>
          </div>
        </div>   
    </div>  
  )
}

export default Footer