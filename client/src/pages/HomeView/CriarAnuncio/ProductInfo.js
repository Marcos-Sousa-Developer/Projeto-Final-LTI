import React, {useState} from 'react';
import { FiPlus, FiX, FiTrash2, FiChevronUp, FiChevronRight } from 'react-icons/fi';

import {NavbarSupplier, Footer, SubHeading, InputField} from '../../../components/index';
import { categories } from '../../../utilities/categories';
import "./CriarAnuncio.css";

const ProductInfo = ({ formData, setFormData }) => {

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
                                                        <input type="radio" name="radio"></input>
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
            <p className='app__pointer' id="modal-toggler" onClick={ props.onClick }>Escolher</p>
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
        <div className='app__anuncio_content_productInfo'>

        </div>
    )
}

export default ProductInfo