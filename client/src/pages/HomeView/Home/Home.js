import React, {useState} from 'react';
import { FiChevronRight, FiChevronLeft} from 'react-icons/fi';
import ReactPaginate from "react-paginate";

import {Navbar, Footer, Product, ComparePopUp} from '../../../components/index';
import { PRODUCTS } from '../../../assets/products';
import images from '../../../assets/images';
import './Home.css';

function Home() {

  const handleClick = () => {
    const targetDiv = document.getElementById('comprar_div');
    targetDiv.scrollIntoView({ behavior: 'smooth' });
  };

  //-----------------------------------------------------------

  return (
    <>
      <Navbar></Navbar>
      <div className='app__home main__container'>
        <div className='app__home_text'>
          <h2 style={{ fontWeight: '600' }}>Agora pode comprar e ter impacto na sua comunidade.</h2>
          <p>Suporte os produtores locais.</p>
          <button onClick={handleClick} className='main__action_btn'>
            Comprar
          </button>
        </div>
        <img className='rectangle1' src={images.Rectangle1}></img>
        <img className='rectangle2' src={images.Rectangle2}></img>
        <img src={images.shopping_app}></img>
        <div>

        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Home;