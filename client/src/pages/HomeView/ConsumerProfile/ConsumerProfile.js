import React from 'react'

import {Navbar, Footer, SubHeading, Button} from '../../../components/index';
import {FiUser, FiMail, FiLock, FiSmartphone, FiMapPin} from 'react-icons/fi';
import './ConsumerProfile.css';

function ConsumerProfile() {

  return (
    <>
      <Navbar></Navbar>
      <div className='app__ConsumerProfile'>   
        <SubHeading title="Conta"/>
        <div className='app__ConsumerProfile_options'>
          <ul>
            <li><span></span><a className='option active app__text_effect' href="#">Dados Pessoais</a></li>
            <li><a className='app__text_effect' href="#">Encomendas</a></li>
            
          </ul>
        </div>
        <div className='app__ConsumerProfile_box'>
          <div className='app__ConsumerProfile_box_div'>
            <div className='app__ConsumerProfile_box_div_row'>
              Primeiro Nome
              <div className='app__ConsumerProfile_box_div_row_input'>
                <FiUser></FiUser>
                <input></input>
              </div>
            </div>
            <div className='app__ConsumerProfile_box_div_row'>
              Email
              <div className='app__ConsumerProfile_box_div_row_input'>
                <FiMail></FiMail>
                <input></input>
              </div>
            </div>
            <div className='app__ConsumerProfile_box_div_row'>
              NIF
              <div className='app__ConsumerProfile_box_div_row_input'>
                <input></input>
              </div>
            </div>
            <div className='app__ConsumerProfile_box_div_row'>
              Palavra-passe
              <div className='app__ConsumerProfile_box_div_row_input'>
                <FiLock></FiLock>
                <input></input>
              </div>
            </div>
          </div>
          <div className='app__ConsumerProfile_box_div'>
            <div className='app__ConsumerProfile_box_div_row'>
              Último Nome
              <div className='app__ConsumerProfile_box_div_row_input'>
                <FiUser></FiUser>
                <input></input>
              </div>
            </div>
            <div className='app__ConsumerProfile_box_div_row'>
              Morada
              <div className='app__ConsumerProfile_box_div_row_input'>
                <FiMapPin></FiMapPin>
                <input></input>
              </div>
            </div>
            <div className='app__ConsumerProfile_box_div_row'>
              Telemóvel
              <div className='app__ConsumerProfile_box_div_row_input'>
                <FiSmartphone></FiSmartphone>
                <input></input>
              </div>
            </div>
            <div className='app__ConsumerProfile_box_div_row'>
              Confirmar palavra-passe
              <div className='app__ConsumerProfile_box_div_row_input'>
                <FiLock></FiLock>
                <input></input>
              </div>
            </div>
          </div>
        </div>
        <Button title="Guardar"/>
      </div>
    <Footer></Footer>
    </>
  );

}

export default ConsumerProfile;