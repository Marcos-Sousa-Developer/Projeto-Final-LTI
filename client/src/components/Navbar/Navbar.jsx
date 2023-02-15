import React, { useState } from 'react';
import { FiShoppingCart, FiAlignLeft, FiUser, FiX } from 'react-icons/fi';

import Searchbar from './Searchbar/Searchbar.jsx';
import images from '../../assets/images.js';
import './Navbar.css';

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <nav className='app__navbar app__container'>
            <div className='app__navbar_menu'>
                <FiAlignLeft fontSize={30} color="black" className='app__pointer app__icon_effect' onClick={() => setToggleMenu(true)}></FiAlignLeft>
                {toggleMenu && (
                    <div className="app__navbar_menu_categories slide-right">
                        <div className='teste'>
                            <FiX fontSize={30} color="black" className='app__pointer app__icon_effect' onClick={() => setToggleMenu(false)}></FiX>
                            <img src={images.logo} alt=""/>
                            <div></div>
                            <ul className=''>
                                <li>Categoria 1</li>
                                <li>Categoria 2</li>
                                <li>Categoria 3</li>
                                <li>Categoria 4</li>
                            </ul>
                        </div>
                    </div>
                )}
                <img src={images.logo} alt="" />
            </div>

            <Searchbar></Searchbar>

            <div className='app__navbar_profile flex'>

                <div className='flex'>
                    <FiUser fontSize={30} color="black" className='app__pointer app__icon_effect'></FiUser>

                    <div className="app__navbar_profile_account" style={{margin: '0 .75rem'}}>
                        <p>Account</p>
                        <p style={{fontSize: '12px', opacity: '80%'}}>Sign In</p>
                    </div>

                </div>

                <div className='flex' style={{marginRight:'0'}}>
                    <FiShoppingCart fontSize={30} color="black" className='app__pointer app__icon_effect'></FiShoppingCart>

                    <div className='app__navbar_profile_cart' style={{margin: '0 .75rem'}}>
                        <p>Total</p>
                        <p style={{fontSize: '12px', opacity: '80%'}}>0.00€</p>
                    </div>

                </div>
            </div>
        </nav>
  )
}

export default Navbar