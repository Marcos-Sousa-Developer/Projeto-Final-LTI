import React, {useEffect, useState} from 'react'
import { FiRepeat} from 'react-icons/fi';
import { useCookies } from 'react-cookie';

import { PriceDisplay } from '../../utilities/formatCurrency';
import './Product.css';
import exampleImage from '../../assets/testproducts/boxedwater2.jpg';

const Product = ({ data, onAddToCompare, onRemoveFromCompare, selectedProducts, onClick }) => {
    //const { id, productName, price, productImage } = data;
    const { id, title, price } = data;
  
    const handleAddToCompare = () => {
      onAddToCompare(data);
    };
  
    const handleRemoveFromCompare = () => {
      onRemoveFromCompare(data);
    };
  
    return (
      <>
        <div className='product'>
          <div className="app__pointer" onClick={onClick}>
            {
              data.urls == null ? 
              (
                <img className='product_img' src={exampleImage} />

              )
              :
              (
                <img className='product_img' src={JSON.parse(data.urls)[0]} />

              )
            }
          </div>
          <div className='product_description'>
            <div>
              <p className="app__pointer" onClick={onClick}>{title}</p>
              <PriceDisplay className='product_price' price={price} />
            </div>
            <div className='product_action_section'>
              {selectedProducts.some((p) => p.id === id) ? (
                <button onClick={() => handleRemoveFromCompare()}><FiRepeat></FiRepeat><span>Remover</span></button>
              ) : (
                <button onClick={() => handleAddToCompare()}><FiRepeat></FiRepeat><span>Comparar</span></button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

export default Product