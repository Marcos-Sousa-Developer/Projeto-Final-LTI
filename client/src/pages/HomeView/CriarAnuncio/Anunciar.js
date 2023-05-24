import React from 'react';
import { Link } from 'react-router-dom';

import {NavbarSupplier, Footer, SubHeading, Searchbar} from '../../../components/index';
import './styles/Anunciar.css';
import SupplierBar from '../SupplierBar/SupplierBar';

const Anunciar = () => {


  return (
    <>
        <NavbarSupplier></NavbarSupplier>
        <div className='app__anunciar main__container'>
            <SubHeading title="Anunciar"></SubHeading>
            <br></br>
            <SupplierBar></SupplierBar>
            <div className='app__anunciar_content'>
                <div className='app__anunciar_content_search'>
                    <p>Pesquise um produto existente no nosso catálogo pelo EAN</p>
                    <Searchbar></Searchbar>
                </div>
                <div style={{textAlign:'center'}} className='app__anunciar_content_novo_anuncio'>
                    <p>...ou crie um novo anúncio</p>
                    <Link to='/supplier/anuncio' className='main__action_btn'>Criar anuncio</Link>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </>
  )
}

export default Anunciar