import React, {useState, useEffect} from 'react';
import {FiChevronRight, FiChevronLeft} from 'react-icons/fi';
import postToDB from '../../../hooks/postToDB';
import getFromDB from '../../../hooks/getFromDB';
import getAllFromDB from '../../../hooks/getAllFromDB';
import {teste} from '../../../utilities/teste';

import {NavbarSupplier, Footer, SubHeading, InputField} from '../../../components/index';
import GeneralInfo from './GeneralInfo';
import ProductInfo from './ProductInfo';
import { categorias, categories } from '../../../utilities/categorias';
import "./styles/CriarAnuncio.css";
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
        preco: 0.00,
        descricao: "",
        data_producao: new Date().toISOString().split('T')[0],
        categoria: "",
        subcategoria: "",
        subsubcategoria: "",
        features: [],
        sub_features: [],
        email: "",
        telemovel: "",
        search: false,
    });

    const [EAN, setEAN] = useState(null);
    const [idsubsubcategory, setIdSubSubCategory] = useState(null);

    const [didMount, setDidMount] = useState(false)

    async function getProduct(ean){

        let params = {
            EAN: EAN,
          };

        let product = await getAllFromDB("/products/", params);
        let idsubsubcategory = product[0].id_subsubcategory;

        //IR BUSCAR O NOME DA CATEGORIA, SUB E SUBSUB

        let subSubCategory = await getFromDB("/subsubcategories/" + idsubsubcategory);
        let subSubCategoriaNome = subSubCategory[0].name;
        let subCategoriaId = subSubCategory[0].id_subcategory;

        let subCategory = await getFromDB("/subcategories/" + subCategoriaId)
        let subCategoriaNome = subCategory[0].name;
        let categoriaId = subCategory[0].id_category;

        let category = await getFromDB("/categories/" + categoriaId);
        let categoriaNome = category[0].name;

        //IR BUSCAR AS FEATURES

        let featuresEmpty = null;
        let subFeaturesEmpty = null;

        teste.map((category) => {  
        if (category.name === categoriaNome) {
            featuresEmpty = category.features;
            category.subcategories.map((subcategory) => {
                if (subcategory.name === subCategoriaNome) {
                    subFeaturesEmpty = subcategory.features;
                }
            });
        }
        });

        setFormData({
            search: true,
            categoria: categoriaNome,
            subcategoria: subCategoriaNome,
            subsubcategoria: subSubCategoriaNome,
            features: featuresEmpty,
            sub_features: subFeaturesEmpty,
        });

        setEAN(ean);
        setIdSubSubCategory(idsubsubcategory);
      }

    useEffect(()=>{
        let url = new URL(window.location)
        let ean = url.searchParams.get("EAN")
        if (ean != null){
            getProduct(ean)
        }
        setDidMount(true)
    }, [])

    const FormTitles = ["Detalhes do Produto", "Detalhes do Anúncio"];

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
        } else {
        if(isNaN(price)){
          // O preço tem de ser um numero
          return "Deve de inserir um preço válido";
        }
        return "OK"
        } 
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
            // A categoria não pode ser nula
            return "Deve de inserir uma categoria válida";
        }
        return "OK"
    }

    async function verifyEmail(email){
      //Retorna OK se estiver tudo bem, se não, retorna o erro 
      //não pode ser null
      if(email == "" || email == null) {
          // A categoria não pode ser nulo
          return "Deve de inserir um email válido";
      }else {
        if(!email.includes("@")){
          return "Deve de inserir um email válido";
        }
        let i = email.indexOf("@")
        if(email[i+1] == undefined){
          return "Deve de inserir um email válido";
        }
        return "OK"
      }
    }

    async function verifyMobilePhone(mobile_number){
      //Retorna OK se estiver tudo bem, se não, retorna o erro 
      //não pode ser null
      //tem de ter 9 lagarismos e o primeiro tem de ser 9
      if(mobile_number == "" || mobile_number == null) {
          // O número de telemóvel não pode ser nulo
          return "Deve de inserir um número de telemóvel válido";
      }else {
        if(mobile_number.length != 9){
          return "O número de telemóvel deve ter 9 dígitos";
        }
        for (var i = 0; i < mobile_number.length; i++) {
          var digit = parseInt(mobile_number[i], 10);
          if (isNaN(digit)) {
            // O número de telemóvel deve conter apenas dígitos numéricos
            return "O número de telemóvel deve conter apenas dígitos numéricos";
          }
        }
        if(mobile_number[0] != "9"){
          //O número de telemóvel deve de começar pelo dígito 9
          return "O número de telemóvel deve de começar pelo dígito 9";
        }
      return "OK"
      }
    }

    async function verifyProductionDate(dateString){
      //Retorna OK se estiver tudo bem, se não, retorna o erro 
      //Não é null
      //a data tem de ser mais antiga que a data atual

      if(dateString == "" || dateString == null) {
        // A data de produção não pode ser nula
        return "Deve de inserir uma data de produção válida";
      }

      var date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // A data de produção tem de ser válida
        return "Deve de inserir uma data de produção válida";
      }

      var today = new Date();
      if((date < today) == false){
        //"A data de produção deve de ser anterior à data de hoje"
        return "A data de produção deve de ser anterior ou igual à data de hoje";
      } else {
        return "OK";
      }
    }

    async function verifyEAN(EAN){
      //Retorna OK se estiver tudo bem, se não, retorna o erro 
      //Não é null
      //Não pode existir na bd ainda
      //Tem 8 ou 13 algarismos e são todos numéricos

      if(EAN == "" || EAN == null) {
        // O EAN não pode ser nulo
        return "Deve de inserir um EAN válido";
      }

      let product = await getFromDB("/products/" + EAN);
      
      if(product.length == 1){
        return "O produto com o EAN inserido já se encontra criado";
      }

      if (EAN.length !== 8 && EAN.length !== 13) {
        // O EAN deve ter 8 ou 13 dígitos
        return "O EAN deve ter 8 ou 13 dígitos";
      }
      
      var checksum = 0;
      for (var i = 0; i < EAN.length - 1; i++) {
        var digit = parseInt(EAN[i], 10);
        if (isNaN(digit)) {
          // O EAN deve conter apenas dígitos numéricos
          return "O EAN deve conter apenas dígitos numéricos";
        }
        checksum += (i % 2 === 0) ? digit * 3 : digit;
      }
      
      var lastDigit = parseInt(EAN[EAN.length - 1], 10);
      if (isNaN(lastDigit)) {
        // O EAN deve conter apenas dígitos numéricos
        return "O EAN deve conter apenas dígitos numéricos";
      } else {
        return "OK";
      }

      //if(((10 - (checksum % 10)) === lastDigit) == true){
      //  return "OK" ;
      //} else{
      //  return "EAN inválido";
      //}
    }

    async function verifyFeatures(features){
      //Retorna OK se estiver tudo bem, se não, retorna o erro 
      
      if(features != undefined){
        for (let feature in features) {
            if(typeof features[feature] != "string"){
              return "Deve de escolher uma opção no campo (" + feature + ") das características do produto";
            }
        }
      }
      return "OK"
    }

    async function verifySubFeatures(subFeatures){
      //Retorna OK se estiver tudo bem, se não, retorna o erro 

      if(subFeatures != undefined){
        for (let feature in subFeatures) {
            if(typeof subFeatures[feature] != "string"){
              return "Deve de escolher uma opção no campo (" + feature + ") das características do produto";
            }
        }
      }
      return "OK"
    }

    const submit = async () => {

        console.log(formData)

        let validTitle = await verifyTitle(formData.titulo);
        let validPrice = await verifyPrice(formData.preco);
        let validDescription = await verifyDescription(formData.descricao);
        let validCategory = await verifyCategory(formData.categoria);
        let validEmail = await verifyEmail(formData.email);
        let validMobilePhone = await verifyMobilePhone(formData.telemovel);
        let validProductionDate = await verifyProductionDate(formData.data_producao);
        let validFeature = await verifyFeatures(formData.features[0]);
        let validSubFeature = await verifySubFeatures(formData.sub_features[0]);

        let validEAN = null;
        if(formData.search){
          validEAN = await verifyEAN(EAN);
        }

        /*
        console.log(validTitle);
        console.log(validPrice);
        console.log(validDescription);
        console.log(validCategory);
        console.log(validEmail);
        console.log(validMobilePhone);
        console.log(validProductionDate);
        console.log(validEAN);
        console.log(validFeature);
        console.log(validSubFeature);
        */
        
        //--------------TESTE--------------------

        let ttP = {};
        let ttA = {};

        if(formData.features[0] != undefined){
          for (let feature in formData.features[0]) {
            ttA[feature] = formData.features[0][feature];
            if(feature != "Local de Produção" && feature != "Validade" && feature != "Estado" && feature != "Garantia"){
              ttP[feature] = formData.features[0][feature];
            }
          }
        }

        if(formData.sub_features[0] != undefined){
          for (let feature in formData.sub_features[0]) {
            ttA[feature] = formData.sub_features[0][feature];
            if(feature != "Género" && feature != "Validade" && feature != "Estado" && feature != "Garantia"){
              ttP[feature] = formData.sub_features[0][feature];
            }
          }
        }

        console.log(ttP)
        console.log(ttA)



        //if(EAN != null){
          let params = {
            EAN: "6843603708353",
          };

          let EANexist = await getAllFromDB("/products/", params);

          if(EANexist == "There is no product in the database"){
            //CRIA O PRODUTO
            //CRIA O ANUNCIO
          } else{
            //verifica se os inputs são correspondentes (id_subsub, features, ...)
              //Caso seja, só cria anuncio
              //Caso não seja, dá um erro a dizer que o produto inserido não é válido e substitui pelo correto ??
            //CRIA O ANUNCIO
          } 

          
        //}

        //------------------------------------------

        let product;
        let ad;

        if(validTitle == "OK" && validPrice == "OK" && validDescription == "OK"  && validCategory == "OK" && validEmail == "OK" && validMobilePhone == "OK"  && validProductionDate == "OK" && validFeature == "OK" && validSubFeature == "OK" &&  (validEAN == "OK" || validEAN == null)){

            let featuresDBproduct = {}; 
            let featuresDBad = {};

            //adiciona as features
            if(formData.features[0] != undefined){
              for (let feature in formData.features[0]) {
                featuresDBad[feature] = formData.features[0][feature];
                if(feature != "Local de Produção" && feature != "Estado" && feature != "Garantia"){
                  featuresDBproduct[feature] = formData.features[0][feature];
                }
              }
            }

            //adiciona as sub
            //NAO ESTA A GUARDAR SUB NO FORM DATA (VERIFICAR)
            if(formData.sub_features[0] != undefined){
              for (let feature in formData.sub_features[0]) {
                ttA[feature] = formData.sub_features[0][feature];
                if(feature != "Género"){
                  ttP[feature] = formData.sub_features[0][feature];
                }
              }
            }

            //verifica se o produto com o EAN dado existe
            if(EAN != null){
              let params = {
                EAN: "6843603708353",
              };

              let EANexist = await getAllFromDB("/products/", params);

              if(EANexist == "There is no product in the database"){
                //CRIA O PRODUTO
                //CRIA O ANUNCIO
              } else{
                //verifica se os inputs são correspondentes (id_subsub, features, ...)
                  //Caso seja, só cria anuncio
                  //Caso não seja, dá um erro a dizer que o produto inserido não é válido e substitui pelo correto ??
                //CRIA O ANUNCIO
              } 
            }


            //ATÉ AQUI

            product = await postToDB("/products",{
              EAN: EAN,
              production_date: formData.data_producao, //"2019-08-20"
              id_subsubcategory: idsubsubcategory,
              characteristics: JSON.stringify(featuresDBproduct),
            })

            //Ir buscar o id do fornecedor
            let idSupplier;

            //ir buscar o id do produto de cima
            let idproduct;

            ad = await postToDB("/ads",{
                title: formData.titulo,
                price: formData.preco,
                description: formData.descricao,
                extraCharacteristics: featuresDBad,
                supplier_id: idSupplier,
                product_id: idproduct,
              })

        }

        let text = "Não foi possível criar o produto\n";
        if(validTitle == "OK" && validPrice == "OK" && validDescription == "OK" && validCategory == "OK" && validEmail == "OK" && validMobilePhone == "OK" && validProductionDate == "OK" && validFeature == "OK" && validSubFeature == "OK" && (validEAN == "OK" || validEAN == null)){
          text = "OK"
        } else if(validTitle != "OK" || validPrice != "OK" || validDescription != "OK" || validCategory != "OK" || validEmail != "OK" || validMobilePhone != "OK" || validFeature != "OK" || validSubFeature != "OK"  || validProductionDate != "OK" || (validEAN != "OK" && validEAN != null)){
            if(validTitle != "OK" ){
              text += validTitle + "\n"
            }
            if(validPrice != "OK" ){
              text += validPrice + "\n"
            }
            if(validFeature != "OK" ){
              text += validFeature + "\n"
            }
            if(validSubFeature != "OK" ){
              text += validSubFeature + "\n"
            }
            if (validDescription != "OK" ){
              text += validDescription + "\n"
            }
            if(validCategory != "OK" ){
              text += validCategory + "\n"
            }
            if(validEmail != "OK" ){
              text += validEmail + "\n"
            }
            if(validMobilePhone != "OK" ){
              text += validMobilePhone + "\n"
            }
            if(validProductionDate != "OK" ){
              text += validProductionDate + "\n"
            }
            if(validEAN != "OK" && validEAN != null){
              text += validEAN + "\n"
            }
          }
          alert(text)
    }

    return (
    <>
    {
      didMount == false ? (
        <>
          Loading
        </>
      )
      :
      (
      <>
        <NavbarSupplier></NavbarSupplier>
        <div className='app__anuncio main__container'>
            <SubHeading title="Criar anúncio"></SubHeading>
            <form onSubmit={() => {console.log(formData)}} className='app__anuncio_content' id='anuncio_form' style={{marginTop:'1rem'}}>
                <p>{FormTitles[page]}</p>
                <div className='app__anuncio_inputArea'>
                    <div className='app__anuncio_progressBar'>
                        <span>
                            {/*page == 0 ? '50%' : '100%'*/}
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
                            <button type='button' onClick={() => {setPage((currPage) => currPage - 1); useEffectd(); }} className='main__action_btn'><FiChevronLeft></FiChevronLeft> Anterior</button>
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
    </>
  );

}

export default CriarAnuncio