import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { FiShoppingCart, FiMinus, FiPlus, FiUser, FiMapPin} from 'react-icons/fi';

import product1 from "../../../assets/testproducts/Iphone.png";
import product2 from "../../../assets/testproducts/cannon.png";
import product3 from "../../../assets/testproducts/macbookpro.png";
import product4 from "../../../assets/testproducts/jacket.png";
import product5 from "../../../assets/testproducts/LEDS.png";
import { Navbar, Footer, SnackBar } from '../../../components/index';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import { ProductSwiper } from './ProductSwiper';
import './ProductPage.css';
import LoadingPage from '../../LoadingPage.js'
import getAllFromDB from '../../../hooks/getAllFromDB';
import Maping from './Maping';
import axios from 'axios';

const SnackbarType = {
  success: "success",
  fail: "fail",
};

const ProductPage = () => {

  const [myLongigtude, setMyLongitude] = useState(0);
  const [myLatitude, setMyLatitude] = useState(0);
  const [supplierLongigtude, setSupplierLongitude] = useState(0);
  const [supplierLatitude, setSupplierLatitude] = useState(0);// Destination latitude

  const snackbarRef = useRef(null);
  const [cookies, setCookie] = useCookies(['cart']);
  const [path, setPath] = useState(null)
  const [suppliers, setSuppliers] = useState([]) //id dos anuncios com o product_id igual ao id do produto
  const [supplierProd, setSupplierProd] = useState(null) 
  const [idProduct, setIdProduct] = useState(null) 
  const [adData, setAdData] = useState({
    dataComplete: {},
    title: "",
    src: [
      product1,
      product2,
      product3,
      product4,
      product5,
    ],
    description: "",
    caracteristics: [],
    price: "",
  });

  const [didMount, setDidMount] = useState(false)

  async function getAndSetProduct(idAd){

    let ad = await getAllFromDB("/ads", {id: idAd})
    setIdProduct(ad[0].product_id)
    setPath("Home - " + ad[0].category_name + " - " + ad[0].subcategory_name + " - " + ad[0].subsubcategory_name)
    let car = []
    try {
      car = JSON.parse(ad[0].extraCharacteristic) 
    } catch (error) {
 
    }
    setAdData({
      dataComplete: ad[0],
      title: ad[0].title,
      src: [
        product1,
        product2,
        product3,
        product4,
        product5,
      ],
      description: ad[0].description,
      caracteristics:  car,
      price: ad[0].price,
    });
    let ads = await getAllFromDB("/ads", {product_id: ad[0].product_id})
    let idsAds = []
    ads.map( (ad) => {
      idsAds.push(ad.id)
    })
    setSuppliers(idsAds)

    let supplier = await getAllFromDB("/suppliers", {id: ad[0].supplier_id})
    setSupplierProd(supplier[0])
    let currentConsumer = await getAllFromDB("/consumers", {uid: true})
    console.log(currentConsumer)
    setMap(currentConsumer[0].postal_code, supplier[0].postal_code)
  }

  const setMap = async (Cpostal_code, Spostal_code) => { 

        await axios.get('https://json.geoapi.pt/cp/'+Cpostal_code) 
        .then((response) => { 
          let latitude = response.data.centro[0]
          let longitude = response.data.centro[1]
          setMyLatitude(latitude)
          setMyLongitude(longitude)
        })
        .catch((error) => {
          setMyLatitude(39.557191)
          setMyLongitude(-7.8536599)
        })

      await axios.get('https://json.geoapi.pt/cp/'+Spostal_code) 
      .then((response) => { 
        let latitude = response.data.centro[0]
        let longitude = response.data.centro[1]
        setSupplierLatitude(latitude)
        setSupplierLongitude(longitude)
      })
      .catch((error) => {
        setSupplierLatitude(39.557191)
        setSupplierLongitude(-7.8536599)
      })
    
  }
  
  const addToCart = () => {
    let id = adData.dataComplete.id
    const prevValue = cookies.cart || {};
    prevValue[id] = [(prevValue[id]?.[0] ?? 0) + 1, adData.price, adData.title, adData.dataComplete];
    setCookie('cart', prevValue, { path: '/' });
  };

  useEffect(()=>{ 
    setDidMount(false) 
    async function run() {
      const urlParams = new URLSearchParams(window.location.search);
      const idAd = urlParams.get("id");
      if(idAd != null){
       await getAndSetProduct(idAd)
      }
     
      setDidMount(true)
    }
    run()

  }, []);

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
        <Navbar></Navbar>
        <div className='app__product_page main__container'>
          <p className='app__product_page_path'>{path}</p>
          <p className='app__product_page_content_title_mobile'>{adData.title}</p>
          <div className='app__product_page_content'>
            <div className='app__product_page_content_info'>
              <div className='app__product_page_content_info_main'>
                <ProductSwiper src={adData.src}></ProductSwiper>
                <div className='app__product_page_content_header'>
                  <p className='app__product_page_content_title'>{adData.title}</p>
                  <PriceDisplay className='product_price' price={adData.price} />
                  <div className='app__product_page_content_supplier'>
                    <p style={{marginBottom: '.5rem'}}>Vendido por: <span style={{fontWeight: '500'}}>{supplierProd.name}</span></p>
                    <div>
                      <FiMapPin></FiMapPin> <span style={{fontWeight: '500'}}>{supplierProd.address}</span>, <span style={{fontSize: '14px'}}>{supplierProd.city}</span>  
                    </div>
                    {(suppliers.length - 1) > 0 &&
                      <Link className='app__text_effect' to={`/market-place?${new URLSearchParams({id: idProduct}).toString()}`}>+ {suppliers.length -1 } anúncios deste produto </Link>
                    }
                  </div>
                  <div className='app__product_page_content_description'>
                    {adData.description}
                  </div>
                  <div className='app__product_page_content_actions'>
                    <div className='app__product_page_content_actions_1'>
                      <button><FiMinus></FiMinus></button>
                      <input></input>
                      <button><FiPlus></FiPlus></button>
                    </div>
                    <button 
                      className='main__action_btn app__product_page_content_actions_2'         
                      onClick={() => {
                        snackbarRef.current.show(); addToCart()
                      }}>Adicionar <FiShoppingCart></FiShoppingCart>
                    </button>

                    <SnackBar
                      ref={snackbarRef}
                      message="Produto adicionado ao carrinho"
                      type={SnackbarType.success}
                    />
                  </div>
                </div>
                
              </div>
              <div className='app__product_page_content_info_characteristics'>
                <p  className='app__product_page_content_characteristics_title'>Informações Técnicas</p>
                <table>
                  <thead>
                    <tr>
                    {Object.keys(adData.caracteristics).map((key) => {
                      return key !== "0" && <th key={key}>{key}</th>;
                    })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                    {Object.keys(adData.caracteristics).map((key) => {
                      const value = adData.caracteristics[key];
                        return key !== "0" && <td data-label={key}>{value}</td>;
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
             
            </div>
          </div>
          <Maping lat={myLatitude} lng={myLongigtude} destLat={supplierLatitude} destLng={supplierLongigtude}></Maping>
        </div>
        
        <Footer></Footer>
        </>
      )
    }
    </>
  );
}

export default ProductPage