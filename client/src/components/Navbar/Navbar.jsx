import React from 'react'
import { RxPerson, RxHamburgerMenu } from 'react-icons/rx';
import { FiShoppingCart } from 'react-icons/fi'
import './Navbar.css';

const Navbar = () => {
  return (
    <>
        <div className='navbar'>
            <div className='navbar__menu'>
                <RxHamburgerMenu fontSize={27} color="black"></RxHamburgerMenu>
                Greater Goods
            </div>
            <div className='navbar__search_bar'>
                <h1>Search Bar</h1>
            </div>
            <div>
                <RxPerson fontSize={27} color="black"></RxPerson>
                <FiShoppingCart fontSize={27} color="black"></FiShoppingCart>
            </div>
        </div>
    </>
  )
}

export default Navbar