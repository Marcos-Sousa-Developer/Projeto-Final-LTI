import React from 'react';

import product1 from "../../../assets/testproducts/Iphone.png";
import product2 from "../../../assets/testproducts/cannon.png";
import product3 from "../../../assets/testproducts/macbookpro.png";
import product4 from "../../../assets/testproducts/jacket.png";
import product5 from "../../../assets/testproducts/LEDS.png";

import { Link } from 'react-router-dom';
import { FiShoppingCart, FiMinus, FiPlus} from 'react-icons/fi';
import { Navbar, Footer } from '../../../components/index';
import { ProductSwiper } from './ProductSwiper';
import './ProductPage.css';

const ProductPage = () => {

  //---------------------------Data from the product--------------------------

  const product = [{
    title: "iPhone 14 Pro Max 64GB",
    src: [
      product1,
      product2,
      product3,
      product4,
      product5,
    ],
    description: "Qui dolores omnis et quam enim qui quia mollitia aut ullam laudantium et voluptatibus fuga sit explicabo sequi et repudiandae veritatis. Est officiis optio non laboriosam velit et necessitatibus tempore sed aperiam doloribus.",
    caracteristics: [
      {
        features: [{Marca: 'iPhone', LocaldeProducao:'USA', Validade:'None', Garantia:'3 anos'}],
        sub_features: [{Processador: 'A14', MemoriaRam: '64GB'}]
      }
    ],
    price: "999,90€"
  }]

  return (
    <>
        <Navbar></Navbar>
        <div className='app__product_page main__container'>
          <p className='app__product_page_path'>Home - Categoria X - SubCategoria X - SubsubCategoria X</p>
          <p className='app__product_page_content_title_mobile'>{product[0].title}</p>
          <div className='app__product_page_content'>
            <div className='app__product_page_content_info'>
              <div className='app__product_page_content_info_main'>
                <ProductSwiper src={product[0].src}></ProductSwiper>
                <div className='app__product_page_content_header'>
                  <p className='app__product_page_content_title'>{product[0].title}</p>
                  <p className='app__product_page_content_price'>{product[0].price}</p>
                  <div className='app__product_page_content_supplier'>
                    <p>Fornecedores</p>
                  </div>
                  <div className='app__product_page_content_description'>
                    {product[0].description}
                  </div>
                  <div className='app__product_page_content_actions'>
                    <div className='app__product_page_content_actions_1'>
                      <button><FiMinus></FiMinus></button>
                      <input/>
                      <button><FiPlus></FiPlus></button>
                    </div>
                    <button className='main__action_btn app__product_page_content_actions_2'>Adicionar <FiShoppingCart></FiShoppingCart></button>
                  </div>
                </div>
              </div>
              <div className='app__product_page_content_info_characteristics'>
                <p  className='app__product_page_content_characteristics_title'>Informações Técnicas</p>
                <table>
                  <thead>
                    <tr>
                      <th>Marca</th>
                      <th>LocaldeProducao</th>
                      <th>Validade</th>
                      <th>Garantia</th>
                      <th>Processador</th>
                      <th>MemoriaRam</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-label='Marca'>{product[0].caracteristics[0].features[0].Marca}</td>
                      <td data-label='LocaldeProducao'>{product[0].caracteristics[0].features[0].LocaldeProducao}</td>
                      <td data-label='Validade'>{product[0].caracteristics[0].features[0].Validade}</td>
                      <td data-label='Garantia'>{product[0].caracteristics[0].features[0].Garantia}</td>
                      <td data-label='Processador'>{product[0].caracteristics[0].sub_features[0].Processador}</td>
                      <td data-label='MemoriaRam'>{product[0].caracteristics[0].sub_features[0].MemoriaRam}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
    </>
  );
}

export default ProductPage