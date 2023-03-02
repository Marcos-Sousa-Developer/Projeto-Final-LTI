import React, { useContext } from 'react';

import { ShopContext } from '../../../context/ShopContextProvider';

export const CartItem = (props) => {
    
    const {id, productName, price, productImage} = props.data;
    const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);

    return (
        <div>
            <img src={productImage} alt="" />
            <div>
                <p>{productName}</p>
                <p>{price}</p>
                <div>
                    <button onClick={() => removeFromCart(id)}>-</button>
                    <input value={cartItems[id]} onChange={ (e) => updateCartItemCount(Number(e.target.value),id)}/>
                    <button onClick={() => addToCart(id)}>+</button>
                </div>
            </div>
        </div>
    )
}