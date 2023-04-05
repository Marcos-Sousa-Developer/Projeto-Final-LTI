import React from 'react';
import { Link } from 'react-router-dom';

import {NavbarSupplier, Footer, SubHeading, Searchbar} from '../../../components/index';
import './Anunciar.css';

const Anunciar = () => {


  return (
    <>
        <NavbarSupplier></NavbarSupplier>
        <div className='app__anunciar main__container'>
            <SubHeading title="Anunciar"></SubHeading>
            <div className='app__anunciar_content'>
                <div>
                    <p>Pesquisar anuncio já existente</p>
                    <Searchbar></Searchbar>
                </div>
                <div>
                    <Link to='/anuncio'>Criar anuncio</Link>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </>
  )
}

export default Anunciar