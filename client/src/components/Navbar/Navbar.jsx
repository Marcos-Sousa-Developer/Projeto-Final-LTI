import React, { useState } from 'react';
import { FiShoppingCart, FiAlignLeft, FiUser, FiX } from 'react-icons/fi';

import Searchbar from './Searchbar/Searchbar';
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
                            <img src={images.logo} alt="" className="app__logo"/>
                            <div></div>
                            <ul className='app_categories'>
                                <li><a href="" className="app__text_effect">Categoria 1</a></li>
                                <li><a href="" className="app__text_effect">Categoria 2</a></li>
                                <li><a href="" className="app__text_effect">Categoria 3</a></li>
                                <li><a href="" className="app__text_effect">Categoria 4</a></li>
                            </ul>
                        </div>
                    </div>
                )}
                <img src={images.logo} alt="" className="app__logo"/>
            </div>

            <Searchbar></Searchbar>

            <div className='app__navbar_profile'>

                <div className='flex'>
                    <FiUser fontSize={30} color="black" className='app__pointer app__icon_effect'></FiUser>

                    <div className="app__navbar_profile_account" style={{margin: '0 .75rem'}}>
                        <p>Conta</p>
                        <p style={{fontSize: '12px', opacity: '80%'}}>Sign Up</p>
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