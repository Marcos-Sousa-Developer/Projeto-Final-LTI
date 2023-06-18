import React, {useState, useEffect, useRef} from 'react';
import { FiChevronRight, FiChevronLeft} from 'react-icons/fi';
import ReactPaginate from "react-paginate";

import {Navbar, NavbarSupplier, Footer, Product, ComparePopUp, SubHeading, SnackBar} from '../../../components/index';
import images from '../../../assets/images';
import './Home.css';
import getClientType from "../../../hooks/getClientType";
import getAllFromDB from '../../../hooks/getAllFromDB';
import LoadingPage from '../../LoadingPage';
import { CookieStorage } from 'amazon-cognito-identity-js';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FreeMode, Pagination } from "swiper";

const SnackbarType = {
  success: "success",
  fail: "fail",
};

function Home() {
  const [slidesPerView, setSlidesPerView] = useState(5);
  const [spaceBetween, setSpaceBetween] = useState(30);

  const snackbarRef = useRef(null);

  const handleClick = () => {
    const targetDiv = document.getElementById('comprar_div');
    targetDiv.scrollIntoView({ behavior: 'smooth' });
  };

  const [ads, setAds] = useState([])
  const [userType, setUserType] = useState(false)
  const [didMount, setDidMount] = useState(false)

  const getUserType = async () => {

    let response = await getClientType()   

    if(response) {
      let type = response[0]
      setUserType(type)
    }
  }

  async function getAds(){
    let adsDB = await getAllFromDB("/ads")
    setAds(adsDB.slice(adsDB.length - 10, adsDB.length).reverse())
  }

  useEffect(() => {
    getUserType()
    getAds()
    setDidMount(true)
    const handleResize = () => {
      if (window.innerWidth < 650) {
        setSlidesPerView(2);
        setSpaceBetween(10);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(3);
        setSpaceBetween(20);
      } else if (window.innerWidth < 1200){
        setSlidesPerView(4);
        setSpaceBetween(30);
      } else{
        setSlidesPerView(5);
        setSpaceBetween(30);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call the function once on initial render

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  },[])

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

  //-----------------------------------------------------------

  return (
    <>
    {
      didMount == false ? (
        <>
          <LoadingPage></LoadingPage>
        </>
      )
      :
      (
      <>
      {userType == 'supplier' ? 
        <>
        <NavbarSupplier></NavbarSupplier>
        </>
      :
        <>
        <Navbar></Navbar>
        </>
      } 
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
      <div className='app__destaques main__container' id="comprar_div">
          <SubHeading title="Destaques"></SubHeading>
          <div className="app__destaques_content">
            <Swiper         
              slidesPerView={slidesPerView}
              spaceBetween={spaceBetween}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Pagination]}
              className="mySwiper">
              {ads.map((ad) => (
                <SwiperSlide key={ad.id}>
                  <Product
                    data={ad}
                    selectedProducts={selectedProducts}
                    onAddToCompare={addToSelectedProducts}
                    onRemoveFromCompare={removeFromSelectedProducts}
                    onClick={() => (window.location.href = `/produto?${new URLSearchParams({ id: ad.id }).toString()}`)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <SnackBar
            ref={snackbarRef}
            message="Não é possível comparar produtos de categorias diferentes"
            type={SnackbarType.fail}
        />
      <Footer></Footer>
      <ComparePopUp
        selectedProducts={selectedProducts}
        onCloseComparePopUp={() => setSelectedProducts([])}
        removeFromSelectedProducts={removeFromSelectedProducts}
      />
      </>
      )
    }
    </>
  );
}

export default Home;