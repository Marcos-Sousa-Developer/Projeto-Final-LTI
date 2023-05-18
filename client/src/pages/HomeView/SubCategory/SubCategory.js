import React, { useEffect, useState } from 'react';

import { Navbar, Footer, Product, SubHeading } from '../../../components/index';
import getAllFromDB from '../../../hooks/getAllFromDB';


let subsubcategories = {}
const itemsPerPage = 20; // Number of items per page
let currentItems = [];
let startIndex = 0;
let endIndex = 0;


const SubCategory = () => {

  const [ads, setAds] = useState([])
  const [searchName, setSearchName] = useState(null)
  const [categoryName, setCategoryName] = useState("")
  const [subCategoryName, setSubCategoryName] = useState("")
  const [path, setPath] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [didMount, setDidMount] = useState(false)

  async function getSubSubCategoriesbySearchName(subCategoryName, searchName){
    let adsDB = await getAllFromDB("/ads", {title: searchName, subcategory_name: subCategoryName})
    setAds(adsDB)
    adsDB.map( (ad) => {  
        subsubcategories[ad.subsubcategory_name] != undefined ? subsubcategories[ad.subsubcategory_name] +=1 : subsubcategories[ad.subsubcategory_name]=0
    })
    startIndex = (currentPage - 1) * 20;
    endIndex = Math.min(startIndex + itemsPerPage, adsDB.length);
    currentItems = adsDB.slice(startIndex, endIndex);
  }

  async function getSubSubCategories(subCategoryName){
    let adsDB = await getAllFromDB("/ads", {subcategory_name: subCategoryName})
    setAds(adsDB)
    adsDB.map( (ad) => {  
        subsubcategories[ad.subsubcategory_name] != undefined ? subsubcategories[ad.subsubcategory_name] +=1 : subsubcategories[ad.subsubcategory_name]=0
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

  function sendToSubSubcategories(subsubCategoryName) {

    //SELECIONA SUBCATEGORIA COM PESQUISA
    const data = searchName!==null ? {category: categoryName, subCategory: subCategoryName, subsubCategory: subsubCategoryName, searchName: searchName } : {category: categoryName, subCategory: subCategoryName, subsubCategory: subsubCategoryName} ;
    const queryString = new URLSearchParams(data).toString();
    window.location.href = `/subsubcategoria?${queryString}`;
    
  }


      const addToSelectedProducts = (product) => {
        if (selectedProducts.length >= 4) {
          return;
        }
        setSelectedProducts([...selectedProducts, product]);
      };
    
      const removeFromSelectedProducts = (product) => {
        setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
      };

  useEffect(()=>{ 
    setDidMount(false)
    async function run(){

      const urlParams = new URLSearchParams(window.location.search);
      const searchName = urlParams.get("searchName");
      const categoryName = urlParams.get("category");
      const subCategoryName = urlParams.get("subCategory");
      //Procurar todos os produtos de uma subsubcategoria apartir da subcategoria com o nome da pesquisa
      if(searchName != null && subCategoryName != null){
        setCategoryName(categoryName)
        setSubCategoryName(subCategoryName)
        setSearchName(searchName);
        await getSubSubCategoriesbySearchName(subCategoryName,searchName);
        setPath('Home > ' + categoryName + ' > ' + subCategoryName + " > pesquisa: '" + searchName + "'");
        setDidMount(true)
      }
      //Procurar todos os produtos de uma subcategoria a partir da categoria
      else {
        setCategoryName(categoryName)
        setSubCategoryName(subCategoryName)
        await getSubSubCategories(subCategoryName)
        setPath('Home > ' + categoryName + ' > ' + subCategoryName );
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
            <SubHeading title = {subCategoryName}></SubHeading>
        )} 
        </div>
        <div className='app__Category_Grid main__container'>
          <div className='app__Category_Grid_Esquerda'>
            <div>
              <p>SubCategoria -> {subCategoryName}</p>
            </div>
            <div className='products'>
               {/*Inserir as subcategorias do lado esquerdo como botão*/} 
               {Object.keys(subsubcategories).map((subsubcategory_name) => { 
                  return ( 
                    <button key={subsubcategory_name} onClick={() => sendToSubSubcategories(subsubcategory_name) }> {subsubcategory_name} ({subsubcategories[subsubcategory_name]})</button>
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

export default SubCategory