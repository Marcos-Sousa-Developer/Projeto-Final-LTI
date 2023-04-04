import React, {useState, useEffect} from 'react';
import {FiChevronRight, FiChevronLeft} from 'react-icons/fi';

import {NavbarSupplier, Footer, SubHeading, InputField} from '../../../components/index';
import GeneralInfo from './GeneralInfo';
import ProductInfo from './ProductInfo';
import { categories } from '../../../utilities/categorias';
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

    async function verifyTitle(title){
        //Retorna OK se estiver tudo bem, se não, retorna o erro 
        //não pode ser null
        if(title == "" || title == null) {
            // O título não pode ser nulo
            return "Deve de inserir um título válido";
        }
        return "OK"
    }

    async function verifyPrice(price){
        //Retorna OK se estiver tudo bem, se não, retorna o erro 
        //não pode ser null
        if(price == "" || price == null) {
            // O preço não pode ser nulo
            return "Deve de inserir um preço válido";
        }
        return "OK"
    }

    async function verifyDescription(description){
        //Retorna OK se estiver tudo bem, se não, retorna o erro 
        //não pode ser null
        if(description == "" || description == null) {
            // A descrição não pode ser nula
            return "Deve de inserir uma descrição válida";
        }
        return "OK"
    }

    async function verifyCategory(category){
        //Retorna OK se estiver tudo bem, se não, retorna o erro 
        //não pode ser null
        if(category == "" || category == null) {
            // A categoria não pode ser nulo
            return "Deve de inserir uma categoria válida";
        }
        return "OK"
    }

    async function verifyName(name){
        //Retorna OK se estiver tudo bem, se não, retorna o erro 
        //não pode ser null
        if(name == "" || name == null) {
            // O nome não pode ser nulo
            return "Deve de inserir um nome válido";
        }
        return "OK"
    }

    const submit = async () => {

        console.log(formData)

        let validTitle = await verifyTitle(formData.titulo);
        let validPrice = await verifyPrice(formData.preco);
        let validDescription = await verifyDescription(formData.descricao);
        let validCategory = await verifyCategory(formData.categoria);
        let validName = await verifyName(formData.nome);

        let ad;
        // Se todos os verifys forem OK, entra 

        //cria produto
        // cria anuncio

        let text = "Não foi possivel criar o produto\n";
        if(validTitle == "OK" && validPrice == "OK" && validDescription == "OK"  && validCategory == "OK" && validName == "OK"){
            text = "OK"
        } else if(validTitle != "OK" || validPrice != "OK" || validDescription != "OK" || validCategory != "OK" || validName != "OK"){
            if(validTitle != "OK" ){
              text += validTitle + "\n"
            }
            if(validPrice != "OK" ){
              text += validPrice + "\n"
            }
            if (validDescription != "OK"){
              text += validDescription + "\n"
            }
            if(validCategory != "OK" ){
              text += validCategory + "\n"
            }
            if(validName != "OK" ){
                text += validName + "\n"
            }
          }
          alert(text)
    }

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
                            <button type='button' onClick={() => {submit()}} className='main__action_btn'>Publicar <FiChevronRight></FiChevronRight></button>
                            {/*colocar type SUBMIT*/}
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