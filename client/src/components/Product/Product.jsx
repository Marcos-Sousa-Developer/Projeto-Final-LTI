import React, { useContext } from 'react'
import { FiShoppingCart, FiRepeat} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { ShopContext } from '../../context/ShopContextProvider';
import { PriceDisplay } from '../../utilities/formatCurrency';
import './Product.css';

const Product = (props) => {
    
    const {id, productName, price, productImage} = props.data;

    const { addToCart, cartItems } = useContext(ShopContext);
    const cartItemAmount = cartItems[id];

    return (
        <>  
            <div className='product'>
                <div><img className='product_img' src={productImage} /></div>
                <div className='product_description'>
                    <div>
                        <p>{productName}</p>
                        <PriceDisplay className='product_price' price={price} />
                    </div>
                    <div className='product_action_section'>
                        <button 
                            style={{marginRight: "0.25rem"}} 
                            onClick={() => addToCart(id)}>

                            <FiShoppingCart></FiShoppingCart>
                            <span>Adicionar {cartItemAmount > 0 && <>({cartItemAmount})</>}</span>
                        </button>
                        <button><FiRepeat></FiRepeat></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product