import React, { useEffect, useState } from 'react';
import { FiChevronRight, FiChevronLeft} from 'react-icons/fi';

import { Navbar, Footer, Product, SubHeading, ComparePopUp, Modal } from '../../../components/index';
import getAllFromDB from '../../../hooks/getAllFromDB';

import './SubCategory.css';
import LoadingPage from '../../LoadingPage';


let subsubcategories = {}
const itemsPerPage = 20; // Number of items per page
let currentItems = [];
let startIndex = 0;
let endIndex = 0;

const SubCategory = () => {

  const [isOpen, setIsOpen] = useState(false);  //modal
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

  //Comparador
  const addToSelectedProducts = (product) => {
    if (selectedProducts.length >= 4) {
      return;
    }
    setSelectedProducts([...selectedProducts, product]);
  };
  const removeFromSelectedProducts = (product) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
  };

  //Paginação
  const totalPages = Math.ceil(ads.length / itemsPerPage);
  const MAX_PAGES = 5;
  
  let pagination;
  
  if (totalPages <= MAX_PAGES) {
    pagination = Array.from({ length: totalPages }, (_, index) => index + 1);
  } else {
    if (currentPage <= 2) {
      pagination = [
        1,
        2,
        '...',
        totalPages - 1,
        totalPages
      ];
    } else if (currentPage >= totalPages - 1) {
      if(currentPage == totalPages - 1){
        pagination = [
          1,
          2,
          '...',
          currentPage,
          currentPage + 1,
        ];
      }else{
        pagination = [
          1,
          2,
          '...',
          currentPage - 1,
          currentPage,
        ];
      }
    } else {
      pagination = [
        1,
        '...',
        currentPage,
        '...',
        totalPages
      ];
    }
  }


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
        <LoadingPage></LoadingPage>
      )
      :
      (
      <>
      <Navbar></Navbar>
      <div className='app__SubCategory main__container'>
        <div className='app__SubCategory_Caminho'>
          <p> {path} </p>
          {searchName != null ? (
            <SubHeading title = {'Pesquisa por "' + searchName + '"'}></SubHeading>
            ) : (
              <SubHeading title = {subCategoryName}></SubHeading>
          )} 
        </div>
        <div className='app__SubCategory_Grid'>
          <div className='app__SubCategory_Grid_Esquerda'>
            <p>FILTROS</p>
            <div className='app__SubCategory_filter_content'>
              <p>SubCategoria</p>
              <hr></hr>
              <ul>
                {Object.keys(subsubcategories).map((subsubcategory_name) => { 
                    return ( 
                      <li>
                        <a key={subsubcategory_name} onClick={() => sendToSubSubcategories(subsubcategory_name) }> {subsubcategory_name} ({subsubcategories[subsubcategory_name]})</a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div> 
          <div className='app__SubCategory_Grid_Direita'>
            <div className='app__SubCategory_mobile_filter_content'>
              <button className='main_action_btn' onClick={() => setIsOpen(true)}>Filtros</button>
              <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <p>Filtros</p>
                <div>
                  <p>SubCategoria</p>
                  <ul>
                    {Object.keys(subsubcategories).map((subsubcategory_name) => { 
                        return ( 
                          <li>
                            <a key={subsubcategory_name} onClick={() => sendToSubSubcategories(subsubcategory_name) }> {subsubcategory_name} ({subsubcategories[subsubcategory_name]})</a>
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <button className='main__negative_action_btn' onClick={() => deleteAllCartItem()}>Aplicar</button>
              </Modal>
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
            <div className="app__SubCategory_pagination">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className='app__SubCategory_pagination_actionBtn'
                ><FiChevronLeft></FiChevronLeft></button>

                {pagination.map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && goToPage(page)}
                    disabled={currentPage === page || typeof page !== 'number'}
                    className={`app__SubCategory_pagination_pages ${currentPage === page ? 'app__SubCategory_pagination_currentPage' : ''}`}
                  >{typeof page === 'number' ? page : ` ${page} `}</button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className='app__SubCategory_pagination_actionBtn'
                ><FiChevronRight></FiChevronRight></button>
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

export default SubCategory