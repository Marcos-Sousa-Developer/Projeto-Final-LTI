import React from 'react'

import './Product.css';

const Product = (props) => {
    
    const {id, productName, price, productImage} = props.data;

    return (
        <div className='product'>
            <img src={productImage} />
            <div className='product_description'>
                <p>{productName}</p>
                <p className='product_price'>{price} €</p>
            </div>
        </div>
    )
}

export default Product