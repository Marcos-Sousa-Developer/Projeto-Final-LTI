import React from 'react'

import {Navbar, Footer} from '../../../components/index';
import { FiMail} from 'react-icons/fi';
import './SupplierProfile.css';

function SupplierProfile() {

  return (
    <>
      <Navbar></Navbar>
      <div className='app__SupplierProfile'>
        <h3 className='leftBar active'>Conta</h3>    
        <ul>
          <li><a className='option active' href="#">Dados Pessoais</a></li>
          <li><a className='option' href="#">Vendidos</a></li>
          <li><a href="#">Anúncios</a></li>
        </ul>
        <div className='app__SupplierProfile_box'>
          <div className="col-xxl-15">
            <div className="container">
              <div className="row">
                <div className="form-group col-md form-input">
                  <br></br>
                  <label htmlFor="firstName">Primeiro Nome</label>
                  <input
                    className="form-control"
                    id="firstName"
                    type="firstName"
                  ></input>
                </div>
                <div className="form-group col-md-1 form-input"></div>
                <div className="form-group col-md">
                  <br></br>
                  <label htmlFor="lastName">Último Nome</label>
                  <input
                    className="form-control bi bi-bag"
                    id="lastName"
                    type="lastName"
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md">
                  <br></br>
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                  ></input>
                </div>
                <div className="form-group col-md-1 form-input"></div>
                <div className="form-group col-md">
                  <br></br>
                  <label htmlFor="address">Endereço</label>
                  <input
                    type="address"
                    className="form-control"
                    id="address"
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md">
                  <br></br>
                  <label htmlFor="nif">NIF</label>
                  <input
                    className="form-control"
                    id="nif"
                    type="text"
                  ></input>
                </div>
                <div className="form-group col-md-1 form-input"></div>
                <div className="form-group col-md">
                  <br></br>
                  <label htmlFor="cellphone">Telemóvel</label>
                  <input
                    className="form-control"
                    id="cellphone"
                    type="text"
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md">
                  <br></br>
                  <label htmlFor="password">Palavra-passe</label>
                  <input
                    className="form-control"
                    id="password"
                    type="password" 
                  ></input>
                  
                </div>
                <div className="form-group col-md-1 form-input"></div>
                <div className="form-group col-md">
                  <br></br>
                  <label htmlFor="password">Confirmar palavra-passe</label>
                  <input
                    className="form-control"
                    id="confirmPassword"
                    type="password" 
                  ></input>
                  <br></br>
                </div>
              </div>
              <br></br>
            </div>
          </div>
        </div>
        <button className='saveButton' >Guardar</button>
      </div>
    <Footer></Footer>
    </>
  );

}

export default SupplierProfile;