import React from 'react'

import {Navbar, Footer, Product} from '../../../components/index';
import { PRODUCTS } from '../../../assets/products';
import './Home.css';

function Home() {

  return (
    <>
      <Navbar></Navbar>
      <div>
        {PRODUCTS.map((product) => (
          <Product data={product} />
        ))}
      </div>
      <Footer></Footer>
    </>
  );

}

export default Home;