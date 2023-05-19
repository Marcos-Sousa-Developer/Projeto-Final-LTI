import React, { useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Navbar, Footer, SubHeading, Modal } from '../../../components/index';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import { CartItem } from './CartItem';
import images from '../../../assets/images.js';

import './Cart.css';
import { useState } from 'react';
import axios from 'axios';

const Cart = () => {
  //---------------------Modal---------------------
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  //------------------------------------------------

  const [loading, setLoading] = useState(false)
  const [cookies, setCookie] = useCookies(['cart']);
  const [totalItems, setTotalItems] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  const deleteAllCartItem = () => {
    const prevValue =  {};
    setCookie('cart', prevValue, { path: '/' });
  }

  const goToCheckout = async () => {

    const params = {}
    for (const item in cookies.cart) {
      const quantity = cookies.cart[item][0]
      const price = cookies.cart[item][1]
      const name = cookies.cart[item][2]

      params[item] = {price: price, quantity: quantity, name:name, image:"http://localhost:3000/static/media/Iphone.87f6c2f48f7e15ed845b.png"}
    }
    
    const response = await axios.post('/create-checkout-session', null, {params});
    window.location = response.data
    
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
                  <button className='main__action_btn' onClick={() => setIsOpen(false)}>Cancelar</button>
                  <button className='main__negative_action_btn' onClick={() => deleteAllCartItem()}>Apagar tudo</button>
                </Modal>
              </div>
            </div>

            <div className='app__cart_content'>
              <div className='app__cart_subcontent'>

                {Object.keys(cookies.cart).map((key) => {
                    return <CartItem data={cookies.cart[key][3]}></CartItem>
                })}

              </div>

              <div className='app__cart_checkout_area'>
                <p style={{marginBottom: '1rem', fontSize: '1.5rem'}}>Sumário</p>
                <p>Nº de Items: {totalItems}</p>
                <p>SubTotal: {0}</p>
                <p>Total: <PriceDisplay className='product_price' price={totalAmount} /></p>
                {
                  !loading ?  
                    <>
                      <button className='main__action_btn app__cart_checkout_btn' type="submit" onClick={() => setIsOpen2(true)}>
                        Checkout
                      </button>
                      <Modal open={isOpen2} onClose={() => setIsOpen2(false)}>
                        <p>Confirmar Informações de Encomenda</p>
                        <button className='main__action_btn' onClick={() => setIsOpen2(false)}>Cancelar</button>
                        <button className='main__negative_action_btn' onClick={() => goToCheckout()}>Checkout</button>
                      </Modal>
                    </>
                  :
                  <button className='main__action_btn app__cart_checkout_btn'>Loading</button>
                }
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