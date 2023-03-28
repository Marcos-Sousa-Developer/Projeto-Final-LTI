import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiAlignLeft, FiUser, FiX, FiChevronUp, FiChevronRight } from 'react-icons/fi';

import images from '../../assets/images.js';
import { PRODUCTS } from '../../assets/products';
import { ShopContext } from '../../context/ShopContextProvider';
import { categories } from '../../utilities/categories'
import Searchbar from './Searchbar/Searchbar';
import './styles/Sidebar.css';
import './styles/Navbar.css';
//import { PriceDisplay } from '../../utilities/formatCurrency';

const Navbar = () => {

    //---------------------------SideBar--------------------------
   
    const Sidebar = ({ className }) => {
        const [selected, setSelected] = useState(null);

        const toggleAccordion = (i) =>{
          if (selected === i){
            return setSelected(null);
          }
          
          setSelected(i);
        }

        return(
          <div className={ `app__sidebar ${className}` }>
            <div className="app__sidebar_content">
                <img src={images.logo} alt="" />
                <FiX fontSize={30} color="black" className='app__pointer app__icon_effect' onClick={toggleSidebar}></FiX>
                <div className="app__sidebar_navs">
                    <ul>
                        {categories.map((category, i) => {
                            return (
                                <div key={category.name} className='app__sidebar_navs_category'>
                                    <div className='app__sidebar_navs_category-title' onClick={()=>toggleAccordion(i)}>
                                        <p>{category.name}</p>
                                        <span>{selected === i ? <FiChevronUp className='app__sidebar_navs_category-title_up'></FiChevronUp> : <FiChevronRight className='app__sidebar_navs_category-title_right'></FiChevronRight>}</span>
                                    </div>
                                    <div className={selected === i ? 'app__sidebar_navs_category-content show' : 'app__sidebar_navs_category-content'}>
                                        {category.subcategory.map(subcategory => (
                                            <li key={subcategory}><Link to="/cart" className='app__text_effect' style={{fontSize:'.9rem'}}>{subcategory}</Link></li>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                </div>
            </div>
          </div>
        )
    }

    const ButtonToggle = (props) => {
        return(
            <FiAlignLeft  
                fontSize={30} 
                color="black" 
                className='app__pointer app__icon_effect' 
                id="sidebar-toggler" 
                onClick={ props.onClick } 
                style={{marginBottom: '.75rem'}}>
            </FiAlignLeft>
        )
    }

    const Overlay = ({ className, onClick}) => {
        return(
          <div className={ className } onClick={ onClick }></div>
        )
    }
      
    const [active, setActive] = useState(false);
    const toggleSidebar = () => setActive(!active);

    //--------------------------Cart-----------------------------

    const { cartItems } = useContext(ShopContext);
    let totalCartItems = 0;

    {PRODUCTS.map((product) => {
        if(cartItems[product.id] !== 0){
            totalCartItems++;
        }
    })};

    //----------------------------------------------------------
    
    return (
        <>
        <nav className='app__navbar main__container'>
            <div className='app__navbar_menu'>
                <ButtonToggle onClick={toggleSidebar}/>
                <Overlay className={ active ? 'overlay active' : 'overlay'} onClick={toggleSidebar}/>
                <Sidebar className={ active ? 'slide-right active' : null}/>
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
        </>
    )
}

export default Navbar