import React, { useEffect, useState } from 'react';

import { PRODUCTS } from '../../../assets/products';
import { Navbar, Footer, Product, SubHeading, ComparePopUp } from '../../../components/index';
import images from '../../../assets/images.js';
import getAllFromDB from '../../../hooks/getAllFromDB';
import getFromDB from '../../../hooks/getFromDB';

import './Search.css';
import LoadingPage from '../../LoadingPage';

let categories = {}
const itemsPerPage = 20; // Number of items per page
let currentItems = [];
let startIndex = 0;
let endIndex = 0;

const Search = () => {

  const [searchName, setSearchName] = useState([])
  const [ads, setAds] = useState([])
  const [didMount, setDidMount] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page) => {
    setCurrentPage(page);
    startIndex = (page - 1) * 20;
    endIndex = Math.min(startIndex + itemsPerPage, ads.length);
    currentItems = ads.slice(startIndex, endIndex);
  };


  async function getAndSetProducts(title){
    let adsDB = await getAllFromDB("/ads", {title: title})
    setAds(adsDB);
    startIndex = (currentPage - 1) * 20;
    endIndex = Math.min(startIndex + itemsPerPage, adsDB.length);
    currentItems = adsDB.slice(startIndex, endIndex);
    adsDB.map( (ad) => {  
      
      categories[ad.category_name] != undefined ? categories[ad.category_name] +=1 : categories[ad.category_name]=0

    })
  }   

  function sendToCategories(categoryName) {
    const data = {category: categoryName, searchName: searchName};
    const queryString = new URLSearchParams(data).toString();
    window.location.href = `/categoria?${queryString}`;
  }

    useEffect(()=>{ 
      setDidMount(false)

      const execute = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const title = urlParams.get("searchName");
        await getAndSetProducts(title)
        setSearchName(title)
        setDidMount(true)
      }
      execute()
          
  }, [])


    //-----------------------------------------------------------

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
        <LoadingPage></LoadingPage>
      )
      :
      (
      <>
      <Navbar></Navbar>
      <div className='app__Search main__container'>
        <div className='app__Search_Caminho'>
        <SubHeading title = {'Pesquisa por "' + searchName + '"'}></SubHeading>
        </div>
        <div className='app__Search_Grid'>
          <div className='app__Search_Grid_Esquerda'>
              <p>Categorias</p>
            <div className='app__Search_filter_content'>
              <ul>
                {Object.keys(categories).map((category_name) => { 
                  return ( 
                    <li>
                      <a className='app__pointer app__text_effect' key={category_name} onClick={() => sendToCategories(category_name) }> {category_name} ({categories[category_name]})</a>
                    </li>
                  );
                })}
              </ul>
            </div> 
          </div> 
          <div className='app__Search_Grid_Direita'>
            <div className=''>
              <p>Filtros</p>
            </div>
            <div className='products'> 
              {currentItems.map((ad) => (
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
            <div className="app__Search_pagination">
              {Array(Math.ceil(ads.length / itemsPerPage))
                .fill()
                .map((_, index) => (
                  <>
                  <button
                    key={index + 1}
                    onClick={() => goToPage(index + 1)}
                    disabled={currentPage === index + 1}
                  >
                    {index + 1}
                  </button>
                  &nbsp;
                  </>
                ))}
            </div>
          </div> 
        </div>
      </div>
      <ComparePopUp
        selectedProducts={selectedProducts}
        onCloseComparePopUp={() => setSelectedProducts([])}
        removeFromSelectedProducts={removeFromSelectedProducts}
      />
      <Footer></Footer>
      </>
      )
    }
    </>
  );
}

export default Search