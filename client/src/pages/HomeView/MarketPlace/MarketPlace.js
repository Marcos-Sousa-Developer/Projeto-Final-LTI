import React, {useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import { Navbar, Footer, SnackBar } from '../../../components/index';
import './MarketPlace.css'

import getAllFromDB from '../../../hooks/getAllFromDB';

const MarketPlace = () => {
    const [suppliers, setSuppliers] = useState([])
    const [ads, setAds] = useState([])

    async function getAds(productId){

        let ads = await getAllFromDB("/ads", {product_id: productId})
        setAds(ads)
        let suppliers = [];
        await Promise.all(ads.map(async (ad) => {
            let supplier = await getAllFromDB("/suppliers", { id: ad.supplier_id });
            suppliers.push(supplier[0]);
        }));
        setSuppliers(suppliers)
    }

    useEffect(()=>{ 
        const urlParams = new URLSearchParams(window.location.search);
        const id_product = urlParams.get("id");
        getAds(id_product)
    }, [])



    //Nome de cada supplier (mesmo que tenha o mesmo produto duas vezes)
    //Preço de cada produto

  return (
    <>
        <Navbar></Navbar>
        <div className='app__market_place main__container'>
            <div>
                <FiArrowLeft></FiArrowLeft> Voltar ao produto
            </div>
            <div className='app__market_place_content'>
                <div>
                    Info do produto (imagem, nome)
                </div>
                <div>
                    {ads.map((key) => {
                        return<p key={key}>{key.title} {key.price}</p>;
                    })}

                    {suppliers.map((element, index) => (
                        <p key={element + index}>{element.name}</p>
                    ))}
                    
                    Um map aqui que cria um elemento dentro de uma lista para cada fornecedor com info do mesmo.
                </div>
            </div>
        </div>
        <Footer></Footer>
    </>
  )
}

export default MarketPlace