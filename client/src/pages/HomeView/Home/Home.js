import React, {useState, useEffect} from 'react';
import { FiChevronRight, FiChevronLeft} from 'react-icons/fi';
import ReactPaginate from "react-paginate";

import {Navbar, NavbarSupplier, Footer, Product, ComparePopUp} from '../../../components/index';
import { PRODUCTS } from '../../../assets/products';
import images from '../../../assets/images';
import './Home.css';
import getClientType from "../../../hooks/getClientType";

function Home() {

  const handleClick = () => {
    const targetDiv = document.getElementById('comprar_div');
    targetDiv.scrollIntoView({ behavior: 'smooth' });
  };

  const [userType, setUserType] = useState(false)
  const [didMount, setDidMount] = useState(false)

  const getUserType = async () => {

    let response = await getClientType()   

    if(response) {

      let type = response[0]

      setUserType(type)

    }
  }

  useEffect(() => {
    getUserType()
    setDidMount(true)
  },[])

  //-----------------------------------------------------------

  return (
    <>
    {
      didMount == false ? (
        <>
          Loading
        </>
      )
      :
      (
      <>
      {userType == 'supplier' ? 
        <>
        <NavbarSupplier></NavbarSupplier>
        </>
      :
        <>
        <Navbar></Navbar>
        </>
      } 
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
      )
    }
    </>
  );
}

export default Home;