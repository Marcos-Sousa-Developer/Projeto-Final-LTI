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
      <div>
        <SubHeading title='Comparador'></SubHeading>
        {products.map(product => {
          if (product) {
            return <div key={product.id}>{product.productName}</div>;
          }
          return null;
        })}
      </div>
      <Footer></Footer>
    </>
  )
}

export default CompareProduct;
