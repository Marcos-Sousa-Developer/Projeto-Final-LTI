import React, {useState, useEffect} from 'react';
import { FiChevronRight, FiChevronLeft} from 'react-icons/fi';
import ReactPaginate from "react-paginate";

import {Navbar, NavbarSupplier, Footer, Product, ComparePopUp, SubHeading} from '../../../components/index';
import images from '../../../assets/images';
import './Home.css';
import getClientType from "../../../hooks/getClientType";
import getAllFromDB from '../../../hooks/getAllFromDB';
import LoadingPage from '../../LoadingPage';
import { CookieStorage } from 'amazon-cognito-identity-js';

function Home() {

  const handleClick = () => {
    const targetDiv = document.getElementById('comprar_div');
    targetDiv.scrollIntoView({ behavior: 'smooth' });
  };

  const [ads, setAds] = useState([])
  const [userType, setUserType] = useState(false)
  const [didMount, setDidMount] = useState(false)

  const getUserType = async () => {

    let response = await getClientType()   

    if(response) {
      let type = response[0]
      setUserType(type)
    }
  }

  async function getAds(){
    let adsDB = await getAllFromDB("/ads")
    setAds(adsDB.slice(adsDB.length - 8, adsDB.length))
  }

  useEffect(() => {
    getUserType()
    getAds()
    setDidMount(true)
  },[])

    //Comparador de Produtos

    const [selectedProducts, setSelectedProducts] = useState([]);

    const addToSelectedProducts = (product) => {
      if (selectedProducts.length >= 4) {
        return;
      }
      setSelectedProducts([...selectedProducts, product]);
    };
    
    const removeFromSelectedProducts = (product) => {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    };

  //-----------------------------------------------------------

  return (
    <>
    {
      didMount == false ? (
        <>
          <LoadingPage></LoadingPage>
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

      </div>
      <div className='app__destaques main__container'>
          <SubHeading title="Destaques"></SubHeading>
          {ads.map((ad) => (
                    <Product 
                      key={ad.id} 
                      data={ad} 
                      selectedProducts={selectedProducts}
                      onAddToCompare={addToSelectedProducts}
                      onRemoveFromCompare={removeFromSelectedProducts}
                      onClick={() => (window.location.href = `/produto?${new URLSearchParams({ id: ad.id }).toString()}`)}
                    />
                ))}
        </div>
      <Footer></Footer>
      <ComparePopUp
        selectedProducts={selectedProducts}
        onCloseComparePopUp={() => setSelectedProducts([])}
        removeFromSelectedProducts={removeFromSelectedProducts}
      />
      </>
      )
    }
    </>
  );
}

export default Home;