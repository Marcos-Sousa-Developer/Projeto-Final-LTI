import React, {useState, useEffect} from 'react';
import { FiPlus, FiX, FiTrash2, FiChevronUp, FiChevronRight,FiChevronDown } from 'react-icons/fi';

import {NavbarSupplier, Footer, SubHeading, InputField} from '../../../components/index';
import { categories } from '../../../utilities/categories';
import "./CriarAnuncio.css";

const GeneralInfo = ({ formData, setFormData }) => {

    //Descrição
    const [text, setText] = useState('');

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

    //Modal
    const Modal = ({ className }) => {
        const [selectedModal, setSelectedModal] = useState(null);
    
        const toggleModal = (i) =>{
          if (selectedModal === i){
            return setSelectedModal(null);
          }
          
          setSelectedModal(i);
        }
    
        return(
            <div className={ `app__anuncio_modal ${className}` }>
                <div className="app__anuncio_modal_content">
                    <p style={{margin: '0', fontWeight:'bold'}}>Escolha uma categoria</p>
                    <FiX fontSize={30} color="black" className='app__pointer app__icon_effect' onClick={toggleActiveModal}></FiX>
                    <div className="app__anuncio_modal_navs">
                        <ul>
                            {categories.map((category, i) => {
                                return (
                                    <div key={category.name} className='app__anuncio_modal_navs_category'>
                                        <div className='app__anuncio_modal_navs_category-title' onClick={()=>toggleModal(i)}>
                                            <p>{category.name}</p>
                                            <span>{selectedModal === i ? <FiChevronUp className='app__anuncio_modal_navs_category-title_up'></FiChevronUp> : <FiChevronRight className='app__anuncio_modal_navs_category-title_right'></FiChevronRight>}</span>
                                        </div>
                                        <div className={selectedModal === i ? 'app__anuncio_modal_navs_category-content show' : 'app__anuncio_modal_navs_category-content'}>
                                            {category.subcategory.map(subcategory => (
                                                <div key={subcategory}>
                                                    <label>{subcategory}  
                                                        <input type="radio" name="" value={subcategory} onChange={(e) => {setFormData({ ...formData, categoria: e.target.value });}}></input>
                                                        <span class="checkmark"></span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    
    //Modal tooggle
    const ButtonToggleModal = (props) => {
        return(
            <p className='app__pointer' id="modal-toggler" onClick={ props.onClick }>Escolher <FiChevronDown></FiChevronDown></p>
        )
    }
    
    //Modal overlay
    const OverlayModal = ({ className, onClick}) => {
        return(
            <div className={ className } onClick={ onClick }></div>
        )
    }
    
    const [activeModal, setActiveModal] = useState(false);
    const toggleActiveModal = () => setActiveModal(!activeModal);    


    return (
    <div className='app__anuncio_content_generalInfo'>
        <div className='app__anuncio_content_generalInfo_1'>
            <div className=''>
                <div className='inputField'>
                    <p>Título</p>
                    <input type='text' required onChange={(e) => {setFormData({ ...formData, titulo: e.target.value });}}/>
                </div>
            </div>
            <div className=''>
                <div className='inputField'>
                    <p>Preço (€)</p>
                    <input type='number' step="0.01" min="0" required/>
                </div>
            </div>
        </div>
        <div className='app__anuncio_content_generalInfo_2'>
            <div className='app__anuncio_description_section'>
                <p>Descrição</p>
                <textarea 
                    style={{width:'100%', maxHeight: '170px', minHeight:'120px', resize:'vertical', outline:'none', border: '3px solid #EEEEEE', borderRadius:'10px', padding:'0.25rem 0.5rem'}} 
                    form='anuncio_form' 
                    maxLength="600" 
                    onInput={(e) => {
                        setText(e.target.value);
                        setFormData({ ...formData, descricao: e.target.value })
                    }}>
                </textarea>
                <p style={{fontSize: '.75rem', textAlign:'right', margin: '0'}}>{text.length + '/600'}</p>
            </div>
            <div className='app__anuncio_image_section'>
                <p>Imagens <span style={{fontSize: '.75rem'}}>(máx. 8)</span></p>
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
                    {selectedImages.length > 0 &&
                        <span className='app__anuncio_image_sectionBtn app__text_effect app__pointer' onClick={() => setSelectedImages([])}>limpar tudo <FiTrash2></FiTrash2></span>
                    }
                </div>
                {selectedImages.length === 8 &&
                    <p style={{margin: '0', color: '#EB5C1F'}}>Atingiu o limite de imagens!</p>
                }
            </div>
        </div>
        <div>
            <p>Categoria</p>
            <ButtonToggleModal onClick={toggleActiveModal}/>
            <OverlayModal className={ activeModal ? 'overlayModal activeModal' : 'overlayModal'} onClick={toggleActiveModal}/>
            <Modal className={ activeModal ? 'activeModal' : null}/>
        </div>
    </div>
    )
}

export default GeneralInfo