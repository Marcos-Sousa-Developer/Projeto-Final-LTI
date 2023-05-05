import React, { useEffect, useState } from 'react';

import { PRODUCTS } from '../../../assets/products';
import { Navbar, Footer, Product, SubHeading } from '../../../components/index';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import images from '../../../assets/images.js';
import getAllFromDB from '../../../hooks/getAllFromDB';
import getFromDB from '../../../hooks/getFromDB';

import './Category.css';

const Category = () => {

  const [ads, setAds] = useState([])
  const [categories, setCategories] = useState([])
  const [searchName, setSearchName] = useState(null)
  const [category, setCategory] = useState(null)
  const [subCategory, setSubCategory] = useState(null)
  const [subSubCategory, setsubSubCategory] = useState(null)
  const [path, setPath] = useState(null)

  const [didMount, setDidMount] = useState(false)

  async function getAndSetProductsSearch(searchName){

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
  
  async function getAndSetProductsSearchCategory(searchName, categoryName){
    setPath(<>
      <a href="/">Home</a> {'>'} <a href={"/categoria?category="+ categoryName}> {categoryName}</a>
    </>);
    setCategory(categoryName);
    let adsDB = await getAllFromDB("/ads", {title: searchName})
    let adsCategory = []
    adsDB.map( async (ad) => {
      let productAd = await getAllFromDB("/products/" + ad.product_id)
      let subSubCategoryAd = await getFromDB("/subsubcategories/" + productAd[0].id_subsubcategory);
      let subCategoryAd = await getFromDB("/subcategories/" + subSubCategoryAd[0].id_subcategory);
      let categoryAd = await getFromDB("/categories/" + subCategoryAd[0].id_category); 

      if(categoryAd[0].name == categoryName){
        adsCategory.push(ad) 
        setCategories( array => [...array, subCategoryAd[0]])
      }
    })
    setAds(adsCategory);
  }
 
  useEffect(()=>{ 
    setDidMount(false)
    const urlParams = new URLSearchParams(window.location.search);
    const searchName = urlParams.get("searchName");
    const categoryName = urlParams.get("category");
    const subCategoryName = urlParams.get("subCategory");
    const subSubCategoryName = urlParams.get("subSubCategory");
    if(searchName != null && categoryName == null && subCategoryName == null && subSubCategoryName == null){
      //Procurar todos os produtos com o nome da pesquisa
      setSearchName(searchName);
      getAndSetProductsSearch(searchName);
    }
    if(searchName != null && categoryName != null && subCategoryName == null && subSubCategoryName == null){
      //Procurar todos os produtos da categoria com o nome da pesquisa
      setSearchName(searchName);
      setCategory(categoryName);
      getAndSetProductsSearchCategory(searchName, categoryName);
    }
    if(searchName != null && categoryName != null && subCategoryName != null && subSubCategoryName == null){
      //Procurar todos os produtos da subcategoria com o nome da pesquisa
      console.log("subcategoria com o nome da pesquisa")
    }
    if(searchName != null && categoryName != null && subCategoryName != null && subSubCategoryName != null){
      //Procurar todos os produtos da subsubcategoria com o nome da pesquisa
      console.log("subsubcategoria com o nome da pesquisa")
    }
    if(searchName == null && categoryName != null && subCategoryName == null && subSubCategoryName == null){
      //Procurar todos os produtos da categoria
      setCategory(categoryName);
      setPath(<>
        <a href="/">Home</a> {'>'} <a href={"/categoria?category="+ categoryName}> {categoryName}</a>
      </>);
      
      console.log("categoria")
    }
    if(searchName == null && categoryName != null && subCategoryName != null && subSubCategoryName == null){
      //Procurar todos os produtos da subcategoria
      setCategory(categoryName);
      setSubCategory(subCategoryName);
      setPath(<>
        <a href="/">Home</a> {'>'} <a href={"/categoria?category="+ categoryName}> {categoryName}</a> {'>'} <a href={"/categoria?category="+ categoryName + "&subCategory="+ subCategoryName }> {subCategoryName}</a>
      </>);
      console.log("subcategoria")
    }
    if(searchName == null && categoryName != null && subCategoryName != null && subSubCategoryName != null){
      //Procurar todos os produtos da subsubcategoria
      setCategory(categoryName);
      setSubCategory(subCategoryName);
      setsubSubCategory(subSubCategoryName);
      setPath(<>
        <a href="/">Home</a> {'>'} <a href={"/categoria?category="+ categoryName}> {categoryName}</a> {'>'} <a href={"/categoria?category="+ categoryName + "&subCategory="+ subCategoryName }> {subCategoryName}</a> {'>'} <a href={"/categoria?category="+ categoryName + "&subCategory="+ subCategoryName + "&subSubCategory=" + subSubCategoryName }> {subSubCategoryName}</a>
      </>);
      console.log("subsubcategoria")
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
    console.log(searchName)
    console.log(category)
    console.log(subCategory)
    console.log(subSubCategory)
    if(searchName != null && category != null && subCategory == null && subSubCategory == null){
      console.log("cat")
      //SELECIONA SUBCATEGORIA
      const data = {category: category, subCategory: categoryName, searchName: searchName};
      const queryString = new URLSearchParams(data).toString();
      window.location.href = `/categoria?${queryString}`;
    } 
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
        {searchName != null ? (
          <SubHeading title = {'Pesquisa por "' + searchName + '"'}></SubHeading>
          ) : (
            <SubHeading title = {category}></SubHeading>
        )} 
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
                )
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

export default Category