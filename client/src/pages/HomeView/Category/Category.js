import React, { useEffect, useState } from 'react';

import { PRODUCTS } from '../../../assets/products';
import { Navbar, Footer, Product } from '../../../components/index';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import images from '../../../assets/images.js';
import getAllFromDB from '../../../hooks/getAllFromDB';
import getFromDB from '../../../hooks/getFromDB';

import './Category.css';

const Category = () => {

  const [ads, setAds] = useState([])
  const [categories, setCategories] = useState([])
  const [searchName, setSearchName] = useState(null)

  const [didMount, setDidMount] = useState(false)

  async function getAndSetProducts(searchName){
    let adsDB = await getAllFromDB("/ads", {title: searchName})
    setAds(adsDB);
    adsDB.map( async (ad) => {
      let product = await getAllFromDB("/products/" + ad.product_id)
      console.log(product)
      let subSubCategory = await getFromDB("/subsubcategories/" + product[0].id_subsubcategory);
      console.log(subSubCategory)
      let subCategory = await getFromDB("/subcategories/" + subSubCategory[0].id_subcategory);
      console.log(subCategory)
      let category = await getFromDB("/categories/" + subCategory[0].id_category); 
      console.log(category)
      //fazer um map pelas categories, caso haja alguma category com o id igual, adiciona

      //pesquisar como se atualiza um valor que já esta dentro do array
      /*let newCategories = categories.slice();

      if(newCategories.length === 0){
        console.log("teste1")
        category[0]["quantity"] = 0;
        newCategories.push(category[0]);
        setCategories([newCategories]);
      } else {
        console.log("teste2")
        newCategories.map((categoryMap) => { 
          if(categoryMap.id == category[0].id){
            newCategories[categoryMap]["quantity"] += 1;
          } else {
            newCategories[categoryMap]["quantity"] = 3;
          }  
        })
        console.log(newCategories)
        setCategories(prevArray => prevArray.concat(newCategories));
      }

      //setCategories([...categories, newCategories]);
      //setCategories(prevArray => prevArray.concat(newCategories));*/

      //---------------------

      categories.map((categoryMap) => { 
        if(categoryMap.id == category[0].id){
          categories["quantity"] += 1;
        } else {
          categories["quantity"] = 0;
        }  
      })
      setCategories( array => [...array, category[0]])
    })
  }   

  useEffect(()=>{ 
    const urlParams = new URLSearchParams(window.location.search);
    const searchName = urlParams.get("searchName");
    setSearchName(searchName);
    getAndSetProducts(searchName);
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
        <p> Home {'>'} Pesquisa </p>
        <h2><strong>Pesquisa por "{searchName}"</strong></h2>
        </div>
        <div className='app__Category_Grid main__container'>
          <div className='app__Category_Grid_Esquerda'>
            <div>
              <p>Categoria</p>
            </div>
            <div className='products'>
              {/*Inserir as categorias do lado esquerdo como botão*/} 
              {console.log(categories)}
              {cleanCategories(categories).map((category) => { 
                  return ( 
                    <button key={category.id}>{category.name} ({category.count})</button> 
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
                <Product key={ad.id} data={ad} /> 
                //<p key={ad.id}>{ad.title}</p>
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