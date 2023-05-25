import React, {useState, useEffect} from 'react';
import {FiChevronRight, FiChevronLeft, FiX, FiChevronDown, FiPlus, FiTrash2 } from 'react-icons/fi';

import postToDB from '../../../hooks/postToDB';
import getFromDB from '../../../hooks/getFromDB';
import getAllFromDB from '../../../hooks/getAllFromDB';
import putToDB from '../../../hooks/putToDB';

import {teste} from '../../../utilities/teste';

import {NavbarSupplier, Footer, SubHeading} from '../../../components/index';
import Features from './Features';
import SubFeatures from './SubFeatures';
import "./styles/CriarAnuncio.css";
import "../../../components/InputField/InputField.css";
import SupplierBar from '../../../components/SupplierBar/SupplierBar';

function CriarAnuncio() {
      
    const [productionUnits, setProductionUnit] = useState([]);

    const [formData, setFormData] = useState({
        EAN: "",
        titulo: "",
        preco: 0.00,
        descricao: "",
        data_producao: new Date().toISOString().split('T')[0],
        categoria: "",
        subcategoria: "",
        subsubcategoria: "",
        id_subsubcategory: "",
        features: [],
        sub_features: [],
        email: "",
        telemovel: "",
        search: false,
        prodUnit: {},
    });

    const [didMount, setDidMount] = useState(false)

    async function getSupplierProdUnit(){
   
      let supplierProdUnits = await getAllFromDB("/productionUnits", {uid_supplier: true})

      if (typeof supplierProdUnits != "string") {
          setProductionUnit(prevState => [...supplierProdUnits])
      }
      const newProdUnitKeys = [];
      supplierProdUnits.map((prodUnit) => {  
        newProdUnitKeys.push(prodUnit.name)
      }); 
      const newProdUnit = {};
      newProdUnitKeys.forEach((key) => {
        newProdUnit[key] = '';
      });


      let supplier = await getFromDB("/suppliers",  {uid: true});

      setFormData({ ...formData, 
        prodUnit: newProdUnit,
        email: supplier[0].email,
        telemovel: supplier[0].mobile_number })
    }

    async function getProduct(ean){

        let paramsProd = {
            EAN: ean,
          };

        let product = await getAllFromDB("/products", paramsProd);
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
        let subFeaturesEmpty = {};

        teste.map((category) => {  
          if (category.name === categoriaNome) {
              featuresEmpty = category.features;
          }
        });

        let prodFeatures = JSON.parse(product[0].characteristics);   

        if (featuresEmpty != null) {
          for(let feature in featuresEmpty[0]){
              if(feature in prodFeatures){
                featuresEmpty[0][feature] = prodFeatures[feature];
              }
          }
        }

        subFeaturesEmpty[0] = prodFeatures;

        setFormData({
            EAN: ean,
            search: true,
            categoria: categoriaNome,
            subcategoria: subCategoriaNome,
            subsubcategoria: subSubCategoriaNome,
            features: featuresEmpty,
            sub_features: prodFeatures,
            id_subsubcategory: idsubsubcategory,
            data_producao: new Date().toISOString().split('T')[0],
        });
    }

    useEffect(()=>{
        let url = new URL(window.location)
        let ean = url.searchParams.get("EAN")
        if (ean != null){
          getProduct(ean)
        }
        getSupplierProdUnit()
        setDidMount(true)
    }, [])

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
        let i = email.indexOf("@")
        if(i == -1 || i == 0){
          return "Deve de inserir um email válido";
        }
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

      let product = await getFromDB("/products/" + EAN);
      
      if(product.length == 1){
        return "O produto com o EAN inserido já se encontra criado";
      }

      if (EAN.length !== 8 && EAN.length !== 13) {
        // O EAN deve ter 8 ou 13 dígitos
        return "O EAN deve ter 8 ou 13 dígitos";
      }

      for (var i = 0; i < EAN.length - 1; i++) {
        var digit = parseInt(EAN[i], 10);
        if (isNaN(digit)) {
          // O EAN deve conter apenas dígitos numéricos
          return "O EAN deve conter apenas dígitos numéricos";
        }
      }
      
      var lastDigit = parseInt(EAN[EAN.length - 1], 10);
      if (isNaN(lastDigit)) {
        // O EAN deve conter apenas dígitos numéricos
        return "O EAN deve conter apenas dígitos numéricos";
      } else {
        return "OK";
      }
      
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

    async function verifyProdUnits(prodUnits){
      //Retorna OK se estiver tudo bem, se não, retorna o erro 

      if(prodUnits != undefined){
        let i = 0;
        for (let prodUnit in prodUnits) {
          if(prodUnits[prodUnit] != ''){
            if(prodUnits[prodUnit] <= 0){
              return "Deve de inserir uma quantidade válida"
            }
          } else {
            i++;
          }
        }
        if(i == Object.keys(prodUnits).length){
          return "Deve de inserir o produto em pelo menos uma unidade de produção"
        }
      }
      return "OK"
    }
    
    async function getIdSubSubCategory(nameSubSubCategory){
      let params = {
        name: nameSubSubCategory,
      };

      let subSubCategory = await getAllFromDB("/subsubcategories/", params);

      return subSubCategory[0].id;
    }


    const submit = async () => {

      let supplier = await getAllFromDB("/suppliers", {uid: true})
      let idUser = supplier[0].id;

        let validEAN = "OK";
        if(formData.EAN != "" && formData.EAN != null) {
          validEAN = await verifyEAN(formData.EAN);
        }
        let validTitle = await verifyTitle(formData.titulo);
        let validPrice = await verifyPrice(formData.preco);
        let validDescription = await verifyDescription(formData.descricao);
        let validCategory = await verifyCategory(formData.categoria);
        let validEmail = await verifyEmail(formData.email);
        let validMobilePhone = await verifyMobilePhone(formData.telemovel);
        let validProductionDate = await verifyProductionDate(formData.data_producao);
        let validFeature = await verifyFeatures(formData.features[0]);
        let validSubFeature = "OK";
        if(formData.sub_features != undefined){
          validSubFeature = await verifySubFeatures(formData.sub_features[0]);
        }
        let validProdUnit = await verifyProdUnits(formData.prodUnit);

        let product;
        let ad;

        let text = "Não foi possível criar o produto\n";
        if(validTitle == "OK" && validPrice == "OK" && validDescription == "OK" && validCategory == "OK" && validEmail == "OK" && validMobilePhone == "OK" && validProductionDate == "OK" && validFeature == "OK" && validSubFeature == "OK" && validProdUnit =="OK" && validEAN == "OK"){

            let featuresDBproduct = {}; 
            let featuresDBad = {};

            //adiciona as features
            if(formData.features[0] != undefined){
              for (let feature in formData.features[0]) {
                featuresDBad[feature] = formData.features[0][feature];
                if(feature != "Local de Produção" && feature != "Validade" && feature != "Estado" && feature != "Garantia"){
                  featuresDBproduct[feature] = formData.features[0][feature];
                }
              }
            }
            //adiciona as sub
            if(formData.sub_features != undefined){
              for (let feature in formData.sub_features) {
                featuresDBad[feature] = formData.sub_features[feature];
                if(feature != "Género" && feature != "Validade" && feature != "Estado" && feature != "Garantia"){
                  featuresDBproduct[feature] = formData.sub_features[feature];
                }
              }
            }

            let idSubSubCategory = await getIdSubSubCategory(formData.subsubcategoria);

            //Quando existe EAN
            if(formData.EAN != null && formData.EAN != ""){
              let params = {
                EAN: formData.EAN,
              };

              let EANexist = await getAllFromDB("/products/", params);


              if(EANexist == "There is no product in the database"){
                //CRIA O PRODUTO
                product = await postToDB("/products",{
                  EAN: formData.EAN,
                  id_subsubcategory: idSubSubCategory,
                  status: 0,
                  characteristics: JSON.stringify(featuresDBproduct),
                })

                //ir buscar o id do produto de cima
                let idProduct = product.insertId
                //CRIA O ANUNCIO
                ad = await postToDB("/ads",{ 
                  title: formData.titulo,
                  description: formData.descricao,
                  email: formData.email,
                  mobile_number: formData.telemovel,
                  extraCharacteristics: JSON.stringify(featuresDBad),
                  status: "ativo",
                  production_date: formData.data_producao,
                  price: formData.preco,
                  supplier_id: idUser,
                  product_id: idProduct,
                  created_at: new Date().toISOString().split('T')[0],
                  category_name: formData.categoria,
                  subcategory_name: formData.subcategoria,
                  subsubcategory_name: formData.subsubcategoria,
                })
              }else{
                product = EANexist[0]

                let idProduct = product.id;

                let prodCharacStart = JSON.parse(product.characteristics)
                let prodCharacEnd = featuresDBproduct
                let update = false;
                for(let feature in prodCharacStart){
                  if(prodCharacStart[feature] != prodCharacEnd[feature]){
                    update = true;
                  }
                }
                if(update == true){
                  product = await putToDB("/products/" + product.id,{
                    EAN: formData.EAN,
                    id_subsubcategory: idSubSubCategory,
                    status: 0,
                    characteristics: JSON.stringify(featuresDBproduct),
                  })
                }

                ad = await postToDB("/ads",{ 
                  title: formData.titulo,
                  description: formData.descricao,
                  email: formData.email,
                  mobile_number: formData.telemovel,
                  extraCharacteristics: JSON.stringify(featuresDBad),
                  status: "ativo",
                  production_date: formData.data_producao,
                  price: formData.preco,
                  supplier_id: idUser,
                  product_id: idProduct,
                  created_at: new Date().toISOString().split('T')[0],
                  category_name: formData.categoria,
                  subcategory_name: formData.subcategoria,
                  subsubcategory_name: formData.subsubcategoria,
                })
              } 
            } else {
              //Quando não existe EAN
              product = await postToDB("/products",{
                id_subsubcategory: idSubSubCategory,
                status: 0,
                characteristics: JSON.stringify(featuresDBproduct),
              })
    
              //ir buscar o id do produto de cima
              let idProduct = product.insertId
    
              //CRIA O ANUNCIO
              ad = await postToDB("/ads",{ 
                title: formData.titulo,
                description: formData.descricao,
                email: formData.email,
                mobile_number: formData.telemovel,
                extraCharacteristics: JSON.stringify(featuresDBad),
                status: "ativo",
                production_date: formData.data_producao,
                price: formData.preco,
                supplier_id: idUser,
                product_id: idProduct,
                created_at: new Date().toISOString().split('T')[0],
                category_name: formData.categoria,
                subcategory_name: formData.subcategoria,
                subsubcategory_name: formData.subsubcategoria,
              })
            }
          
            let idAd = ad.insertId

            console.log(productionUnits)

            for (let i = 0; i < Object.entries(formData.prodUnit).length; i++) {
              const [key, value] = Object.entries(formData.prodUnit)[i];
              if (value > 0) {
                let productProductionUnit = await postToDB("/productProductionUnits", {
                  quantity: value,
                  fee: 0,
                  productionUnit_id: productionUnits[i].id,
                  ad_id: idAd,
                  title: formData.titulo,
                  price: formData.preco,
                });
              }
            }

            //VERIFICAR A CAPACIDADE DA UNIDADE DE PRODUCAO
            //IR BUSCAR TODOS OS PRODUTOS NAQUELA UNIDADE E SOMA AS QUANTIDADES
            //SE CONSEGUIR ADICIONAR TODOS ADICIONA
            //SE NÃO, DÁ UM ALERT

            text = "Anuncio concluído"
        } else if(validTitle != "OK" || validPrice != "OK" || validDescription != "OK" || validCategory != "OK" || validEmail != "OK" || validMobilePhone != "OK" || validFeature != "OK" || validSubFeature != "OK" || validProductionDate != "OK" || validProdUnit != "OK" || validEAN != "OK"){
            if(validEAN != "OK"){
              text += validEAN + "\n"
            }  
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
            if(validProdUnit != "OK"){
              text += validProdUnit + "\n"
            }
        }
        alert(text)
    }
  
    //-----------------------------------------------------------------------------  

    //Categoria  
    const Category = ({ category, onClick }) => {
      return (
        <div className='app__pointer' style={{marginBottom:'.75rem'}} onClick={() => onClick(category)}>
          <a className='app__text_effect'>{category}</a>
        </div>
      );
    };
    //-----------------------------------------------------------------------------

    //Detalhes da Categoria
    const CategoryDetails = ({ category, onClick }) => {

        const [clickedSubcategory, setClickedSubcategory] = useState(null);

        return (
            <div className='category_details'>
                <div className='app__pointer category_details_header' onClick={onClick}>
                    <button><FiChevronLeft fontSize={20} color="black"></FiChevronLeft></button> 
                    <p>{category.name}</p>
                </div>
                <div className='category_details_body'>
                    <div className='category_details_body_1'>
                        {category.subcategories.map((subcategory, i) => (
                            <li key={i}>
                            <div>
                                <div className={`app__pointer category_details_body_1_sub ${clickedSubcategory === i ? ' clickedSubcategory' : ''}`} onClick={() => setClickedSubcategory(i)}>
                                    <p>{subcategory.name}</p>
                                    <FiChevronRight className='subcategory_advance'/>
                                </div>
                                {clickedSubcategory === i && (
                                <div className='subsubcategories' style={{display:'none'}}>
                                    <div className='subsubcategories_content'>
                                    {subcategory.subsubcategories.map((subsubcategory, j) => (
                                        <li key={j}>
                                        <label className='app__pointer'>
                                            <p style={{fontSize:'14px', margin: '0'}}>{subsubcategory}</p>
                                            <input 
                                            style={{display:'none'}}
                                            type="radio" 
                                            name="CriarAnuncioRadio" 
                                            value={[category.name, subcategory.name, subsubcategory]} 
                                            onChange={(e) => {setFormData({ ...formData, categoria: e.target.value })}}
                                            onClick={toggleActiveModal}>
                                            </input> 
                                        </label>
                                        </li>
                                    ))}
                                    </div>
                                </div>
                                )}
                            </div>
                            </li>
                        ))}
                    </div>
                    <div className='category_details_body_2'>
                        <div className='subsubcategories'>
                            <div className='subsubcategories_content'>
                            {category.subcategories.map((subcategory, i) => (
                                clickedSubcategory === i && (
                                subcategory.subsubcategories.map((subsubcategory, j) => (
                                    <li key={j}>
                                        <label className='app__pointer'>
                                            <p className='app__text_effect'>{subsubcategory}</p>
                                            <input 
                                            style={{display:'none'}}
                                            type="radio" 
                                            name="CriarAnuncioRadio" 
                                            value={subsubcategory} 
                                            onChange={(e) => {
                                                const subcategoria = subcategory.name;
                                                const subsubcategoria = e.target.value;
                                                let sub_features = {};

                                                if (subsubcategoria === "Alimentação") {
                                                    sub_features = { Validade: ''};
                                                }

                                                if (subcategoria === "Calçado" || subcategoria === "Roupinhas"){
                                                    sub_features = { Gender: ''};
                                                }

                                                if (subsubcategoria === "Móveis") {
                                                    sub_features = { Largura: '', Comprimento: ''};
                                                }

                                                if (subsubcategoria === "Computadores") {
                                                    sub_features = { Processador: '', MemoryRAM: '', OperatingSystem: '', StorageAmount: '', StorageType: '' };
                                                }

                                                if (subsubcategoria === "Tv" || subsubcategoria === "Projectores" || subsubcategoria === "Monitores" ){
                                                    sub_features = {Resolution: '', ScreenSize: ''}
                                                }

                                                if (subsubcategoria === "Portáteis"){
                                                    sub_features = {Processador: '', MemoryRAM: '', OperatingSystem: '', StorageAmount: '', StorageType: '', Resolution: '', ScreenSize: '' }
                                                }

                                                if (subsubcategoria === "Software"){
                                                    sub_features = {SoftwareType: ''}
                                                }

                                                if (subsubcategoria === "Armazenamento" || subsubcategoria === "Servidores"){
                                                    sub_features = {StorageAmount: ''}
                                                }

                                                if (subsubcategoria === "Discos Externos"  || subsubcategoria === "Discos Internos"){
                                                    sub_features = {StorageType: '', StorageAmount: ''}
                                                }

                                                if (subsubcategoria === "Telemóveis" || subsubcategoria === "Tablets" ){
                                                    sub_features = {OperatingSystem: ''}
                                                }

                                                if (subcategoria === "Roupa"){
                                                    sub_features = {ClothingSize: ''}
                                                }

                                                if (subcategoria === "Calçado"){
                                                    sub_features = {ShoeSize: ''}
                                                }

                                                let params = {
                                                    name: subsubcategoria,
                                                };

                                                setFormData({
                                                    ...formData, 
                                                    categoria: category.name,
                                                    subcategoria: subcategoria,
                                                    subsubcategoria: subsubcategoria,
                                                    features: category.features,
                                                    sub_features: [sub_features]
                                                });
                                            }}
                                            onClick={toggleActiveModal}>
                                            </input> 
                                        </label>
                                    </li>
                                ))
                                )
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    //-----------------------------------------------------------------------------

    //Modal
    const Modal = ({ className }) => {
        const [selectedModal, setSelectedModal] = useState(null);

        const toggleModal = (i) =>{
          if (selectedModal === i){
            return setSelectedModal(null);
          }
          
          setSelectedModal(i);
        }

        const [selectedCategory, setSelectedCategory] = useState(null);

        return(
            <div className={ `app__anuncio_modal ${className}` }>
                <div className="app__anuncio_modal_content">
                    <div className="app__anuncio_modal_header">
                        <p>Escolha uma categoria</p>
                        <FiX fontSize={30} color="black" className='app__pointer app__icon_effect' onClick={toggleActiveModal}></FiX>
                    </div>
                    <div className="app__anuncio_modal_body">
                        {selectedCategory ? (
                            <CategoryDetails category={selectedCategory} onClick={() => setSelectedCategory(null)}/>
                        ) : (
                            teste.map((category, index) => (
                                <Category key={index} category={category.name} onClick={() => setSelectedCategory(category)}/>
                            ))
                        )}
                    </div>
                </div>
            </div>
        )
    }
    //-----------------------------------------------------------------------------

    //Modal tooggle
    const ButtonToggleModal = (props) => {
        return(
            <div className='buttonToggleModal_area'>
                <p className='app__pointer' id="modal-toggler" onClick={ props.onClick }> {formData.categoria.length > 0 ? 'Alterar ' : 'Escolher '}<FiChevronDown></FiChevronDown></p> 
                <div className='buttonToggleModal_area_selected_category'>
                    {formData.categoria.length > 0 && 
                        <div>
                            <span>{formData.categoria}</span>
                            <p>{formData.subsubcategoria}</p>
                        </div>
                    }
                </div>
            </div>
        )
    }
    //-----------------------------------------------------------------------------

    //Modal overlay
    const OverlayModal = ({ className, onClick}) => {
        return(
            <div className={ className } onClick={ onClick }></div>
        )
    }
    //-----------------------------------------------------------------------------

    //Para ativar o modal
    const [activeModal, setActiveModal] = useState(false);
    const toggleActiveModal = () => setActiveModal(!activeModal);
    //-----------------------------------------------------------------------------   

    //Descrição
    const [text, setText] = useState('');
    //-----------------------------------------------------------------------------

    //Imagens
    const [selectedImages, setSelectedImages] = useState([]);

    const onSelectFile = (event) => {
      const selectedFiles = event.target.files;
      const selectedFilesArray = Array.from(selectedFiles);

      const imagesArray = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });

      if (selectedImages.length + imagesArray.length <= 8) {
        setSelectedImages((previousImages) => previousImages.concat(imagesArray));
      }
      event.target.value = ""; // for bug in chrome
    }
    //-----------------------------------------------------------------------------

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
            <br></br>
            <SupplierBar></SupplierBar>
            <form onSubmit={() => {console.log(formData)}}>
              <div className='app__anuncio_produto'>
                <p className='title'>Produto</p>
                <div className='app__anuncio_produto_content'>
                  <div className='produto_info'>
                    <div className='inputField'>
                      <p>EAN</p>
                      <input type='text' value={formData.EAN} onChange={(e) => {setFormData({ ...formData, EAN: e.target.value });}}/>
                    </div>
                    <div className='app__anuncio_produto_content_categoria'>
                      <p>Categoria *</p>
                      {formData.categoria != "" && formData.subcategoria != "" && formData.subsubcategoria != "" && formData.search ? 
                        <>
                          <p>{formData.categoria}</p>
                          <p>{formData.subcategoria}</p>
                          <p>{formData.subsubcategoria}</p>
                        </>
                      :
                        <>
                          <ButtonToggleModal onClick={toggleActiveModal}/>
                          <OverlayModal className={ activeModal ? 'overlayModal activeModal' : 'overlayModal'} onClick={toggleActiveModal}/>
                          <Modal className={ activeModal ? 'activeModal' : null}/>
                        </>
                      } 
                    </div>
                  </div>
                  <Features formData={formData} setFormData={setFormData}></Features>
                  <SubFeatures formData={formData} setFormData={setFormData}></SubFeatures>
                </div>
              </div>
              <div className='app__anuncio_anuncio'>
                <p className='title'>Anúncio</p>
                <div className='app__anuncio_anuncio_content'>
                  <div className='inputField'>
                    <p>Título *</p>
                    <input type='text' value={formData.titulo} placeholder='Título do anúncio' required onChange={(e) => {setFormData({ ...formData, titulo: e.target.value });}}/>
                  </div>
                  <div className='' style={{display: 'flex'}}>
                    <div className='inputField'>
                      <p>Preço (€) *</p>
                      <input type='number' value={formData.preco} step="0.01" min="0" required onChange={(e) => {setFormData({ ...formData, preco: e.target.value });}}/>
                    </div>
                    <div className='inputField' style={{marginLeft:'2rem'}}>
                      <p>Data de Produção</p>
                      <input type='date' value={formData.data_producao || ""} onChange={(e) => {setFormData({ ...formData, data_producao: e.target.value });}}/>
                    </div>
                  </div>
                  <div className='app__anuncio_description_section'>
                      <p style={{marginTop:'1rem'}}>Descrição *</p>
                      <textarea 
                          style={{width:'100%', maxHeight: '170px', minHeight:'120px', resize:'vertical', outline:'none', border: '3px solid #EEEEEE', borderRadius:'10px', padding:'0.25rem 0.5rem'}} 
                          form='anuncio_form' 
                          maxLength="600" 
                          placeholder='Indique alguns detalhes sobre o seu produto'
                          onInput={(e) => {
                              setText(e.target.value);
                              setFormData({ ...formData, descricao: e.target.value })
                          }}>
                      </textarea>
                      <p style={{fontSize: '.75rem', textAlign:'right', margin: '0'}}>{text.length + '/600'}</p>
                  </div>
                  <div className='app__anuncio_image_section'>
                      <p>Imagens <span style={{fontSize: '.75rem'}}>(máx. 8)</span> *</p>
                      <div className='app__anuncio_image_section-content'>
                          <div className='app__anuncio_images_selected'>
                              {selectedImages.length < 8 &&
                                  <label className='app__anuncio_image_input app__pointer'>
                                      <div>
                                          <FiPlus style={{textAlign: 'center'}}></FiPlus>
                                      </div>
                                      <input type="file" accept="image/*" multiple onChange={onSelectFile}/>
                                  </label>
                              }
                              {selectedImages &&
                                  selectedImages.map((image, index)=>{
                                      return(
                                          <div key={image} className='app__anuncio_image_selected'>
                                              <img src={image} alt='' className='app__anuncio_image_selected_img'/>
                                              <FiX className='app__anuncio_image_selected_deleteBtn app__pointer' onClick={() => setSelectedImages(selectedImages.filter((e) => e !== image))}></FiX>
                                          </div>
                                      )
                                  })
                              }
                          </div>
                          <div style={{display:'flex', marginTop:'1rem'}}>
                              {selectedImages.length > 0 &&
                                  <span className='app__anuncio_image_sectionBtn app__text_effect app__pointer' onClick={() => setSelectedImages([])}>limpar tudo <FiTrash2></FiTrash2></span>
                              }
                              {selectedImages.length === 8 &&
                                  <p style={{margin: '.25rem 0 0 0', color: '#EB5C1F', fontSize:'12px'}}>Atingiu o limite de imagens!</p>
                              }
                          </div>
                      </div>
                  </div>     
                </div>
              </div>
              <div className='app__anuncio_supplier-prodUnit'>
                <div className='app__anuncio_supplier'>
                  <p className='title'>Anunciante</p>
                  <div className='app__anuncio_supplier_content'>
                    <div className='inputField'>
                        <p>Telemóvel *</p>
                        <input type='tel' required value = {formData.telemovel} onChange={(e) => {setFormData({ ...formData, telemovel: e.target.value });}}/>
                    </div>
                    <div className='inputField'>
                        <p>Email *</p>
                        <input type='email' required value = {formData.email} onChange={(e) => {setFormData({ ...formData, email: e.target.value });}}/>
                    </div> 
                  </div>
                </div>    
                <div className='app__anuncio_prodUnit'>
                  <p className='title'>Unidade Produção</p>
                  <div className='app__anuncio_prodUnit_content'>
                    <table>
                      <thead>
                        <tr>
                          <th>Quantidade</th>
                          <th>Nome</th>
                          <th>Localização</th>
                        </tr>
                      </thead>
                      <tbody>
                      {productionUnits.map((productionUnit) => { 
                        return ( 
                          <tr>
                          <td><div className='inputField'><input type="number" min={0} onChange={(e) => {setFormData({ ...formData, prodUnit: {...formData.prodUnit, [productionUnit.name]: e.target.value }})}}></input></div></td>
                          <td>{productionUnit.name}</td>
                          <td>{productionUnit.location}</td>
                        </tr>
                        );
                      })}
                       </tbody> 
                    </table>
                  </div>
                </div>
              </div>
              <div style={{textAlign: 'right'}}>
                <button type='button' onClick={() => {submit()}} className='main__action_btn app__anuncio_submit_btn'>Publicar <FiChevronRight></FiChevronRight></button>
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