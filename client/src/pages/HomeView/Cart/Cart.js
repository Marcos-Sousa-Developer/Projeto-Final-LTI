import React, { useContext } from 'react';
import { FiArrowLeft, FiArrowRight, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { PRODUCTS } from '../../../assets/products';
import { Navbar, Footer, SubHeading } from '../../../components/index';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import { ShopContext } from '../../../context/ShopContextProvider';
import { CartItem } from './CartItem';

import './Cart.css';

const Cart = () => {

  const { cartItems, getTotalCartAmount, removeAllFromCart, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  let totalCartItems = 0;

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
                <button className='flex app__cart_before_content_btn' onClick={() => removeAllFromCart()}>
                  <FiTrash2></FiTrash2>
                  Limpar carrinho
                </button>
              </div>
            </div>

            <div className='app__cart_content'>
              <div className='app__cart_subcontent'>
                {PRODUCTS.map((product) => {
                  if(cartItems[product.id] !== 0){
                    totalCartItems++;
                    return <CartItem data={product}></CartItem>
                  }
                })}
              </div>

              <div className='app__cart_checkout_area'>
                <p style={{marginBottom: '1rem', fontSize: '1.5rem'}}>Sumário</p>
                <p>Nº de Items: {totalCartItems}</p>
                <p>SubTotal: </p>
                <p>Total: <PriceDisplay className='product_price' price={totalAmount} /></p>
                <button className='main__action_btn app__cart_checkout_btn' onClick={() => checkout() }>Checkout</button>
              </div>
            </div>
          </>
        ) : (
          <h5>O carrinho está vazio.</h5>
        )}

      </div>
      <Footer></Footer>
    </>
  )
}

export default Cart