import React, {useState} from 'react';
import { FiPlus, FiX, FiTrash2 } from 'react-icons/fi';

import {NavbarSupplier, Footer, SubHeading, InputField} from '../../../components/index';
import "./CriarAnuncio.css";

function handleSubmit(event) {
    event.preventDefault();
    // Get input values
    const inputValues = [];
    const inputs = event.target.querySelectorAll('input');
    inputs.forEach((input) => {
      inputValues.push(input.value);
    });
    // Get values from InputField components
    const inputFields = event.target.querySelectorAll('InputField');
    inputFields.forEach((inputField) => {
      inputValues.push(inputField.props.value);
    });
    // Print input values to console
    console.log(inputValues);
}

function CriarAnuncio() {

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

        event.target.value = ""; // FOR BUG IN CHROME
    }

    const [text, setText] = useState('');

    return (
    <>
        <NavbarSupplier></NavbarSupplier>
        <div className='app__anuncio main__container'>
            <SubHeading title="Criar anúncio"></SubHeading>
            <form onSubmit={handleSubmit} className='app__anuncio_content' id='anuncio_form' style={{marginTop:'1rem'}}>
                <div className='app__anuncio_content-product'>
                    <p>Dados do Produto</p>
                    <div className='app__anuncio_inputArea'>
                        <div className='app__anuncio_content-product_area'>
                            <div className='app__anuncio_content-product_area-g1'>
                                <InputField title='Título' inputype='text'></InputField>
                                <InputField title='Preço' inputype='number'></InputField>
                            </div>
                            <div className='app__anuncio_content-product_area-g2'>
                                <InputField title='Data de produção' inputype='date'></InputField>
                                <div>
                                    <p>Categoria</p>
                                    <button className='main__action_btn'>Escolher</button>
                                </div>
                            </div>
                        </div>
                        <div className='app__anuncio_description_section'>
                            <p>Descrição</p>
                            <textarea 
                                style={{width:'100%', maxHeight: '150px', minHeight:'85px', resize:'vertical', outline:'none', border: '3px solid #EEEEEE', borderRadius:'10px', padding:'0.25rem 0.5rem'}} 
                                form='anuncio_form' 
                                maxLength="600" 
                                onInput={(e) => {
                                    setText(e.target.value);
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
                </div>
                <div className='app__anuncio_content-contact'>
                    <p>Dados de Contacto</p>
                    <div className='app__anuncio_inputArea app__anuncio_content-contact_area'>
                        <div>
                            <InputField title='Nome do anunciante' inputype='text'></InputField>
                            <InputField title='Telemóvel' inputype='tel'></InputField>
                        </div>
                        <div>
                            <InputField title='Email' inputype='email'></InputField>
                            <InputField title='Localização' inputype='text'></InputField>
                        </div>
                    </div>
                    <div className='app__anuncio_content-contact_actions'>
                        <a className='app__text_effect'>Pré-visualizar</a>
                        <button type='submit' className='main__action_btn flex'>Publicar</button>
                    </div>
                </div>
            </form>
        </div>
        <Footer></Footer>
    </>
  )

}

export default CriarAnuncio