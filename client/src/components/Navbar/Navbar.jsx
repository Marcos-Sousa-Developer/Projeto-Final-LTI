import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { Link, UNSAFE_LocationContext } from 'react-router-dom';
import { FiShoppingCart, FiAlignLeft, FiUser, FiX, FiChevronUp, FiChevronRight, FiChevronLeft, FiRepeat } from 'react-icons/fi';

import images from '../../assets/images.js';
import { teste } from '../../utilities/teste.js'
import Searchbar from './Searchbar/Searchbar';
import { PriceDisplay } from '../../utilities/formatCurrency.js';
import CustomNotification from '../Notification/CustomNotification.jsx';
import './styles/Sidebar.css';
import './styles/Navbar.css';

const Navbar = () => {

    //---------------------------SideBar--------------------------

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [currentTotalPrice, setCurrentTotalPrice] = useState(0)

    function setCategories(category, subCategory){
        if(category != null && subCategory == null){
            setSelectedCategory(category);
        }
        if(category != null && subCategory != null){
            setSelectedCategory(category);
            setSelectedSubCategory(subCategory);
        }
    }

    const SubsubCategory = ({ subcategory, onClick }) => {
        return (
          <div style={{marginBottom:'.75rem'}}>
            <div className='app__pointer' onClick={onClick}  style={{fontSize:'12px'}}>
                <FiChevronLeft></FiChevronLeft>    
                <a style={{fontWeight: '400'}}>Voltar atrás</a>
            </div>
            <a className='app__pointer app__sidebar_navs_subcategory-title' onClick={() => window.location.href = `/subcategoria?${new URLSearchParams({category: selectedCategory.name, subCategory: selectedSubCategory.name}).toString()}`}>{subcategory.name} (ver tudo)</a>
            <div style={{marginLeft:'.75rem'}}>
                {subcategory.subsubcategories.map((subsubcategory, i) => {
                    return <li style={{lineHeight:'2rem', fontWeight: '400'}}><a key={i} className='app__text_effect app__pointer' style={{fontSize:'14px'}} onClick={() => window.location.href = `/subsubcategoria?${new URLSearchParams({category: selectedCategory.name, subCategory: selectedSubCategory.name, subsubCategory: subsubcategory}).toString()}`}>{subsubcategory}</a></li>
                })}
            </div>
          </div>
        );
    };
   
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
                <FiX fontSize={28} color="black" className='app__pointer app__icon_effect' onClick={toggleSidebar}></FiX>
                <div className="app__sidebar_navs">
                    <ul>
                        {selectedSubCategory ? (
                            <SubsubCategory subcategory={selectedSubCategory} onClick={() => setSelectedSubCategory(null)}></SubsubCategory>
                        ) : (
                            teste.map((category, i) => {
                                return (
                                    <div key={category.name} className='app__sidebar_navs_category'>
                                        <div className='app__sidebar_navs_category-title' onClick={()=>toggleAccordion(i)}>
                                            <p style={{fontWeight:'500'}}>{category.name}</p>
                                            <span>{selected === i ? <FiChevronUp className='app__sidebar_navs_category-title_up'></FiChevronUp> : <FiChevronRight className='app__sidebar_navs_category-title_right'></FiChevronRight>}</span>
                                        </div>
                                        <div className={selected === i ? 'app__sidebar_navs_category-content show' : 'app__sidebar_navs_category-content'}>
                                            {category.subcategories.map(subcategory => (
                                                <li key={subcategory.name}>
                                                    <a className='app__text_effect app__pointer' onClick={() => setCategories(category, subcategory)}>{subcategory.name}</a>
                                                </li> 
                                            ))}
                                            <li><a className='app__text_effect app__pointer' onClick={() => window.location.href = `/categoria?${new URLSearchParams({category: category.name}).toString()}`}>Ver tudo</a></li>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </ul>
                </div>
            </div>
            <div>
                <hr></hr>
                <a className='app__pointer app__text_effect comparador' href='/comparador'>Comparador <FiRepeat></FiRepeat></a>
            </div>
          </div>
        )
    }

    //-----------------------ButtonToggle for modal------------------------

    const ButtonToggle = (props) => {
        return(
            <FiAlignLeft  
                fontSize={28} 
                color="black" 
                className='app__pointer app__icon_effect' 
                id="sidebar-toggler" 
                onClick={ props.onClick } 
                style={{marginBottom: '.75rem'}}>
            </FiAlignLeft>
        )
    }

    //-----------------------Dark Background Overlay------------------------

    const Overlay = ({ className, onClick}) => {
        return(
          <div className={ className } onClick={ onClick }></div>
        )
    }
      
    const [active, setActive] = useState(false);
    const toggleSidebar = () => setActive(!active);

    //--------------------------Cart-----------------------------

    const [totalCartItems, setTotalCartItems] = useState(0)
    const [cookies] = useCookies(['cart']);
    
    useEffect(() => {
        let currentPrice = 0
        let total = 0;
        for (const item in cookies.cart) {
            total += cookies.cart[item][0];
            currentPrice += (cookies.cart[item][0] * cookies.cart[item][1])
        }
        setCurrentTotalPrice(currentPrice)
        setTotalCartItems(total)

    },[cookies.cart])

    //-----------------------------------------------------------
    
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
            {
                [undefined,null].includes(cookies.identification) ? 
                (
                    ""
                )
                :
                (
                    <>
                        <CustomNotification></CustomNotification>
                    </>
                    
                )
            }

                {
                    [undefined,null].includes(cookies.identification) ? (
                        <Link to="/signin" className="flex app__pointer app__navbar_links">
                            <FiUser fontSize={28} color="black" className='profile_icon'></FiUser>
                            <div className="app__navbar_profile_account" style={{margin: '0 .75rem'}}>
                                <span className="profile_link">Conta</span>
                                <p style={{fontSize: '12px', opacity: '80%'}}>Iniciar sessão</p>
                            </div>
                        </Link>
                    ) 
                    :
                    (
                        <Link to="/consumer/profile" className="flex app__pointer app__navbar_links">
                            <FiUser fontSize={28} color="black" className='profile_icon'></FiUser>
                            <div className="app__navbar_profile_account" style={{margin: '0 .75rem'}}>
                                <span className="profile_link">Conta</span>
                                <p style={{fontSize: '12px', opacity: '80%'}}>Olá {cookies.identification}</p>
                            </div>
                        </Link>
                    )
                }

                    
                <Link to="/cart" className="flex app__pointer app__navbar_links"  style={{marginRight:'0'}}>
                    <div className='app__navbar_profile_icon'>
                        <FiShoppingCart fontSize={28} color="black" className='profile_icon'></FiShoppingCart>
                        {totalCartItems > 0 ? (
                            <p className='app__navbar_cartItems'>{totalCartItems}</p>
                        ) : (
                            <p style={{display: 'none'}}>{totalCartItems}</p>
                        )}
                    </div>
                    <div className='app__navbar_profile_cart' style={{margin: '0 .75rem'}}>
                        <span className="profile_link">Carrinho</span>
                        <p style={{fontSize: '12px', opacity: '80%'}} className='priceShow'><PriceDisplay className='product_price' price={currentTotalPrice} /></p>
                    </div>
                </Link>
                
            </div>
        </nav>
        </>
    )
}

export default Navbar