import React, { useContext } from 'react';

import { PRODUCTS } from '../../../assets/products';
import { Navbar, Footer, Product } from '../../../components/index';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import { ShopContext } from '../../../context/ShopContextProvider';
import images from '../../../assets/images.js';

import './Category.css';

const Category = () => {

  const { cartItems, getTotalCartAmount, removeAllFromCart, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  let totalCartItems = 0;

  return (
    <>
      <Navbar></Navbar>
      <div className='products main__container' id="comprar_div">
        {PRODUCTS.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
      <Footer></Footer>
    </>
  )
}

export default Category