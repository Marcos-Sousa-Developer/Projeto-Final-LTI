import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

import { Navbar, Footer, SubHeading } from '../../../components/index';
import './CompareProduct.css';
import { PriceDisplay } from '../../../utilities/formatCurrency';

import exampleImage from '../../../assets/testproducts/boxedwater2.jpg';
import LoadingPage from '../../LoadingPage';

const CompareProduct = () => {
  const location = useLocation();
  
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    if (location.state && location.state.selectedProducts) {
      setProdutos(location.state.selectedProducts);
    }
  }, []);

  const removeProduct = (productId) => {
    const updatedProducts = produtos.filter(product => product.id !== productId);
    setProdutos(updatedProducts);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className='app__compare-product main__container'>
        <SubHeading title='Comparador'></SubHeading>
        <div className='app__compare-product_content'>
          {produtos.map(product => {
            return (
              <table key={product.id}>
                <tbody>
                  <tr>
                    <td style={{paddingTop:'.75rem'}}>
                      <img className='app__pointer' src={exampleImage} alt={product.title} onClick={() => (window.location.href = `/produto?${new URLSearchParams({ id: product.id }).toString()}`)}/>
                    </td>
                  </tr>
                  <tr>
                    <td>{product.title}</td>
                  </tr>
                  <tr>
                    <td><PriceDisplay price={product.price}></PriceDisplay></td>
                  </tr>
                  <tr>
                    <td className='deleteFromCompare'>
                      <button onClick={() => removeProduct(product.id)}>Remover produto</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
        <div className='app__compare-product_content'>
        {produtos.map(product => {
          return (
            <table key={product.id}>
              <tbody>
                {Object.keys(JSON.parse(product.extraCharacteristic)).map((key) => {
                  if (key === "0") {
                    return Object.keys(JSON.parse(product.extraCharacteristic)[key]).map((key2) => {
                      return (
                        <tr key={key2}>
                          <td>{key2}</td>
                          <td>{JSON.parse(product.extraCharacteristic)[key][key2]}</td>
                        </tr>
                      )
                    });
                  } else {
                    return (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{JSON.parse(product.extraCharacteristic)[key]}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          );
        })}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default CompareProduct;