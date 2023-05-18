import React, {useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import { Navbar, Footer, SnackBar } from '../../../components/index';
import './MarketPlace.css'

import getAllFromDB from '../../../hooks/getAllFromDB';

const MarketPlace = () => {
    const [suppliers, setSuppliers] = useState([])
    const [suppliersName, setSuppliersName] = useState([])
    const [productPrice, setSuppliersPrice] = useState([])

    async function getSuppliers(suppliersIds){

        let suppliersNameTemp = []
        let productPriceTemp = []

        for (let i = 0; i < suppliersIds.length; i++) {
            let ad = await getAllFromDB("/ads/" + suppliersIds[i]);
            productPriceTemp.push(ad[0].price)
            let supplierId = ad[0].supplier_id
            let supplier = await getAllFromDB("/suppliers/" + supplierId);
            suppliersNameTemp.push(supplier[0].name)
          }
        setSuppliersName(suppliersNameTemp)
        setSuppliersPrice(productPriceTemp)
    }

    useEffect(()=>{ 
        const urlParams = new URLSearchParams(window.location.search);
        const suppliersSearch = urlParams.get("products");
        let suppliers = suppliersSearch.split(",").map(Number);
        setSuppliers(suppliers)
        getSuppliers(suppliers)
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
                    Um map aqui que cria um elemento dentro de uma lista para cada fornecedor com info do mesmo.
                </div>
            </div>
        </div>
        <Footer></Footer>
    </>
  )
}

export default MarketPlace