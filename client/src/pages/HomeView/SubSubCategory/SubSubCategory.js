import React, { useEffect, useState } from 'react';

import { Navbar, Footer, Product, SubHeading } from '../../../components/index';
import getAllFromDB from '../../../hooks/getAllFromDB';

const itemsPerPage = 20; // Number of items per page
let currentItems = [];
let startIndex = 0;
let endIndex = 0;


const SubSubCategory = () => {

  const [ads, setAds] = useState([])
  const [searchName, setSearchName] = useState(null)
  const [subsubCategoryName, setSubSubCategoryName] = useState("")
  const [path, setPath] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [didMount, setDidMount] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([]);


  const goToPage = (page) => {
    setCurrentPage(page);
    startIndex = (page - 1) * 20;
    endIndex = Math.min(startIndex + itemsPerPage, ads.length);
    currentItems = ads.slice(startIndex, endIndex);
  };

  const getProductsbySearchName = async (subsubCategoryName, searchName) => {
    let adsDB = await getAllFromDB("/ads", {title: searchName, subsubcategory_name: subsubCategoryName})
    setAds(adsDB)
    startIndex = (currentPage - 1) * 20;
    endIndex = Math.min(startIndex + itemsPerPage, adsDB.length);
    currentItems = adsDB.slice(startIndex, endIndex);
  }

  const getProducts = async (subsubCategoryName) => {
    let adsDB = await getAllFromDB("/ads", {title: searchName, subsubcategory_name: subsubCategoryName})
    setAds(adsDB)
    startIndex = (currentPage - 1) * 20;
    endIndex = Math.min(startIndex + itemsPerPage, adsDB.length);
    currentItems = adsDB.slice(startIndex, endIndex);
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
      const subsubCategoryName = urlParams.get("subsubCategory");
      setSearchName(searchName);
      setSubSubCategoryName(subsubCategoryName)
      //Procurar todos os produtos de uma subsubcategoria apartir da subcategoria com o nome da pesquisa
      if(searchName != null && subsubCategoryName != null){
        await getProductsbySearchName(subsubCategoryName, searchName);
        setPath('Home > ' + categoryName + ' > ' + subCategoryName + ' > ' + subsubCategoryName + " > pesquisa: '" + searchName + "'");
        setDidMount(true)
      }
      //Procurar todos os produtos de uma subcategoria a partir da categoria
      else {
        await getProducts(subsubCategoryName)
        setPath('Home > ' + categoryName + ' > ' + subCategoryName + ' > ' + subsubCategoryName );
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
            <SubHeading title = {subsubCategoryName}></SubHeading>
        )} 
        </div>

        <div>
          <div className='app__Category_Grid_Direita'>

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

export default SubSubCategory