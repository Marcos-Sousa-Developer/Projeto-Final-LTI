import React, { useEffect, useState } from 'react';

import { PRODUCTS } from '../../../assets/products';
import { Navbar, Footer, Product } from '../../../components/index';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import images from '../../../assets/images.js';
import getAllFromDB from '../../../hooks/getAllFromDB';
import getFromDB from '../../../hooks/getFromDB';

import './Search.css';

const Search = () => {

  const [ads, setAds] = useState([])
  const [categories, setCategories] = useState([])
  const [searchName, setSearchName] = useState(null)
  const [path, setPath] = useState("Home")

  const [didMount, setDidMount] = useState(false)

  async function getAndSetProducts(searchName){

    setPath('Home > Pesquisa');
    let adsDB = await getAllFromDB("/ads", {title: searchName})
    setAds(adsDB);
    adsDB.map( async (ad) => {
      let product = await getAllFromDB("/products/" + ad.product_id)
      let subSubCategory = await getFromDB("/subsubcategories/" + product[0].id_subsubcategory);
      let subCategory = await getFromDB("/subcategories/" + subSubCategory[0].id_subcategory);
      let category = await getFromDB("/categories/" + subCategory[0].id_category); 

      setCategories( array => [...array, category[0]])
    })
  }   

  useEffect(()=>{ 
    setDidMount(false)
    const urlParams = new URLSearchParams(window.location.search);
    const searchName = urlParams.get("searchName");
    const category = urlParams.get("category");
    const subCategory = urlParams.get("subCategory");
    const subSubCategory = urlParams.get("subSubCategory");
    if(searchName != null && category == null && subCategory == null && subSubCategory == null){
      setSearchName(searchName);
      getAndSetProducts(searchName);
    }

    setDidMount(true)
  }, [])

  function cleanCategories(oldCategories) {
    const countObj = {};
    oldCategories.forEach((item) => {
      const key = JSON.stringify(item);
      countObj[key] = (countObj[key] || 0) + 1;
    });

    const newCategories1 = oldCategories.map((item) => {
      const key = JSON.stringify(item);
      return {...item,count: countObj[key]};
    });
    

    const newCategories2 = newCategories1.filter((item, index) => {
      return (
        index === newCategories1.findIndex((obj) => {
          return JSON.stringify(obj) === JSON.stringify(item);
        })
      );
    });

    return newCategories2
  }

  function sendToCategories(categoryName) {
    const data = {category: categoryName, searchName: searchName};
    const queryString = new URLSearchParams(data).toString();
    window.location.href = `/categoria?${queryString}`;
  }

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
        <h2><strong>Pesquisa por "{searchName}"</strong></h2>
        </div>
        <div className='app__Category_Grid main__container'>
          <div className='app__Category_Grid_Esquerda'>
            <div>
              <p>Categoria</p>
            </div>
            <div className='products'>
              {/*Inserir as categorias do lado esquerdo como botão*/} 
              {cleanCategories(categories).map((category) => { 
                  return ( 
                    <button key={category.id} onClick={() => (sendToCategories(category.name))}>{category.name} ({category.count})</button>
                  );
                })}
            </div> 
          </div> 
          <div className='app__Category_Grid_Direita'>
            <div>
            <p>Filtros</p>
            </div>
            <div className='products'>  
              {ads.map((ad) => {
              return (
                <div onClick={() => (
                    window.location.href = `/produto?${new URLSearchParams({id: ad.id}).toString()}`
                )}>
                  <Product key={ad.id} data={ad} /> 
                </div>
              );
              })}
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