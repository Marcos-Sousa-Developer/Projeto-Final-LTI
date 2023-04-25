import React from 'react';
import { useLocation } from 'react-router-dom';

import { Navbar, Footer, SubHeading } from '../../../components/index';
import './CompareProduct.css';

const CompareProduct = () => {
  const { state } = useLocation();
  const products = state?.products || [];

  console.log(products);

  return (
    <>
      <Navbar></Navbar>
      <div className='main__container app__compare-product'>
        <SubHeading title='Comparador'></SubHeading>
        <div className='app__compare-product_content'>
          {products.map(product => {
            if (product) {
              return (
                <div key={product.id}>
                  <img src={product.productImage}/>
                  <p>{product.productName}</p>
                </div>
              )
            }
            return null;
          })}
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default CompareProduct;
