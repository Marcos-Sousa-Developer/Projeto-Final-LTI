import React from 'react';
import ReactDOM from 'react-dom';
import { FiX, FiRepeat } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import './ComparePopUp.css';

const ComparePopUp = ({ selectedProducts, onCloseComparePopUp, removeFromSelectedProducts }) => {
    if (selectedProducts.length === 0) {
      return null;
    }

    const products = [...selectedProducts, ...Array(4 - selectedProducts.length).fill(null)];

    
    const navigate = useNavigate();

    function onGoToComparador() {
      navigate('/comparador', { state: { products } });
    }


    return ReactDOM.createPortal(
      <>
        <div className='app__compare_pop-up'>
          <div>
            <p style={{ fontSize: '14px' }}>Comparador</p>
            <p style={{ fontSize: '11px', opacity: '.8' }}>Escolha até 4 produtos</p>
          </div>
          <div className='app__compare_pop-up_selected-products'>
            {products.map((product, index) => (
              <div key={index} className='app__compare_pop-up_product'>
                {product ? (
                  <>
                    <img height='50px' width='50px' src={product.productImage} />
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
            <button onClick={onGoToComparador}>Comparar<FiRepeat></FiRepeat></button>
            <button onClick={onCloseComparePopUp} style={{ fontSize: '14px', opacity: '.8'}}>Limpar tudo</button>
          </div>
        </div>
      </>, document.getElementById('comparador')
    );
};

export default ComparePopUp