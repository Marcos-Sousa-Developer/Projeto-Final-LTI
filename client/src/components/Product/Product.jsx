import React from 'react'
import { FiShoppingCart, FiRepeat} from 'react-icons/fi';
import { PriceDisplay } from '../../utilities/formatCurrency';
import './Product.css';
import { useCookies } from 'react-cookie';

const Product = (props) => {
    
    const {id, productName, price, productImage} = props.data;

    const [cookies, setCookie] = useCookies(['cart']);

    const addToCart = () => {
        const prevValue = cookies.cart || {};
        prevValue[id] = [(prevValue[id]?.[0] ?? 0) + 1, price];
        setCookie('cart', prevValue, { path: '/' });
    }

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
                        <button style={{marginRight: "0.25rem"}} onClick={()=>addToCart()}>
                            <FiShoppingCart></FiShoppingCart>
                            <span>Adicionar</span>
                        </button>
                        <button><FiRepeat></FiRepeat></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product