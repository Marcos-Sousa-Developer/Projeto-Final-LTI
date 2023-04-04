import React, {useState, useEffect} from 'react';
import { FiX, FiChevronRight, FiChevronDown } from 'react-icons/fi';

import {teste} from '../../../utilities/teste';
import "./CriarAnuncio.css";

const GeneralInfo = ({ formData, setFormData }) => {

    const Category = ({ category, onClick }) => {
        return (
          <div onClick={() => onClick(category)}>
            {category}
          </div>
        );
    };
    
    const CategoryDetails = ({ category, onClick }) => {
        const [hoveredSubcategory, setHoveredSubcategory] = useState(null);

        return (
            <div>
                <button onClick={onClick}>Back</button> <h2>{category.name}</h2>
                <ul>
                    {category.subcategories.map((subcategory, i) => (
                    <li key={i}>
                        <h5 onMouseEnter={() => setHoveredSubcategory(i)}>{subcategory.name}</h5>
                        {hoveredSubcategory === i && (
                        <ul>
                            <div className=''>
                            {subcategory.subsubcategories.map((subsubcategory, j) => (
                                <li key={j}>
                                    <label>{subsubcategory} 
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
                        </ul>
                        )}
                    </li>
                    ))}
                </ul>
            </div>
        );
    };

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
                    <p style={{margin: '4px', fontWeight:'bold'}}>{formData.categoria.length > 0 ? 'Categoria escolhida!' : 'Escolha uma categoria'}</p>
                    <FiX fontSize={30} color="black" className='app__pointer app__icon_effect' onClick={toggleActiveModal}></FiX>
                    <div className="app__anuncio_modal_navs">
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