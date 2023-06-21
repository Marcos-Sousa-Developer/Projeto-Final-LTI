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
                    <td className='deleteFromCompare' style={{textAlign: 'end'}}>
                      <button onClick={() => removeProduct(product.id)}><FiX></FiX></button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                    {
                      product.urls == null ? 
                      (
                        <img className='app__pointer' src={exampleImage} alt={product.title} onClick={() => (window.location.href = `/produto?${new URLSearchParams({ id: product.id }).toString()}`)}/>

                      )
                      :
                      (
                        <img className='app__pointer' src={JSON.parse(product.urls)[0]} alt={product.title} onClick={() => (window.location.href = `/produto?${new URLSearchParams({ id: product.id }).toString()}`)}/>
                      )
                    }
                    </td>
                  </tr>
                  <tr>
                    <td>{product.title}</td>
                  </tr>
                  <tr>
                    <td><PriceDisplay price={product.price}></PriceDisplay></td>
                  </tr>
                  <tr>
                    <td>
                      {Object.keys(JSON.parse(product.extraCharacteristic)).map((key) => {
                      if (key === "0") {
                        return Object.keys(JSON.parse(product.extraCharacteristic)[key]).map((key2) => {
                          return (
                            <div key={key2} style={{display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #EEEEEE'}}>
                              <p style={{fontWeight: '500'}}>{key2}</p>
                              <p style={{textAlign: 'end'}}>{JSON.parse(product.extraCharacteristic)[key][key2].length > 0 ? JSON.parse(product.extraCharacteristic)[key][key2] : "N/A"}</p>
                            </div>
                          )
                        });
                      } else {
                        return (
                          <div key={key} style={{display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #EEEEEE'}}>
                            <p style={{fontWeight: '500'}}>{key}</p>
                            <p style={{textAlign: 'end'}}>{JSON.parse(product.extraCharacteristic)[key].length > 0 ? JSON.parse(product.extraCharacteristic)[key] : "N/A"}</p>
                          </div>
                        );
                      }
                    })}
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
        {/*<div className='app__compare-product_content'>
        {produtos.map(product => {
          return (
            <table key={product.id} className='app__compare-product_content_characteristics'>
              <tbody>
                {Object.keys(JSON.parse(product.extraCharacteristic)).map((key) => {
                  if (key === "0") {
                    return Object.keys(JSON.parse(product.extraCharacteristic)[key]).map((key2) => {
                      return (
                        <tr key={key2}>
                          <td style={{fontWeight: '500'}}>{key2}</td>
                          <td style={{textAlign: 'end'}}>{JSON.parse(product.extraCharacteristic)[key][key2].length > 0 ? JSON.parse(product.extraCharacteristic)[key][key2] : "N/A"}</td>
                        </tr>
                      )
                    });
                  } else {
                    return (
                      <tr key={key}>
                        <td style={{fontWeight: '500'}}>{key}</td>
                        <td style={{textAlign: 'end'}}>{JSON.parse(product.extraCharacteristic)[key].length > 0 ? JSON.parse(product.extraCharacteristic)[key] : "N/A"}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          );
        })}
      </div>*/}
      </div>
      <Footer></Footer>
    </>
  );
};

export default CompareProduct;