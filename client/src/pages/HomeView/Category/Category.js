import React, { useEffect, useState, useRef} from 'react';
import { FiChevronRight, FiChevronLeft, FiChevronUp } from 'react-icons/fi';

import { Navbar, Footer, Product, SubHeading, ComparePopUp, Modal, SnackBar } from '../../../components/index';
import getAllFromDB from '../../../hooks/getAllFromDB';

import './Category.css';
import LoadingPage from '../../LoadingPage';
import { Link } from 'react-router-dom';

const SnackbarType = {
  success: "success",
  fail: "fail",
};

let subcategories = {}
const itemsPerPage = 20; // Number of items per page
let startIndex = 0;
let endIndex = 0;

const Category = () => {

  const [isOpen, setIsOpen] = useState(false);  //modal
  const [filterCategory, setFilterCategory] = useState(false);
  const [filterPrice, setFilterPrice] = useState(false);
  const [filterSort, setFilterSort] = useState(false);
  const [ads, setAds] = useState([]);
  const [searchName, setSearchName] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSorted, setIsSorted] = useState(0);
  const [didMount, setDidMount] = useState(false);

  const snackbarRef = useRef(null);

  const [currentItems, setCurrentItems] = useState([]);

  const [adsPrev, setAdsPrev] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [minCurrentPrice, setCurrentMinPrice] = useState(0);
  const [maxCurrentPrice, setCurrentMaxPrice] = useState(null);

  async function getSubCategoriesbySearchName(categoryName, searchName){
    let adsDB = await getAllFromDB("/ads", {title: searchName, category_name: categoryName})
    setAds(adsDB)
    setAdsPrev(adsDB)
    let max = 0;
    adsDB.map( (ad) => {  
      subcategories[ad.subcategory_name] != undefined ? subcategories[ad.subcategory_name] +=1 : subcategories[ad.subcategory_name]=0
      ad.price > max ? max = ad.price: max = max
    })
    setMaxPrice(max)
    setCurrentMaxPrice(max)
    startIndex = (currentPage - 1) * 20;
    endIndex = Math.min(startIndex + itemsPerPage, adsDB.length);
    setCurrentItems(adsDB.slice(startIndex, endIndex))
  }

  async function getSubCategories(categoryName){
    let adsDB = await getAllFromDB("/ads", {category_name: categoryName})
    setAds(adsDB)
    setAdsPrev(adsDB)
    let max = 0;
    adsDB.map( (ad) => {  
      subcategories[ad.subcategory_name] != undefined ? subcategories[ad.subcategory_name] +=1 : subcategories[ad.subcategory_name]=0
      ad.price > max ? max = ad.price: max = max
    })
    setMaxPrice(max)
    setCurrentMaxPrice(max)
    startIndex = (currentPage - 1) * 20;
    endIndex = Math.min(startIndex + itemsPerPage, adsDB.length);
    setCurrentItems(adsDB.slice(startIndex, endIndex))
  }

  //Paginação

  const goToPage = (page) => {
    setCurrentPage(page);
    startIndex = (page - 1) * 20;
    endIndex = Math.min(startIndex + itemsPerPage, adsPrev.length);
    setCurrentItems(adsPrev.slice(startIndex, endIndex))
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function sendToSubcategories(subcategoryName) {

    //SELECIONA SUBCATEGORIA COM PESQUISA
    const data = searchName!==null ? {category: categoryName, subCategory: subcategoryName, searchName: searchName } : {category: categoryName, subCategory: subcategoryName} ;
    const queryString = new URLSearchParams(data).toString();
    window.location.href = `/subcategoria?${queryString}`;
    
  }

  //Comparador de Produtos

  const [selectedProducts, setSelectedProducts] = useState([]);

  const addToSelectedProducts = (product) => {
    if (selectedProducts.length >= 4) {
      return;
    }
    if(selectedProducts.length > 0){
      if(selectedProducts[0].subsubcategory_name == product.subsubcategory_name){
        setSelectedProducts([...selectedProducts, product]);
      } else {
        snackbarRef.current.show();
      }
    } else {
      setSelectedProducts([...selectedProducts, product]);
    } 
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
  const toggleFilterSort = () =>{
    return setFilterSort(!filterSort);
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

  const sortPriceLow = () =>{
    setCurrentPage(1)
    let adsSorted = adsPrev.sort((a, b) => a.price - b.price);
    setAdsPrev(adsSorted)
    setIsSorted(isSorted+1)
  }

  const sortPriceHigh = () =>{
    setCurrentPage(1)
    let adsSorted = adsPrev.sort((a, b) => b.price - a.price);
    setAdsPrev(adsSorted)
    setIsSorted(isSorted+1)
  }

  const sortMostRecent = () =>{
    setCurrentPage(1)
    let adsSorted = adsPrev.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setAdsPrev(adsSorted)
    setIsSorted(isSorted+1)
  }

  //UseEffect

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

  useEffect(()=>{ 
    startIndex = 0;
    endIndex = Math.min(startIndex + itemsPerPage, adsPrev.length);
    setCurrentItems(adsPrev.slice(startIndex, endIndex))
  }, [adsPrev, isSorted])

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
          {
            searchName !== null ?  (
              <p> <Link className='app__pointer app__text_effect' to={'/'}> Home </Link> > 
                  <Link className='app__pointer app__text_effect' to={'/categoria?category='+categoryName + "&searchName="+searchName}> {categoryName} </Link> >
                   pesquisa:  {searchName} 
              </p>
            )
            : 
            (
              <p> <Link className='app__pointer app__text_effect' to={'/'}> Home </Link> > 
              <Link className='app__pointer app__text_effect' to={'/categoria?category='+categoryName}> {categoryName} </Link>
              </p>
            )

          }
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
              <div className='app__Category_filter_unit'>
                <div className='app__pointer app__Category_filter_content_title' onClick={toggleFilterCategory}>
                  <p style={{margin: '0'}}>Categoria</p>
                  <span>{filterCategory ? <FiChevronUp className='app__Category_filter_content_title_up'></FiChevronUp> : <FiChevronRight className='app__Category_filter_content_title_right'></FiChevronRight>}</span>
                </div>
                <ul className={filterCategory ? "hideFilter showFilter" : "hideFilter"}>
                {Object.keys(subcategories).map((subcategory_name) => { 
                    return ( 
                      <li style={{marginLeft: '1rem'}}>
                        <a className='app__pointer app__text_effect' key={subcategory_name} onClick={() => sendToSubcategories(subcategory_name) }> {subcategory_name} ({subcategories[subcategory_name]})</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className='app__Category_filter_unit'>
                <div className='app__pointer app__Category_filter_content_title' onClick={toggleFilterPrice}>
                  <p style={{margin: '0'}}>Preço</p>
                  <span>{filterPrice ? <FiChevronUp className='app__Category_filter_content_title_up'></FiChevronUp> : <FiChevronRight className='app__Category_filter_content_title_right'></FiChevronRight>}</span>
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
              <div className='app__Category_filter_unit'>
                <div className='app__pointer app__Category_filter_content_title' onClick={toggleFilterSort}>
                  <p style={{margin: '0'}}>Ordenar por:</p>
                  <span>{filterSort ? <FiChevronUp className='app__Category_filter_content_title_up'></FiChevronUp> : <FiChevronRight className='app__Category_filter_content_title_right'></FiChevronRight>}</span>
                </div>
                <ul className={filterSort ? "hideFilter showFilter" : "hideFilter"}>
                  <li style={{marginLeft: '1rem'}}>
                    <a className='app__pointer app__text_effect' onClick={() => sortPriceLow() }>Preço - mais baixo</a>
                  </li>
                  <li style={{marginLeft: '1rem'}}>
                    <a className='app__pointer app__text_effect' onClick={() => sortPriceHigh() }>Preço - mais alto</a>
                  </li> 
                  <li style={{marginLeft: '1rem'}}>
                    <a className='app__pointer app__text_effect' onClick={() => sortMostRecent() }>Os mais recentes</a>
                  </li> 
                </ul>
              </div>
            </div> 
          </div> 
          <div className='app__Category_Grid_Direita'>
            <div className='app__Category_mobile_filter_content'>
              <button onClick={() => setIsOpen(true)}>FILTROS</button>
              <Modal open={isOpen} onClose={() => setIsOpen(false)} filter={true}>
                <p style={{margin: '0'}}>FILTROS</p>
                <div  className='app__Category_filter_unit'>
                  <p className="mobile-title">Categoria</p>
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
                <div className='app__Category_filter_unit'>
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
                <div className='app__Category_filter_unit'>
                <div className='app__pointer app__Category_filter_content_title' onClick={toggleFilterSort}>
                  <p style={{margin: '0'}}>Ordenar por:</p>
                  <span>{filterSort ? <FiChevronUp className='app__Category_filter_content_title_up'></FiChevronUp> : <FiChevronRight className='app__Category_filter_content_title_right'></FiChevronRight>}</span>
                </div>
                <ul className={filterSort ? "hideFilter showFilter" : "hideFilter"}>
                  <li style={{marginLeft: '1rem'}}>
                    <a className='app__pointer app__text_effect' onClick={() => console.log("preco baixo") }> Preço - mais baixo</a>
                  </li>
                  <li style={{marginLeft: '1rem'}}>
                    <a className='app__pointer app__text_effect' onClick={() => console.log("preco alto") }> Preço - mais alto</a>
                  </li> 
                  <li style={{marginLeft: '1rem'}}>
                    <a className='app__pointer app__text_effect' onClick={() => console.log("recentes") }> Os mais recentes</a>
                  </li> 
                </ul>
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
            <SnackBar
                ref={snackbarRef}
                message="Não é possível comparar produtos de categorias diferentes"
                type={SnackbarType.fail}
            />
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