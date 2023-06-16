import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { FiX, FiRepeat } from 'react-icons/fi';
import { useAsyncError, useNavigate } from 'react-router-dom';
import exampleImage from '../../assets/testproducts/boxedwater2.jpg';

import './ComparePopUp.css';
import CompareProduct from '../../pages/HomeView/CompareProduct/CompareProduct';
import { useCookies } from 'react-cookie';

const ComparePopUp = ({ selectedProducts, onCloseComparePopUp, removeFromSelectedProducts}) => {
    if (selectedProducts.length === 0) {
      return null;
    }

    const products = [...selectedProducts, ...Array(4 - selectedProducts.length).fill(null)];
    const navigate = useNavigate();

    function onGoToComparador() {
      navigate('/comparador', { state: { selectedProducts } });
    }

    /*useEffect(() => {
    }, [comparePage])
    */
    return ReactDOM.createPortal(
      <>
        {true ?
          (
          <div className='app__compare_pop-up'>
            <div className='app__compare_pop-up_head'>
              <p style={{ fontSize: '14px' }}>Comparador</p>
              <p style={{ fontSize: '11px', opacity: '.8' }}>Escolha até 4 produtos</p>
            </div>
            <div className='app__compare_pop-up_head-mobile'>
              <p style={{ fontSize: '14px' }}>Comparador</p>
              <p style={{ fontSize: '11px', opacity: '.8' }}>Escolha até 4 produtos</p>
            </div>
            <div className='app__compare_pop-up_selected-products'>
              {products.map((product, index) => (
                <div key={index} className='app__compare_pop-up_product'>
                  {product ? (
                    <>
                      <img height='50px' width='50px' src={exampleImage} />
                      <button onClick={() => removeFromSelectedProducts(product)}>
                        <FiX />
                      </button>
                    </>
                  ) : (
                    <div style={{width: '50px'}}></div>
                  )}
                </div>
              ))}
            </div>
            <div className='app__compare_pop-up_actions'>
              <button className='app__compare_pop-up_actions_1' onClick={() => onGoToComparador()}>Comparar <FiRepeat></FiRepeat></button>
              <button className='app__compare_pop-up_actions_2' onClick={() => onCloseComparePopUp()}>Limpar tudo</button>
            </div>
          </div>
          ) 
          :
          (
            <CompareProduct></CompareProduct>
          )
        }
      </>, 
      document.getElementById('comparador')
    );
};

export default ComparePopUp