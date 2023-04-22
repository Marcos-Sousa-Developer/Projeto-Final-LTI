import React from 'react';
import ReactDOM from 'react-dom';
import { FiX, FiRepeat } from 'react-icons/fi';

import './ComparePopUp.css';

const ComparePopUp = ({ selectedProducts, onCloseComparePopUp, removeFromSelectedProducts }) => {
    if (selectedProducts.length === 0) {
      return null;
    }

  
    return ReactDOM.createPortal(
      <>
        <div className='app__compare_pop-up'>
          <div>
            <p style={{ fontSize: '14px' }}>Comparador</p>
            <p style={{ fontSize: '10px', opacity: '.9' }}>Escolha até 4 produtos</p>
          </div>
          <div>
            {selectedProducts.map((product) => (
                <div key={product.id} className='app__compare_pop-up_product'>
                    <img height='50px' width='50px' src={product.productImage} />
                    <button onClick={() => removeFromSelectedProducts(product)}>Remover</button>
                </div>
            ))}
          </div>
          <div className='app__compare_pop-up_actions'>
            <button>Comparar <FiRepeat></FiRepeat></button>
            <button onClick={onCloseComparePopUp}>Limpar tudo</button>
          </div>
        </div>
      </>,
      document.getElementById('comparador')
    );
  };

export default ComparePopUp