import React from 'react'

import {NavbarSupplier, Footer, SubHeading, Searchbar} from '../../../components/index';
import './SupplierAdd.css';

function SupplierAdd() {

  return (
    <>
    <NavbarSupplier></NavbarSupplier>
    <div className='app__SupplierPage'>   
        <SubHeading title="Home"/>
        <div className='app__SupplierPage_options'>
              <ul>
                <li><span></span><a className='option app__text_effect' href="#">Home</a></li>
                <li><span></span><a className='option active app__text_effect' href="#">Anúncios</a></li>
                <li><a className='app__text_effect' href="#">Vendas e Ordens</a></li>
              </ul>
        </div>
        <div className='app__SupplierPage_boxes'>
          <div className='app__SupplierPage_boxesEsquerda'>
            <div className='app__SupplierPage_boxesEsquerda1'>
              <p>Estatísticas</p>
              <div className='app__SupplierPage_boxesEsquerda1Est'>

              </div>

            </div>
            <div className='app__SupplierPage_boxesEsquerda2'>
              <p>Últimas ordens</p>
              <div className='app__SupplierPage_boxesEsquerda1Ult'>
                
              </div>

            </div>
          </div>

        <div className='app__SupplierPage_boxesDireita'>
          <div className='app__SupplierPage_boxesDireita1'>
              <div className='app__SupplierPage_boxesDireita1Nmr'>
                <div className='app__SupplierPage_boxesDireita1Nmr1'>
                  <p>Hoje</p>
                  <p><mark class="orange">2</mark> vendas</p>
                </div>
                <div className='app__SupplierPage_boxesDireita1Nmr2'>
                  <p>Este mês</p>
                  <p><mark class="orange">43</mark> vendas</p>
                </div>
              </div>
              <p>Vendas Recentes</p>
              <div className='app__SupplierPage_boxesDireita1Vend'>

              </div>

            </div>
          
        </div>





        </div>





    </div>
    
    <Footer></Footer>
    </>
  );

}

export default SupplierAdd;