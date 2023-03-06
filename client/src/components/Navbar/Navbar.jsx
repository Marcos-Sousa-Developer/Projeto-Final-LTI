import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiAlignLeft, FiUser, FiX } from 'react-icons/fi';
import Searchbar from './Searchbar/Searchbar';
import images from '../../assets/images.js';
import './Navbar.css';

import { PRODUCTS } from '../../assets/products';
import { ShopContext } from '../../context/ShopContextProvider';
import { PriceDisplay } from '../../utilities/formatCurrency';

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    //--------------------------------------------------------
    const { cartItems } = useContext(ShopContext);
    let totalCartItems = 0;

    {PRODUCTS.map((product) => {
        if(cartItems[product.id] !== 0){
            totalCartItems++;
        }
    })};
    //--------------------------------------------------------

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
        <nav className='app__navbar main__container'>
            <div className='app__navbar_menu'>
                <FiAlignLeft fontSize={30} className='app__pointer app__icon_effect' onClick={() => setToggleMenu(true)}></FiAlignLeft>
                {toggleMenu && (
                    <div className="app__navbar_menu_categories slide-right">
                        <div className='app_categories_wrapper'>
                            <FiX fontSize={30} color="black" className='app__pointer app__icon_effect' onClick={() => setToggleMenu(false)}></FiX>
                            <img src={images.logo} alt="" className="app__logo"/>
                            <div></div>
                            <ul className='app_categories'>
                                {categories.map(category => {
                                    return (
                                        <li key={category.id}><Link to="/" className='app__text_effect'>{category.name}</Link></li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                )}
                <Link to='/'><img src={images.logo} alt="" className="app__logo"/></Link>
            </div>

            <Searchbar></Searchbar>

            <div className='app__navbar_profile'>


                <Link to="/signin" className="flex app__pointer app__navbar_links">
                    <FiUser fontSize={30} color="black" className='profile_icon'></FiUser>

                    <div className="app__navbar_profile_account" style={{margin: '0 .75rem'}}>
                        <span className="profile_link">Conta</span>
                        <p style={{fontSize: '12px', opacity: '80%'}}>Iniciar sessão</p>
                    </div>
                </Link>
                    
                

                <Link to="/cart" className="flex app__pointer app__navbar_links"  style={{marginRight:'0'}}>
                    <div className='app__navbar_profile_icon'>
                        <FiShoppingCart fontSize={30} color="black" className='profile_icon'></FiShoppingCart>
                        {totalCartItems > 0 ? (
                            <p className='app__navbar_cartItems'>{totalCartItems}</p>
                        ) : (
                            <p style={{display: 'none'}}>{totalCartItems}</p>
                        )}
                    </div>

                    <div className='app__navbar_profile_cart' style={{margin: '0 .75rem'}}>
                        <span className="profile_link">Carrinho</span>
                        <p style={{fontSize: '12px', opacity: '80%'}}>0.00€</p>
                    </div>

                </Link>
                
            </div>
        </nav>
  )
}

export default Navbar