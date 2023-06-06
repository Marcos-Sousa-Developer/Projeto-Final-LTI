import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiArrowRight } from 'react-icons/fi';

import { Navbar, Footer, SubHeading } from '../../../components/index';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import './MarketPlace.css'

import exampleImage from '../../../assets/testproducts/boxedwater2.jpg';

import getAllFromDB from '../../../hooks/getAllFromDB';
import { useNavigate } from 'react-router-dom';

const MarketPlace = () => {
    const [suppliers, setSuppliers] = useState([])
    const [ads, setAds] = useState([])
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

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
            <SubHeading title='Anúncios do mesmo Produto'></SubHeading>
            <div onClick={goBack} style={{margin: '1rem 0'}}>
                <a className='app__text_effect app__pointer anuncio'><FiArrowLeft></FiArrowLeft>  Voltar ao produto</a>
            </div>
            <div className='app__market_place_info'>
                <div className='app__market_place_content'>
                    <div className='app__market_place_content_produt'>
                        {ads.map((key) => {
                            return (
                                <>
                                    <img className='app__market_place_content_product_img' src={exampleImage} />
                                    <p key={key} style={{margin: '1rem 0 0 0'}}>{key.title}</p>
                                    <PriceDisplay className='product_price' price={key.price} />
                                </>
                            );
                        })}
                    </div>
                    <div className='app__market_place_content_supplier_info'>
                        {suppliers.map((element, index) => (
                            <div key={element + index}>
                                <p style={{marginBottom: '.5rem'}}>Vendido por: <span style={{fontWeight: '500'}}>{element.name}</span></p>
                                <div style={{marginBottom: '.5rem'}}>
                                    <FiMapPin></FiMapPin> <span style={{fontWeight: '500'}}>{element.address}</span>, <span style={{fontSize: '14px'}}>{element.city}</span>  
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='app__market_place_content_goTo'>
                    <Link className='app__text_effect anuncio'>Ir para anúncio <FiArrowRight></FiArrowRight></Link>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </>
  )
}

export default MarketPlace