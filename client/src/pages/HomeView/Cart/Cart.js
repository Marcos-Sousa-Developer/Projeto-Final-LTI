import React, { useEffect } from 'react';
import { Cookies, useCookies } from 'react-cookie';
import { FiArrowLeft, FiArrowRight, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { PRODUCTS } from '../../../assets/products';
import { Navbar, Footer, SubHeading, Modal } from '../../../components/index';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import { CartItem } from './CartItem';
import images from '../../../assets/images.js';

import './Cart.css';
import { useState } from 'react';

const Cart = () => {

  const [isOpen, setIsOpen] = useState(false);


  const [cookies, setCookie] = useCookies(['cart']);
  const [totalItems, setTotalItems] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  const deleteAllCartItem = () => {
    const prevValue =  {};
    setCookie('cart', prevValue, { path: '/' });
  }
  
  useEffect(() => {

    if(cookies.cart){
      let total= 0;
      let totalI = 0;
      for (const item in cookies.cart) {
        total += (cookies.cart[item][1] * cookies.cart[item][0]);
        totalI += cookies.cart[item][0]
      }
    setTotalAmount(total)
    setTotalItems(totalI)
    }


  },[cookies.cart])

  return (
    <>
      <Navbar></Navbar>
      <div className='main__container app__cart'>
        <SubHeading title="Carrinho"></SubHeading>

        {totalAmount > 0 ? (
          <>
            <div className='app__cart_before_content'>
              <div className='flex'>
                <Link to='/' className='flex app__cart_before_content_btn'>
                  <FiArrowLeft></FiArrowLeft>
                  <p>Continuar a comprar</p>
                </Link>
                <button className='flex app__cart_before_content_btn' onClick={() => setIsOpen(true)}>
                  <FiTrash2></FiTrash2>
                  <p>Limpar carrinho</p>
                </button>
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                  <p>Tem a certeza que deseja apagar os items do carrinho?</p>
                  <button onClick={() => setIsOpen(false)}>Cancelar</button>
                  <button onClick={() => deleteAllCartItem()}>Apagar tudo</button>
                </Modal>
              </div>
            </div>

            <div className='app__cart_content'>
              <div className='app__cart_subcontent'>
                {PRODUCTS.map((product) => {
                  if(![0,undefined].includes(cookies.cart[product.id]) ){
                    return <CartItem data={product}></CartItem>
                  }
                })}
              </div>

              <div className='app__cart_checkout_area'>
                <p style={{marginBottom: '1rem', fontSize: '1.5rem'}}>Sumário</p>
                <p>Nº de Items: {totalItems}</p>
                <p>SubTotal: {0}</p>
                <p>Total: <PriceDisplay className='product_price' price={totalAmount} /></p>
                <button className='main__action_btn app__cart_checkout_btn' >Checkout</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <img className='empty_cart_img' src={images.empty_cart}></img>
            <h5>O carrinho está vazio.</h5>
          </>
        )}

      </div>
      <Footer></Footer>
    </>
  )
}

export default Cart