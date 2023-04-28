import React, {useState} from 'react';
import {Navbar, Footer, Product, ComparePopUp} from '../../../components/index';
import { FiChevronRight, FiChevronLeft} from 'react-icons/fi';
import ReactPaginate from "react-paginate";
import { PRODUCTS } from '../../../assets/products';
import images from '../../../assets/images';
import './Home.css';

function Home() {

  const handleClick = () => {
    const targetDiv = document.getElementById('comprar_div');
    targetDiv.scrollIntoView({ behavior: 'smooth' });
  };
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
  //-----------------------------------------------------------

  const [pageNumber, setPageNumber] = useState(0);

  const productsPerPage = 8;
  const pagesVisited = pageNumber * productsPerPage

  const displayProducts = PRODUCTS.slice(pagesVisited, pagesVisited + productsPerPage).map(product =>{
    return (
      <Product
        key={product.id}
        data={product}
        selectedProducts={selectedProducts}
        onAddToCompare={addToSelectedProducts}
        onRemoveFromCompare={removeFromSelectedProducts}
      />
    )
  })

  const pageCount = Math.ceil(PRODUCTS.length / productsPerPage);

  const changePage = ({selected}) => {
    setPageNumber(selected);
  }
  //-----------------------------------------------------------

  return (
    <>
      <Navbar></Navbar>
      <div className='app__home main__container'>
        <div className='app__home_text'>
          <h2 style={{ fontWeight: '600' }}>Agora pode comprar e ter impacto na sua comunidade.</h2>
          <p>Suporte os produtores locais.</p>
          <button onClick={handleClick} className='main__action_btn'>
            Comprar
          </button>
        </div>
        <img className='rectangle1' src={images.Rectangle1}></img>
        <img className='rectangle2' src={images.Rectangle2}></img>
        <img src={images.shopping_app}></img>
      </div>
      <div className='products main__container' id='comprar_div'>
        {displayProducts}
      </div>
      <div>
        <ReactPaginate 
          previousLabel={<FiChevronLeft></FiChevronLeft>}
          nextLabel={<FiChevronRight></FiChevronRight>}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName='paginationBttns'
          previousLinkClassName='pagination-previousPage-btn'
          nextLinkClassName='pagination-nextPage-btn'
          disabledClassName='paginationDisabled'
          activeClassName='paginationActive'
        />
      </div>
      <ComparePopUp
        selectedProducts={selectedProducts}
        onCloseComparePopUp={() => setSelectedProducts([])}
        removeFromSelectedProducts={removeFromSelectedProducts}
      />
      <Footer></Footer>
    </>
  );
}

export default Home;