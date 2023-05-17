import React, { useEffect, useState } from 'react';

import { PRODUCTS } from '../../../assets/products';
import { Navbar, Footer, Product, SubHeading } from '../../../components/index';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import images from '../../../assets/images.js';
import getAllFromDB from '../../../hooks/getAllFromDB';

import './Category.css';

let subcategories = {}
const itemsPerPage = 20; // Number of items per page
let currentItems = [];
let startIndex = 0;
let endIndex = 0;


const Category = () => {

  const [ads, setAds] = useState([])
  const [searchName, setSearchName] = useState(null)
  const [categoryName, setCategoryName] = useState("")
  const [path, setPath] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [didMount, setDidMount] = useState(false)

  async function getSubCategoriesbySearchName(categoryName, searchName){
    setPath('Home > ' + categoryName + " > pesquisa: '" + searchName + "'");
    let adsDB = await getAllFromDB("/ads", {title: searchName, category_name: categoryName})
    setAds(adsDB)
    adsDB.map( (ad) => {  
      subcategories[ad.subcategory_name] != undefined ? subcategories[ad.subcategory_name] +=1 : subcategories[ad.subcategory_name]=0
    })
    startIndex = (currentPage - 1) * 20;
    endIndex = Math.min(startIndex + itemsPerPage, adsDB.length);
    currentItems = adsDB.slice(startIndex, endIndex);
  }

  async function getSubCategories(categoryName){
    setPath('Home > ' + categoryName );
    let adsDB = await getAllFromDB("/ads", {category_name: categoryName})
    setAds(adsDB)
    adsDB.map( (ad) => {  
      subcategories[ad.subcategory_name] != undefined ? subcategories[ad.subcategory_name] +=1 : subcategories[ad.subcategory_name]=0
    })
    startIndex = (currentPage - 1) * 20;
    endIndex = Math.min(startIndex + itemsPerPage, adsDB.length);
    currentItems = adsDB.slice(startIndex, endIndex);
  }

  const goToPage = (page) => {
    setCurrentPage(page);
    startIndex = (page - 1) * 20;
    endIndex = Math.min(startIndex + itemsPerPage, ads.length);
    currentItems = ads.slice(startIndex, endIndex);
  };

  function sendToSubcategories(subcategoryName) {

    //SELECIONA SUBCATEGORIA COM PESQUISA
    const data = searchName!==null ? {category: categoryName, subCategory: subcategoryName, searchName: searchName } : {category: categoryName, subCategory: subcategoryName} ;
    const queryString = new URLSearchParams(data).toString();
    window.location.href = `/subcategoria?${queryString}`;
    
  }

  useEffect(()=>{ 
    setDidMount(false)
    async function run(){

      const urlParams = new URLSearchParams(window.location.search);
      const searchName = urlParams.get("searchName");
      const categoryName = urlParams.get("category");

      //Procurar todos os produtos de uma subcategoria apartir da categoria com o nome da pesquisa
      if(searchName != null && categoryName != null){
        setCategoryName(categoryName)
        setSearchName(searchName);
        await getSubCategoriesbySearchName(categoryName, searchName);
        setDidMount(true)
      }
      //Procurar todos os produtos de uma subcategoria a partir da categoria
      else {
        setCategoryName(categoryName)
        await getSubCategories(categoryName)
        setDidMount(true)
      }
      
    }
    run();
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
        <p> {path} </p>
        {searchName != null ? (
          <SubHeading title = {'Pesquisa por "' + searchName + '"'}></SubHeading>
          ) : (
            <SubHeading title = {categoryName}></SubHeading>
        )} 
        </div>
        <div className='app__Category_Grid main__container'>
          <div className='app__Category_Grid_Esquerda'>
            <div>
              <p>Categoria -> {categoryName}</p>
            </div>
            <div className='products'>
               {/*Inserir as subcategorias do lado esquerdo como botão*/} 
               {Object.keys(subcategories).map((subcategory_name) => { 
                  return ( 
                    <button key={subcategory_name} onClick={() => sendToSubcategories(subcategory_name) }> {subcategory_name} ({subcategories[subcategory_name]})</button>
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
            </div>
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
      <Footer></Footer>
      </>
      )
    }
    </>
  );
}

export default Category