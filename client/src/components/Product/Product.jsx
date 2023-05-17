import React, {useState} from 'react'
import { FiShoppingCart, FiRepeat} from 'react-icons/fi';
import { PriceDisplay } from '../../utilities/formatCurrency';
import './Product.css';
import { useCookies } from 'react-cookie';

const Product = ({ data, onAddToCompare, onRemoveFromCompare, selectedProducts, onClick }) => {
    //const { id, productName, price, productImage } = data;
    const { id, title, price } = data;

    const [cookies, setCookie] = useCookies(['cart']);
  
    const addToCart = () => {
      const prevValue = cookies.cart || {};
      prevValue[id] = [(prevValue[id]?.[0] ?? 0) + 1, price, title];
      setCookie('cart', prevValue, { path: '/' });
    };
  
    const handleAddToCompare = () => {
      onAddToCompare(data);
    };
  
    const handleRemoveFromCompare = () => {
      onRemoveFromCompare(data);
    };
  
    return (
      <>
        <div className='product'>
          {/*<div><img className='product_img' src={productImage} /></div>*/}
          <div className='product_description'>
            <div>
              <p className="app__pointer" onClick={onClick}>{title}</p>
              <PriceDisplay className='product_price' price={price} />
            </div>
            <div className='product_action_section'>
              {/*<button style={{ marginRight: '0.25rem' }} onClick={addToCart}><FiShoppingCart></FiShoppingCart><span>Adicionar</span></button>*/}

              {selectedProducts.some((p) => p.id === id) ? (
                <button onClick={handleRemoveFromCompare}><FiRepeat></FiRepeat><span>Remover</span></button>
              ) : (
                <button onClick={handleAddToCompare}><FiRepeat></FiRepeat><span>Comparar</span></button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

export default Product