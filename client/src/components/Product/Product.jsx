import React, {useState} from 'react'
import { FiShoppingCart, FiRepeat} from 'react-icons/fi';
import { PriceDisplay } from '../../utilities/formatCurrency';
import './Product.css';
import { useCookies } from 'react-cookie';
import ComparePopUp from '../ComparePopUp/ComparePopUp';

const Product = (props) => {
    //comparador de produtos
    const [openComparePopUp, setopenComparePopUp] = useState(false);
    
    //product info
    const {id, productName, price, productImage} = props.data;

    //cookies
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
                        <button onClick={() => setopenComparePopUp(true)}><FiRepeat></FiRepeat><span>Comparar</span></button>
                        <ComparePopUp 
                            openComparePopUp={openComparePopUp} 
                            onCloseComparePopUp={() => setopenComparePopUp(false)}
                        ></ComparePopUp>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product