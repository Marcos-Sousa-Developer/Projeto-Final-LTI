import React, { useEffect, useState } from 'react';
import { FiChevronRight, FiChevronLeft, FiChevronUp} from 'react-icons/fi';

import { Navbar, Footer, Product, SubHeading, ComparePopUp, Modal } from '../../../components/index';
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

  const [isOpen, setIsOpen] = useState(false);  //modal
  const [filterCategory, setFilterCategory] = useState(false);
  const [filterPrice, setFilterPrice] = useState(false);
  const [searchName, setSearchName] = useState([])
  const [ads, setAds] = useState([])
  const [didMount, setDidMount] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);

  //Paginação

  const goToPage = (page) => {
    setCurrentPage(page);
    startIndex = (page - 1) * 20;
    endIndex = Math.min(startIndex + itemsPerPage, ads.length);
    currentItems = ads.slice(startIndex, endIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  //Categories get and set
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

  //Comparador de Produtos

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

  //Formatação da Paginação

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

  //Filter accordions

  const toggleFilterCategory = () =>{
    return setFilterCategory(!filterCategory);
  }
  const toggleFilterPrice = () =>{
    return setFilterPrice(!filterPrice);
  }

  //useEffect

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
            <p>FILTROS</p>
            <div className='app__Search_filter_content'>
              <div className='app__Search_filter_unit'>
                <div className='app__pointer app__Search_filter_content_title' onClick={toggleFilterCategory}>
                  <p style={{margin: '0'}}>Categoria</p>
                  <span>{filterCategory ? <FiChevronUp className='app__Search_filter_content_title_up'></FiChevronUp> : <FiChevronRight className='app__Search_filter_content_title_right'></FiChevronRight>}</span>
                </div>
                <ul className={filterCategory ? "hideFilter showFilter" : "hideFilter"}>
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
          </div> 
          <div className='app__Search_Grid_Direita'>
           <div className='app__Search_mobile_filter_content'>
              <button className='main__action_btn' onClick={() => setIsOpen(true)}>FILTROS</button>
              <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <p>Filtros</p>
                <div>
                  <p>SubCategoria</p>
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
            <div className="app__Search_pagination">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className='app__Search_pagination_actionBtn'
              ><FiChevronLeft></FiChevronLeft></button>

              {pagination.map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && goToPage(page)}
                  disabled={currentPage === page || typeof page !== 'number'}
                  className={`app__Search_pagination_pages ${currentPage === page ? 'app__Search_pagination_currentPage' : ''}`}
                >{typeof page === 'number' ? page : ` ${page} `}</button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='app__Search_pagination_actionBtn'
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

export default Search