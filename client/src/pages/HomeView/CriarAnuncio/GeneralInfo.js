import React, {useState, useEffect} from 'react';
import { FiX, FiChevronRight, FiChevronLeft, FiChevronDown } from 'react-icons/fi';

import {teste} from '../../../utilities/teste';
import "./CriarAnuncio.css";

const GeneralInfo = ({ formData, setFormData }) => {

    const Category = ({ category, onClick }) => {
        return (
          <div className='app__pointer' style={{marginBottom:'.75rem'}} onClick={() => onClick(category)}>
            <a className='app__text_effect'>{category}</a>
          </div>
        );
    };
    
    const CategoryDetails = ({ category, onClick }) => {

        const [clickedSubcategory, setClickedSubcategory] = useState(null);

        return (
            <div className='category_details'>
                <div className='app__pointer' style={{display: 'inline-flex', marginBottom:'2rem'}} onClick={onClick}>
                    <button><FiChevronLeft fontSize={20} color="black" style={{marginRight:'1rem'}}></FiChevronLeft></button> 
                    <p style={{margin:'0'}}>{category.name}</p>
                </div>
                <ul>
                    {category.subcategories.map((subcategory, i) => (
                    <li key={i}>
                        <div className='teste1'>
                            <div style={{display:'flex', justifyContent:'space-between'}} className='app__pointer' onClick={() => setClickedSubcategory(i)}>
                                <p style={{margin:'0 1rem 0 0'}}>{subcategory.name}</p>
                                <FiChevronRight style={{margin:'.75rem 0 0 0'}}></FiChevronRight>
                            </div>
                            {clickedSubcategory === i && (
                            <div className='subsubcategories'>
                                <div className='subsubcategories_content'>
                                {subcategory.subsubcategories.map((subsubcategory, j) => (
                                    <li key={j}>
                                        <label className='app__pointer'><p style={{fontSize:'14px', margin: '0'}}>{subsubcategory}</p>
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
                    <div className="app__anuncio_modal_header">
                        <p style={{margin: '4px', fontWeight:'bold'}}>{formData.categoria.length > 0 ? 'Categoria escolhida!' : 'Escolha uma categoria'}</p>
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