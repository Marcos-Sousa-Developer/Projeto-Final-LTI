import React, { useContext } from 'react'
import { FiShoppingCart, FiRepeat} from 'react-icons/fi';

import { ShopContext } from '../../context/ShopContextProvider';
import './Product.css';

const Product = (props) => {
    
    const {id, productName, price, productImage} = props.data;

    const { addToCart, cartItems } = useContext(ShopContext);
    const cartItemAmount = cartItems[id];

    return (
        <div className='product'>
            <img className='product_img' src={productImage} />
            <div className='product_description'>
                <p>{productName}</p>
                <p className='product_price'>{price} €</p>
                <div className='product_action_section'>
                    <button 
                        style={{marginRight: "0.25rem"}} 
                        onClick={() => addToCart(id)}>

                        <FiShoppingCart></FiShoppingCart>
                        <span>Adicionar {cartItemAmount > 0 && <>({cartItemAmount})</>}</span>
                    </button>
                    <button><FiRepeat></FiRepeat><span>Comparar</span></button>
                </div>
            </div>
        </div>
    )
}

export default Product