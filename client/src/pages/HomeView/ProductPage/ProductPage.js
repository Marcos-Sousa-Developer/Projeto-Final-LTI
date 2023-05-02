import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiMinus, FiPlus} from 'react-icons/fi';

import product1 from "../../../assets/testproducts/Iphone.png";
import product2 from "../../../assets/testproducts/cannon.png";
import product3 from "../../../assets/testproducts/macbookpro.png";
import product4 from "../../../assets/testproducts/jacket.png";
import product5 from "../../../assets/testproducts/LEDS.png";

import { Navbar, Footer, SnackBar } from '../../../components/index';
import { ProductSwiper } from './ProductSwiper';
import './ProductPage.css';
import LoadingPage from '../../LoadingPage.js'

import getAllFromDB from '../../../hooks/getAllFromDB';
import getFromDB from '../../../hooks/getFromDB';

const SnackbarType = {
  success: "success",
  fail: "fail",
};

const ProductPage = () => {

  const snackbarRef = useRef(null);
  const [path, setPath] = useState(null)
  const [suppliers, setSuppliers] = useState([]) //id dos anuncios com o product_id igual ao id do produto
  const [adData, setAdData] = useState({
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
    let product = await getAllFromDB("/products/" + ad[0].product_id)
    let subSubCategory = await getFromDB("/subsubcategories/" + product[0].id_subsubcategory);
    let subCategory = await getFromDB("/subcategories/" + subSubCategory[0].id_subcategory);
    let category = await getFromDB("/categories/" + subCategory[0].id_category); 
    setPath("Home - " + category[0].name + " - " + subCategory[0].name + " - " + subSubCategory[0].name)
    setAdData({
      title: ad[0].title,
      src: [
        product1,
        product2,
        product3,
        product4,
        product5,
      ],
      description: ad[0].description,
      caracteristics: JSON.parse(ad[0].extraCharacteristic),
      price: ad[0].price,
    });
    let ads = await getAllFromDB("/ads", {product_id: ad[0].product_id})
    let idsAds = []
    ads.map( async (ad) => {
      idsAds.push(ad.id)
    })
    setSuppliers(idsAds)
  }

  useEffect(()=>{ 
    setDidMount(false)
    const urlParams = new URLSearchParams(window.location.search);
    const idAd = urlParams.get("id");
    if(idAd != null){
      getAndSetProduct(idAd)
    }
    setDidMount(true)
  }, [])

  //---------------------------Data from the product--------------------------

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
                  <p className='app__product_page_content_price'>{adData.price}</p>
                  <div className='app__product_page_content_supplier'>
                    <p>Fornecedores</p>
                    <p>+ {suppliers.length -1 } fornecedores </p>
                  </div>
                  <div className='app__product_page_content_description'>
                    {adData.description}
                  </div>
                  <div className='app__product_page_content_actions'>
                    <div className='app__product_page_content_actions_1'>
                      <button><FiMinus></FiMinus></button>
                      <input/>
                      <button><FiPlus></FiPlus></button>
                    </div>
                    <button 
                      className='main__action_btn app__product_page_content_actions_2'         
                      onClick={() => {
                        snackbarRef.current.show();
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
                      <th>Caracteristicas</th>
                      {/*<th>Marca</th>
                      <th>LocaldeProducao</th>
                      <th>Validade</th>
                      <th>Garantia</th>
                      <th>Processador</th>
                      <th>MemoriaRam</th>*/}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-label='Caracteristicas'>{adData.caracteristics[0]}</td>
                      {/*<td data-label='Marca'>{adData.caracteristics[0].features[0].Marca}</td>
                      <td data-label='LocaldeProducao'>{adData.caracteristics[0].features[0].LocaldeProducao}</td>
                      <td data-label='Validade'>{adData.caracteristics[0].features[0].Validade}</td>
                      <td data-label='Garantia'>{adData.caracteristics[0].features[0].Garantia}</td>
                      <td data-label='Processador'>{adData.caracteristics[0].sub_features[0].Processador}</td>
                      <td data-label='MemoriaRam'>{adData.caracteristics[0].sub_features[0].MemoriaRam}</td>*/}
                    </tr>
                  </tbody>
                </table>
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

export default ProductPage