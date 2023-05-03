import React, {useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import { Navbar, Footer, SnackBar } from '../../../components/index';
import './MarketPlace.css'

const MarketPlace = () => {
    const [suppliers, setSuppliers] = useState([])

    useEffect(()=>{ 
        const urlParams = new URLSearchParams(window.location.search);
        const suppliers = urlParams.get("products");
        console.log(suppliers)
        setSuppliers(suppliers)
    })

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