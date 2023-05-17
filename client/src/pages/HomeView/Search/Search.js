import React, { useEffect, useState } from 'react';

import { PRODUCTS } from '../../../assets/products';
import { Navbar, Footer, Product, SubHeading } from '../../../components/index';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import images from '../../../assets/images.js';
import getAllFromDB from '../../../hooks/getAllFromDB';
import getFromDB from '../../../hooks/getFromDB';

import './Search.css';

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
      <Navbar></Navbar>
      <div className='app__Category main__container'>
        <div className='app__Category_Caminho'>
        <SubHeading title = {'Pesquisa por "' + searchName + '"'}></SubHeading>
        </div>
        <div className='app__Category_Grid main__container'>
          <div className='app__Category_Grid_Esquerda'>
            <div>
              <p>Categorias</p>
            </div>
            <div className='products'>
              {/*Inserir as categorias do lado esquerdo como botão*/} 
              {Object.keys(categories).map((category_name) => { 
                  return ( 
                    <button key={category_name} onClick={() => sendToCategories(category_name) }> {category_name} ({categories[category_name]})</button>
                  );
                })}
            </div> 
          </div> 
          <div className='app__Category_Grid_Direita'>
            <div>
            <p>Filtros</p>
            </div>
            <div className='products'> 
            {currentItems.map((ad) => (
              <div
                key={ad.id}
                onClick={() => (window.location.href = `/produto?${new URLSearchParams({ id: ad.id }).toString()}`)}
              >
                <Product key={ad.id} data={ad} /> 
              </div>
            ))}

              {/* Pagination */}
            <div>
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
      </div>
      <Footer></Footer>
      </>
      )
    }
    </>
  );
}

export default Search