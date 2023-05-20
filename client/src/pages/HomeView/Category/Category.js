import React, { useEffect, useState } from 'react';
import { FiChevronRight, FiChevronLeft} from 'react-icons/fi';

import { Navbar, Footer, Product, SubHeading, ComparePopUp, Modal } from '../../../components/index';
import getAllFromDB from '../../../hooks/getAllFromDB';

import './Category.css';
import LoadingPage from '../../LoadingPage';


let subcategories = {}
const itemsPerPage = 20; // Number of items per page
let currentItems = [];
let startIndex = 0;
let endIndex = 0;

const Category = () => {

  const [isOpen, setIsOpen] = useState(false);  //modal
  const [ads, setAds] = useState([]);
  const [searchName, setSearchName] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [path, setPath] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [didMount, setDidMount] = useState(false);

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
    //----------------------------------------------------------
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
      <div className='app__Category main__container'>
        <div className='app__Category_Caminho'>
          <p> {path} </p>
          {searchName != null ? (
            <SubHeading title = {'Pesquisa por "' + searchName + '"'}></SubHeading>
            ) : (
              <SubHeading title = {categoryName}></SubHeading>
          )} 
        </div>
        <div className='app__Category_Grid'>
          <div className='app__Category_Grid_Esquerda'>
            <p>FILTROS</p>
            <div className='app__Category_filter_content'>
              <p style={{margin: '0'}}>Categoria</p>
              <hr></hr>
              <ul>
               {Object.keys(subcategories).map((subcategory_name) => { 
                  return ( 
                    <li>
                      <a className='app__pointer app__text_effect' key={subcategory_name} onClick={() => sendToSubcategories(subcategory_name) }> {subcategory_name} ({subcategories[subcategory_name]})</a>
                    </li>
                  );
                })}
              </ul>
            </div> 
          </div> 
          <div className='app__Category_Grid_Direita'>
            <div className='app__Category_mobile_filter_content'>
              <button className='main_action_btn' onClick={() => setIsOpen(true)}>Filtros</button>
              <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <p>Filtros</p>
                <div>
                  <p>SubCategoria</p>
                  <ul>
                    {Object.keys(subcategories).map((subcategory_name) => { 
                      return ( 
                      <li>
                        <a className='app__pointer app__text_effect' key={subcategory_name} onClick={() => sendToSubcategories(subcategory_name) }> {subcategory_name} ({subcategories[subcategory_name]})</a>
                      </li>
                      );
                     })}
                  </ul>
                </div>
                <div>

                </div>
                <button className='main__negative_action_btn' onClick={() => deleteAllCartItem()     }>Aplicar</button>
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
            <div className="app__Category_pagination">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className='app__Category_pagination_actionBtn'
                ><FiChevronLeft></FiChevronLeft></button>

                {pagination.map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && goToPage(page)}
                    disabled={currentPage === page || typeof page !== 'number'}
                    className={`app__Category_pagination_pages ${currentPage === page ? 'app__Category_pagination_currentPage' : ''}`}
                  >{typeof page === 'number' ? page : ` ${page} `}</button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className='app__Category_pagination_actionBtn'
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

export default Category