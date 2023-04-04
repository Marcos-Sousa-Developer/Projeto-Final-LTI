import React, {useState, useEffect} from 'react';
import { FiPlus, FiX, FiTrash2, FiChevronUp, FiChevronRight,FiChevronDown } from 'react-icons/fi';

import {NavbarSupplier, Footer, SubHeading, InputField} from '../../../components/index';
import categories from '../../../utilities/categories.json';
import {teste} from '../../../utilities/teste';
import "./CriarAnuncio.css";

const GeneralInfo = ({ formData, setFormData }) => {

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
                    <p style={{margin: '4px', fontWeight:'bold'}}>{formData.categoria.length > 0 ? 'Categoria escolhida!' : 'Escolha uma categoria'}</p>
                    <FiX fontSize={30} color="black" className='app__pointer app__icon_effect' onClick={toggleActiveModal}></FiX>
                    <div className="app__anuncio_modal_navs">
                        <ul>
                        {teste.map((category, i) => (
                            <li key={i}>
                                <h2>{category.name}</h2>
                                <ul>
                                {category.subcategories.map((subcategory, x) => (
                                    <li key={x}>
                                        <h5>{subcategory.name}</h5>
                                        <ul>
                                            {subcategory.subsubcategories.map((subsubcategory, y) => (
                                                <div key={y}>
                                                    <label>{subsubcategory} 
                                                        <input 
                                                            type="radio" 
                                                            name="CriarAnuncioRadio" 
                                                            value={[category.name, subcategory.name, subsubcategory]} 
                                                            onChange={(e) => {setFormData({ ...formData, categoria: e.target.value })}}
                                                            onClick={toggleActiveModal}>
                                                        </input> 
                                                        <span class="checkmark"></span>
                                                    </label>
                                                </div>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                                </ul>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    
    //Modal tooggle
    const ButtonToggleModal = (props) => {
        return(
            <div className='buttonToggleModal_area'>
                <p className='app__pointer' id="modal-toggler" onClick={ props.onClick }> {formData.categoria.length > 0 ? 'Alterar ' : 'Escolher '}<FiChevronDown></FiChevronDown></p> 
                <p className='buttonToggleModal_area_selected_category' style={{margin:'0'}}>{formData.categoria}</p>
            </div>
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
            <div className='inputField'>
                <p>Título</p>
                <input type='text' value={formData.titulo} required onChange={(e) => {setFormData({ ...formData, titulo: e.target.value });}}/>
            </div>
            <div className='inputField'>
                <p>Preço (€)</p>
                <input type='number' value={formData.preco} step="0.01" min="0" required onChange={(e) => {setFormData({ ...formData, preco: e.target.value });}}/>
            </div>
        </div>
        <div className='app__anuncio_content_generalInfo_2'>
            <p>Categoria</p>
            <ButtonToggleModal onClick={toggleActiveModal}/>
            <OverlayModal className={ activeModal ? 'overlayModal activeModal' : 'overlayModal'} onClick={toggleActiveModal}/>
            <Modal className={ activeModal ? 'activeModal' : null}/>
        </div>
    </div>
    )
}

export default GeneralInfo