import React, { useContext } from 'react';
import { FiArrowLeft, FiArrowRight, FiTrash2 } from 'react-icons/fi';

import { PRODUCTS } from '../../../assets/products';
import { Navbar, Footer, SubHeading } from '../../../components/index';
import { ShopContext } from '../../../context/ShopContextProvider';
import { CartItem } from './CartItem';

import './Cart.css';

const Cart = () => {

  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  return (
    <>
      <Navbar></Navbar>
      <div className='main__container app__cart'>
        <SubHeading title="Carrinho"></SubHeading>

        {totalAmount > 0 ? (
          <>
            <div className='app__cart_before_content'>
              <div className='flex'>
                <div className='flex app__cart_before_content_btn'>
                  <FiArrowLeft></FiArrowLeft>
                  <p>Continuar a comprar</p>
                </div>
                <div className='flex app__cart_before_content_btn'>
                  <FiTrash2></FiTrash2>
                  <p>Limpar carrinho</p>
                </div>
              </div>
              <div>
                nr de items
              </div>
            </div>

            <div className='app__cart_content'>
              <div className='app__cart_subcontent'>
                {PRODUCTS.map((product) => {
                  if(cartItems[product.id] !== 0){
                    return <CartItem data={product}></CartItem>
                  }
                })}
              </div>

              <div className='app__cart_subcontent'>
                <h3>Sumário</h3>
                <p>SubTotal: {totalAmount}</p>
                <button className='main__action_btn'>
                  <FiArrowRight></FiArrowRight>
                  <p>Checkout</p>
                </button>
              </div>
            </div>
          </>
        ) : (
          <h1>O carrinho está vazio</h1>
        )}

      </div>
      <Footer></Footer>
    </>
  )
}

export default Cart