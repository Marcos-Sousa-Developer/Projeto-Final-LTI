import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser} from 'react-icons/fi';
import { useCookies } from 'react-cookie';

import images from '../../assets/images.js';
import './styles/Navbar.css';

const NavbarSupplier = () => {
    const [cookies] = useCookies();

    return (
    <>
        <div className='app__navbarSupplier main__container'>
            <Link to='/supplier'><img src={images.logo} alt="" className="app__logo"/></Link>

            <div className='app__navbarSupplier_profile'>

                {
                    [undefined,null].includes(cookies.identification) ? (
                        <Link to="/signin" className="flex app__pointer app__navbar_links">
                            <FiUser fontSize={28} color="black" className='profile_icon'></FiUser>
        
                            <div className="app__navbarSupplier_profile_account" style={{margin: '0 .75rem'}}>
                                <span className="profile_link">Conta</span>
                                <p style={{fontSize: '12px', opacity: '80%'}}>Iniciar sessão</p>
                            </div>
                        </Link>
                    ) 
                    :
                    (
                        <Link to="/supplier/profile" className="flex app__pointer app__navbar_links">
                            <FiUser fontSize={28} color="black" className='profile_icon'></FiUser>
        
                            <div className="app__navbarSupplier_profile_account" style={{margin: '0 .75rem'}}>
                                <span className="profile_link">Conta</span>
                                <p style={{fontSize: '12px', opacity: '80%'}}>Olá {cookies.identification}</p>
                            </div>
                        </Link>
                    )
                }

                <Link to="/supplier/anunciar" className="flex app__pointer app__navbar_links app__navbarSupplier_btn"  style={{marginRight:'0'}}>
                    Anunciar
                </Link>

            </div>
        </div>
    </>
    )
}

export default NavbarSupplier