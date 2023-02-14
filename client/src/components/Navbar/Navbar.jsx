import React, { useState } from 'react';
import { RxPerson, RxHamburgerMenu } from 'react-icons/rx';
import { FiShoppingCart, FiSearch } from 'react-icons/fi';
import { MdOutlineClose } from 'react-icons/md';

import images from '../../assets/images.js';
import './Navbar.css';

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <nav className='app__navbar app__container' id='p2'>
            <div className='app__navbar__menu'>
                <RxHamburgerMenu fontSize={30} color="black" className='app__pointer' onClick={() => setToggleMenu(true)}></RxHamburgerMenu>
                {toggleMenu && (
                    <div className="app__navbar__menu_categories slide-right">
                        <div className='flex'>
                            <MdOutlineClose fontSize={30} color="black" className='app__pointer' onClick={() => setToggleMenu(false)}></MdOutlineClose>
                            <img src={images.logo} alt="" style={{marginLeft:'1rem'}}/>
                        </div>
                        <ul className='flex'>
                            <li>Categoria 1</li>
                            <li>Categoria 2</li>
                            <li>Categoria 3</li>
                            <li>Categoria 4</li>
                        </ul>
                    </div>
                )}
                <img src={images.logo} alt="" />
            </div>

            <div className='app__navbar__searchBar'>
                <div>
                    <FiSearch fontSize={22} color='black'></FiSearch>
                    <input type="text" placeholder='Pesquise...'/>
                </div>
            </div>

            <div className='app__navbar__profile flex'>

                <div className='flex'>
                    <RxPerson fontSize={30} color="black" className='app__pointer'></RxPerson>

                    <div style={{margin: '0 .75rem'}}>
                        <p>Account</p>
                        <p style={{fontSize: '12px', opacity: '80%'}}>Sign In</p>
                    </div>

                </div>

                <div className='flex'>
                    <FiShoppingCart fontSize={30} color="black" className='app__pointer'></FiShoppingCart>

                    <div style={{margin: '0 .75rem'}}>
                        <p>Total</p>
                        <p style={{fontSize: '12px', opacity: '80%'}}>0.00€</p>
                    </div>

                </div>
            </div>
        </nav>
  )
}

export default Navbar