import React from 'react'

import product1 from "../../../assets/testproducts/Iphone.png";
import product2 from "../../../assets/testproducts/cannon.png";
import product3 from "../../../assets/testproducts/macbookpro.png";

import {NavbarSupplier, Footer, SubHeading, Searchbar} from '../../../components/index';
import './SupplierAdd.css';

function SupplierAdd() {

    const products = [{
        title: "iPhone 14 Pro Max 64GB",
        src: product1,
        creation: "11/09/2020",
        units: 2,
        price: "999,90€"
      },
      {
        title: "Canon Amg gx7",
        src: product2,
        creation: "11/09/2018",
        units: 6,
        price: "599,90€"
      },
      {
        title: "MacBook Pro Max",
        src: product3,
        creation: "11/09/2019",
        units: 1,
        price: "1999,90€"
      }
    ]

  return (
    <>
    <NavbarSupplier></NavbarSupplier>
    <div className='app__SupplierAdd'>   
        <SubHeading title="Home"/>
        <div className='app__SupplierAdd_options'>
          <ul>
            <li><span></span><a className='option app__text_effect' href="#">Home</a></li>
            <li><span></span><a className='option active app__text_effect' href="#">Anúncios</a></li>
            <li><a className='app__text_effect' href="#">Vendas e Ordens</a></li>
          </ul>
        </div>
        <div className='app__SupplierAdd_Box'>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Unidades</th>
                <th>Data de criação</th>
              </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                <tr key={product.title}>
                  <td>
                  <div className='app__SupplierAdd_Box_Image'>
                  <img src={product.src} alt={product.title}/>
                  {product.title}
                  </div></td>
                  <td>{product.price}</td>            
                  <td>{product.units}</td>
                  <td>{product.creation}</td>
                </tr>
                ))}
                </tbody>
          </table>
        </div>
    </div>
    <Footer></Footer>
    </>
  );

}

export default SupplierAdd;