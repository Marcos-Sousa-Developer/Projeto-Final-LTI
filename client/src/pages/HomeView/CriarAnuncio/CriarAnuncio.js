import React from 'react';

import {NavbarSupplier, Footer, SubHeading} from '../../../components/index';
import "./CriarAnuncio.css";

function CriarAnuncio() {

  return (
    <>
        <NavbarSupplier></NavbarSupplier>
        <div className='app__anuncio main__container'>
            <SubHeading title="Criar anúncio"></SubHeading>
            <div className='app__anuncio_content'>
                <div>
                    <p>Dados do Produto</p>
                    <div>teste</div>
                </div>
                <div>
                    <p>Dados de Contacto</p>
                    <div>teste</div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </>
  )

}

export default CriarAnuncio