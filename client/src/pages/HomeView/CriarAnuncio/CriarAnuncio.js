import React, {useState, useEffect} from 'react';
import {FiChevronRight, FiChevronLeft} from 'react-icons/fi';

import {NavbarSupplier, Footer, SubHeading, InputField} from '../../../components/index';
import GeneralInfo from './GeneralInfo';
import ProductInfo from './ProductInfo';
import SupplierInfo from './SupplierInfo';
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
        categoria: "",
        nome: "",
        email: "",
        telemovel: 0,
        localizacao: "",
    });

    const FormTitles = ["Dados Gerais", "Detalhes do Produto", "Dados de Contacto"];

    const PageDisplay = () => {
      if (page === 0) {
        return <GeneralInfo formData={formData} setFormData={setFormData} />;
      } else if (page === 1) {
        return <ProductInfo formData={formData} setFormData={setFormData} />;
      } else {
        return <SupplierInfo formData={formData} setFormData={setFormData} />;
      }
    };

    return (
    <>
        <NavbarSupplier></NavbarSupplier>
        <div className='app__anuncio main__container'>
            <SubHeading title="Criar anúncio"></SubHeading>
            <div className='app__anuncio_content' id='anuncio_form' style={{marginTop:'1rem'}}>
                <p>{FormTitles[page]}</p>
                <div className='app__anuncio_inputArea'>
                    <div className='app__anuncio_progressBar'>
                        <span style={{color: page == 0 ? 'black' : 'white', backgroundColor: page == 0 ? 'white' : 'rgba(235, 92, 31, 0.1)'}}>
                            {page == 0 ? '30%' : page == 1 ? '70%' : '100%'}
                        </span>
                        <div style={{ width: page == 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }}></div>
                    </div>
                    {PageDisplay()}
                </div>
                <div className='app__anuncio_content_stepBtns' style={{ justifyContent: page == 0 ? "flex-end" : "space-between"}}>
                    <button
                        disabled={page == 0}
                        onClick={() => {
                            setPage((currPage) => currPage - 1);
                            useEffectd();
                        }}
                        className='main__action_btn' style={{display: page == 0 ? 'none' : 'inline'}}
                    ><FiChevronLeft></FiChevronLeft> Anterior</button>
                    <button
                        onClick={() => {
                            if (page === FormTitles.length - 1) {
                                alert("FORM SUBMITTED");
                                console.log(formData);
                            } else {
                                setPage((currPage) => currPage + 1);
                                useEffectd();
                            }
                        }}
                        className='main__action_btn'
                    >{page === FormTitles.length - 1 ? "Publicar " : "Continuar "}<FiChevronRight></FiChevronRight></button>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </>
  )
}

export default CriarAnuncio