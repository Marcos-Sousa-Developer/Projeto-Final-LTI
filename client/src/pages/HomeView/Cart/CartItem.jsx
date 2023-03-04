import React, { useContext } from 'react';
import { FiX, FiPlus, FiMinus } from 'react-icons/fi';

import { ShopContext } from '../../../context/ShopContextProvider';
import './Cart.css';

export const CartItem = (props) => {
    
    const {id, productName, price, productImage} = props.data;
    const { cartItems, addToCart, removeFromCart, updateCartItemCount, deleteCartItem } = useContext(ShopContext);

    return (
        <div className='app__cartItem'>
            <img src={productImage} alt="" />
            <div>
                <p>{productName}</p>
            </div>
            <div className='app__cartItem_actions_1'>
                <div className='app__cartItem_actions_1_content'>
                    <button onClick={() => removeFromCart(id)}><FiMinus></FiMinus></button>
                    <input value={cartItems[id]} onChange={ (e) => updateCartItemCount(Number(e.target.value),id)}/>
                    <button onClick={() => addToCart(id)}><FiPlus></FiPlus></button>
                </div>
            </div>
            <p className='app__cartItem_actions_2'>{price}</p>
            <button className='app__cartItem_actions_3' onClick={() => deleteCartItem(id)}><FiX fontSize={24}></FiX></button>
        </div>
        
    )
}