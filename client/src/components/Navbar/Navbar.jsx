import React from 'react'
import { RxPerson, RxHamburgerMenu } from 'react-icons/rx';
import { FiShoppingCart, FiSearch } from 'react-icons/fi'

import images from '../../assets/images.js';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='app__navbar'>
        <div className='app__navbar__menu'>
            <RxHamburgerMenu fontSize={30} color="black"></RxHamburgerMenu>
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
                <RxPerson fontSize={30} color="black"></RxPerson>

                <div style={{margin: '0 .75rem'}}>
                    <p>Account</p>
                    <p style={{fontSize: '12px', opacity: '80%'}}>Sign In</p>
                </div>

            </div>

            <div className='flex'>
                <FiShoppingCart fontSize={30} color="black"></FiShoppingCart>

                <div style={{margin: '0 .75rem'}}>
                    <p>Total</p>
                    <p style={{fontSize: '12px', opacity: '80%'}}>0.00€</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Navbar