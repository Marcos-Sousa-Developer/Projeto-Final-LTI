import React from 'react';
import { Link } from 'react-router-dom';

import {NavbarSupplier, Footer, SubHeading, Searchbar} from '../../../components/index';
import './styles/Anunciar.css';

const Anunciar = () => {


  return (
    <>
        <NavbarSupplier></NavbarSupplier>
        <div className='app__anunciar main__container'>
            <SubHeading title="Anunciar"></SubHeading>
            <div className='app__anunciar_content'>
                <div className='app__anunciar_content_search'>
                    <p>Pesquise um produto existente no nosso catálogo pelo EAN</p>
                    <Searchbar placeholder="Teste"></Searchbar>
                </div>
                <div className='app__anunciar_content_novo_anuncio'>
                    <p>...ou crie um novo anúncio</p>
                    <div><Link to='/anuncio' className='main__action_btn'>Criar anuncio</Link></div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </>
  )
}

export default Anunciar