import React from 'react'

import {Navbar, Footer} from '../../../components/index';
import { FiMail, FiLock } from 'react-icons/fi';
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
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );

}

export default SupplierProfile;