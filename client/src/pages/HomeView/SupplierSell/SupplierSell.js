import React from 'react'

import product1 from "../../../assets/testproducts/Iphone.png";
import product2 from "../../../assets/testproducts/cannon.png";
import product3 from "../../../assets/testproducts/macbookpro.png";

import {NavbarSupplier, Footer, SubHeading, Searchbar} from '../../../components/index';
import './SupplierSell.css';
import SupplierBar from '../../../components/SupplierBar/SupplierBar';

function SupplierSell() {

    const products = [{
        title: "iPhone 14 Pro Max 64GB",
        src: product1,
        creation: "11/09/2020",
        units: 2,
        price: "999,90€",
        buyer:"Pedro"
      },
      {
        title: "Canon Amg gx7",
        src: product2,
        creation: "11/09/2018",
        units: 6,
        price: "599,90€",
        buyer:"Marcos"
      },
      {
        title: "MacBook Pro Max",
        src: product3,
        creation: "11/09/2019",
        units: 1,
        price: "1999,90€",
        buyer:"André"
      }
    ]

  return (
    <>
    <NavbarSupplier></NavbarSupplier>
    <div className='app__SupplierSell'>   
        <SubHeading title="Encomendas"/>
        <SupplierBar active3='active'></SupplierBar>

        <div className='app__SupplierSell_Box'>
        <table>
            <thead>
            <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Unidades</th>
            <th>Data de compra</th>
            <th>Comprador</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                <tr key={product.title}>
                    <td>
                    <div className='app__SupplierSell_Box_Image'>
                    <img src={product.src} alt={product.title}/>
                    {product.title}
                    </div></td>
                    <td>{product.price}</td>            
                    <td>{product.units}</td>
                    <td>{product.creation}</td>
                    <td>{product.buyer}</td>

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

export default SupplierSell;