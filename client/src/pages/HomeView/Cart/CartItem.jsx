import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FiX, FiPlus, FiMinus } from 'react-icons/fi';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import './Cart.css';

export const CartItem = (props) => { 

    console.log(props.data)
    
    const {id, title, price, productImage} = props.data; 

    const [cookies, setCookie] = useCookies(['cart']);

    const removeFromCart = () => {
        const prevValue = cookies.cart || {};
        prevValue[id] = [prevValue[id][0] - 1 > 0 ? prevValue[id][0] - 1 : 1, price, title, props.data];
        setCookie('cart', prevValue, { path: '/' });
          
    }

    const updateCartItemCount = (value) => {
        const prevValue = cookies.cart || {};
  
        let parsedValue = parseInt(value)
        if (!isNaN(parsedValue)) {
            prevValue[id] = [parsedValue, price, title, props.data];
            setCookie('cart', prevValue, { path: '/' });
        }
    }

    const addToCart = () => {
        const prevValue = cookies.cart || {};
        prevValue[id] = [prevValue[id][0]+ 1, price, title, props.data];
        setCookie('cart', prevValue, { path: '/' });
    }

    const deleteCartItem = () => {
        const prevValue = cookies.cart || {};
        delete prevValue[id]
        setCookie('cart', prevValue, { path: '/' });
    }

    return (
        <div className='app__cartItem'>
            <img src={productImage} alt="" />
            <div className='app__cartItem_description'>
                <p>{title}</p>
                
            </div>
            <div className='app__cartItem_actions_1'>
                <div className='app__cartItem_actions_1_content'>
                    <button onClick={() => removeFromCart()}><FiMinus></FiMinus></button>
                    <input value={cookies.cart[id][0]} onChange={ (e) => updateCartItemCount(e.target.value)}/>
                    <button onClick={() => addToCart()}><FiPlus></FiPlus></button>
                </div>
            </div>
            <p className='app__cartItem_actions_2'><PriceDisplay price={price} /></p>
            <button className='app__cartItem_actions_3' onClick={() => deleteCartItem()}><FiX fontSize={24}></FiX></button>
        </div>
    )
}