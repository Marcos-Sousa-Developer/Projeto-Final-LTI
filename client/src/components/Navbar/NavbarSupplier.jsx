import React from 'react';
import { Link } from 'react-router-dom';

import images from '../../assets/images.js';

const NavbarSupplier = () => {
  return (
    <>
        <Link to='/'><img src={images.logo} alt="" className=""/></Link>

        <div className='app__navbar_profile'>

            <Link to="/signin" className="flex app__pointer app__navbar_links">
                <FiUser fontSize={30} color="black" className='profile_icon'></FiUser>

                <div className="app__navbar_profile_account" style={{margin: '0 .75rem'}}>
                    <span className="profile_link">Conta</span>
                    <p style={{fontSize: '12px', opacity: '80%'}}>Iniciar sessão</p>
                </div>
            </Link>

            <Link to="/" className="flex app__pointer app__navbar_links"  style={{marginRight:'0'}}>
                Anunciar
            </Link>

        </div>
    </>
  )
}

export default NavbarSupplier