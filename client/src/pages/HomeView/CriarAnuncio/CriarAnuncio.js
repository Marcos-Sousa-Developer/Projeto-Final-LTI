import React, {useState, useEffect} from 'react';
import {FiChevronRight, FiChevronLeft} from 'react-icons/fi';

import {NavbarSupplier, Footer, SubHeading, InputField} from '../../../components/index';
import GeneralInfo from './GeneralInfo';
import ProductInfo from './ProductInfo';
import { categories } from '../../../utilities/categories';
import "./CriarAnuncio.css";
import "../../../components/InputField/InputField.css";

function CriarAnuncio() {
    // Scroll to top on page change
    const useEffectd = () => {
        window.scrollTo(0, 0);
    };

    // Form step logic
    const [page, setPage] = useState(0);

    const [formData, setFormData] = useState({
        titulo: "",
        preco: 0,
        descricao: "",
        categoria: [],
        nome: "",
        email: "",
        telemovel: 0,
        localizacao: "",
    });

    const FormTitles = ["Dados Gerais", "Detalhes do Produto"];

    const PageDisplay = () => {
      if (page === 0) {
        return <GeneralInfo formData={formData} setFormData={setFormData} />;
      } else {
        return <ProductInfo formData={formData} setFormData={setFormData} />;
      }
    };

    return (
    <>
        <NavbarSupplier></NavbarSupplier>
        <div className='app__anuncio main__container'>
            <SubHeading title="Criar anúncio"></SubHeading>
            <form onSubmit={() => {console.log(formData)}} className='app__anuncio_content' id='anuncio_form' style={{marginTop:'1rem'}}>
                <p>{FormTitles[page]}</p>
                <div className='app__anuncio_inputArea'>
                    <div className='app__anuncio_progressBar'>
                        <span>
                            {page == 0 ? '50%' : '100%'}
                        </span>
                        <div style={{ width: page == 0 ? "50%"  : "100%" }}></div>
                    </div>
                    {PageDisplay()}
                </div>
                <div className='app__anuncio_content_stepBtns' style={{ justifyContent: page == 0 ? "flex-end" : "space-between"}}>
                    {page == 0 ?
                            <button type='button' onClick={() => {setPage((currPage) => currPage + 1); useEffectd()}} className='main__action_btn'>Continuar <FiChevronRight></FiChevronRight></button>
                    :
                        <>
                            <button type='button' onClick={() => { setPage((currPage) => currPage - 1); useEffectd(); }} className='main__action_btn'><FiChevronLeft></FiChevronLeft> Anterior</button>
                            <button type='button' onClick={() => {console.log(formData)}} className='main__action_btn'>Publicar <FiChevronRight></FiChevronRight></button>
                        </>
                    } 
                </div>
            </form>
        </div>
        <Footer></Footer>
    </>
  )
}

export default CriarAnuncio