import React from 'react'

import { FiShoppingCart, FiRepeat} from 'react-icons/fi';
import './Product.css';

const Product = (props) => {
    
    const {id, productName, price, productImage} = props.data;

    return (
        <div className='product'>
            <img className='product_img' src={productImage} />
            <div className='product_description'>
                <p>{productName}</p>
                <p className='product_price'>{price} €</p>
                <div className='product_action_section'>
                    <button style={{marginRight: "0.25rem"}}><FiShoppingCart></FiShoppingCart><span>Adicionar</span></button>
                    <button><FiRepeat></FiRepeat><span>Comparar</span></button>
                </div>
            </div>
        </div>
    )
}

export default Product