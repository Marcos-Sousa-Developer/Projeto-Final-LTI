import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiAlignLeft, FiUser, FiX } from 'react-icons/fi';

import Searchbar from './Searchbar/Searchbar';
import images from '../../assets/images.js';
import './Navbar.css';

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    const categories = [
        {id: 1, name: 'Carros, Motores, Barcos'},
        {id: 2, name: 'Lazer'},
        {id: 3, name: 'Móveis, Casa, Jardim'},
        {id: 4, name: 'Tecnologia'},
        {id: 5, name: 'Equipamentos e Ferramentas'},
        {id: 6, name: 'Comida'},
        {id: 7, name: 'Desporto'},
        {id: 8, name: 'Outros'},
    ];

    return (
        <nav className='app__navbar app__container'>
            <div className='app__navbar_menu'>
                <FiAlignLeft fontSize={30} className='app__pointer app__icon_effect' onClick={() => setToggleMenu(true)}></FiAlignLeft>
                {toggleMenu && (
                    <div className="app__navbar_menu_categories slide-right">
                        <div className='app_categories_wrapper'>
                            <FiX fontSize={30} color="black" className='app__pointer app__icon_effect' onClick={() => setToggleMenu(false)}></FiX>
                            <img src={images.logo} alt="" className="app__logo"/>
                            <div></div>
                            <ul className='app_categories'>
                                {categories.map(categorie => {
                                    return (
                                        <li><Link key={categorie.id} to="/" className='app__text_effect'>{categorie.name}</Link></li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                )}
                <img src={images.logo} alt="" className="app__logo"/>
            </div>

            <Searchbar></Searchbar>

            <div className='app__navbar_profile'>

                <div className='flex'>
                    <Link to="/profile" className="">
                       <FiUser fontSize={30} color="black" className='app__pointer app__icon_effect'></FiUser>
                    </Link>

                    <div className="app__navbar_profile_account" style={{margin: '0 .75rem'}}>
                        <Link to="/profile" className="app__text_effect">Conta</Link>
                        <p style={{fontSize: '12px', opacity: '80%'}}>Sign Up</p>
                    </div>

                </div>

                <div className='flex' style={{marginRight:'0'}}>
                    <Link to="/cart" className="">
                        <FiShoppingCart fontSize={30} color="black" className='app__pointer app__icon_effect'></FiShoppingCart>
                    </Link>

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