import React, { useContext } from 'react';

import { PRODUCTS } from '../../../assets/products';
import { Navbar, Footer, Product } from '../../../components/index';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import images from '../../../assets/images.js';

import './Category.css';

const Category = () => {


  return (
    <>
      <Navbar></Navbar>

      <div className='app__Category main__container'>

        <div className='app__Category_Caminho'>
        <p> Home > Categoria</p>
        <h2><strong>Categoria</strong></h2>
        </div>

        <div className='app__Category_Grid main__container'>
         
        
          <div className='app__Category_Grid_Esquerda'>
          <br></br>
          <p>Filtros</p>
          </div> 
            

          <div className='app__Category_Grid_Direita'>
            <div>
            <p>Filtros</p>
            </div>

            <div className='products'> 
            {PRODUCTS.map((product) => (
              <Product key={product.id} data={product} /> 
            ))}
            </div>
          </div>
          
        </div>

      </div>

      <Footer></Footer>
    </>
  )
}

export default Category