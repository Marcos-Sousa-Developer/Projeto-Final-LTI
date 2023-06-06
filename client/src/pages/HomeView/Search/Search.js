import React, { useEffect, useState } from 'react';
import { FiChevronRight, FiChevronLeft, FiChevronUp} from 'react-icons/fi';

import { Navbar, Footer, Product, SubHeading, ComparePopUp, Modal } from '../../../components/index';
import getAllFromDB from '../../../hooks/getAllFromDB';
import getFromDB from '../../../hooks/getFromDB';

import './Search.css';
import LoadingPage from '../../LoadingPage';

let categories = {}
const itemsPerPage = 20; // Number of items per page
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

  const [currentItems, setCurrentItems] = useState([]);

  const [adsPrev, setAdsPrev] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [minCurrentPrice, setCurrentMinPrice] = useState(0);
  const [maxCurrentPrice, setCurrentMaxPrice] = useState(null);

  //Paginação

  const goToPage = (page) => {
    setCurrentPage(page);
    startIndex = (page - 1) * 20;
    endIndex = Math.min(startIndex + itemsPerPage, adsPrev.length);
    setCurrentItems(adsPrev.slice(startIndex, endIndex))
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  //Categories get and set
  async function getAndSetProducts(title){
    let adsDB = await getAllFromDB("/ads", {title: title})
    setAds(adsDB);
    setAdsPrev(adsDB)
    startIndex = (currentPage - 1) * 20;
    endIndex = Math.min(startIndex + itemsPerPage, adsDB.length);
    setCurrentItems(adsDB.slice(startIndex, endIndex))
    let max = 0;
    adsDB.map( (ad) => {  
      
      categories[ad.category_name] != undefined ? categories[ad.category_name] +=1 : categories[ad.category_name]=0
      ad.price > max ? max = ad.price: max = max

    })
    setMaxPrice(max)
    setCurrentMaxPrice(max)
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

  const totalPages = Math.ceil(adsPrev.length / itemsPerPage);
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

  const setByPrice = () =>{
    setCurrentPage(1)
    let newProducts = []
    let max = maxCurrentPrice
    if(maxCurrentPrice === ''){
      max = maxPrice
    }
    if(minCurrentPrice <= max){
      for(const item in ads){
        if(ads[item].price >= minCurrentPrice && ads[item].price <= max){
          newProducts.push(ads[item])
        }
      }
      setAdsPrev(newProducts)
    }
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

  useEffect(()=>{ 
    startIndex = 0;
    endIndex = Math.min(startIndex + itemsPerPage, adsPrev.length);
    setCurrentItems(adsPrev.slice(startIndex, endIndex))
  }, [adsPrev])

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
                      <li style={{marginLeft: '1rem'}}>
                        <a className='app__pointer app__text_effect' key={category_name} onClick={() => sendToCategories(category_name) }> {category_name} ({categories[category_name]})</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className='app__Search_filter_unit'>
                <div className='app__pointer app__Search_filter_content_title' onClick={toggleFilterPrice}>
                  <p style={{margin: '0'}}>Preço</p>
                  <span>{filterPrice ? <FiChevronUp className='app__Search_filter_content_title_up'></FiChevronUp> : <FiChevronRight className='app__Search_filter_content_title_right'></FiChevronRight>}</span>
                </div>
                <div className={filterPrice ? "filterPrice showFilter" : "hideFilter"}>
                  <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div>
                      <span>Min. € {/*minPrice*/}</span>
                      <input type='number' value={minCurrentPrice} onChange={(e) => setCurrentMinPrice(e.target.value)}></input>
                    </div>
                    <div>
                      <span>Máx. €{/*maxPrice*/}</span>
                      <input type='number' value={maxCurrentPrice} onChange={(e) => setCurrentMaxPrice(e.target.value)}></input>
                    </div>
                  </div>
                  <button className='main__action_btn' onClick={() => setByPrice()}>OK</button>
                </div>
              </div>
            </div> 
          </div> 
          <div className='app__Search_Grid_Direita'>
           <div className='app__Search_mobile_filter_content'>
              <button className='main__action_btn' onClick={() => setIsOpen(true)}>FILTROS</button>
              <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <p>FILTROS</p>
                <div>
                  <p>Categoria</p>
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
                <div className='app__Search_filter_unit'>
                  <p className="mobile-title">Preço</p>
                  <div className='filterPrice'>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                      <div>
                        <span>Min. €{/*minPrice*/}</span>
                        <input type='number' value={minCurrentPrice} onChange={(e) => setCurrentMinPrice(e.target.value)}></input>
                      </div>
                      <div>
                        <span>Máx. €{/*maxPrice*/}</span>
                        <input type='number' value={maxCurrentPrice} onChange={(e) => setCurrentMaxPrice(e.target.value)}></input>
                      </div>
                    </div>
                    <button className='' onClick={() => setByPrice()}>OK</button>
                  </div>
                </div>
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