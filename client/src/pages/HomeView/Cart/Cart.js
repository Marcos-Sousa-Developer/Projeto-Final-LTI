import React, { useContext } from 'react'

import { PRODUCTS } from '../../../assets/products';
import {Navbar, Footer, SubHeading, Product} from '../../../components/index';
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
        <div className='app__cart_content'>
          {PRODUCTS.map((product) => {
            if(cartItems[product.id] !== 0){
              return <CartItem data={product}></CartItem>
            }
          })}
        </div>

        {totalAmount > 0 ? (
          <div>
            <p>Total: {totalAmount}</p>
            <button>Checkout</button>
          </div>
        ) : (
          <h1>O carrinho está vazio</h1>
        )}

      </div>
      <Footer></Footer>
    </>
  )
}

export default Cart