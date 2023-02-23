import React from 'react'

const Product = (props) => {
    
    const {id, productName, price, productImage} = props.data;

    return (
        <div>
            <img src={productImage} />
            <div>
                <p>{productName}</p>
                <p>{price} €</p>
            </div>
        </div>
    )
}

export default Product