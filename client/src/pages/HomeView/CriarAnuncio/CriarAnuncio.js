import React, {useState} from 'react';
import { FiPlus, FiX } from 'react-icons/fi';

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

        if (selectedImages.length + imagesArray.length <= 10) {
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
            <form onSubmit={handleSubmit} className='app__anuncio_content' id='anuncio_form'>
                <div className='app__anuncio_content-product'>
                    <p>Dados do Produto</p>
                    <div className='app__anuncio_inputArea app__anuncio_content-product_area'>
                        <div className='app__anuncio_content-product_area-g1'>
                            <InputField title='Título' inputype='text'></InputField>
                            <InputField title='Preço' inputype='number'></InputField>
                            <div>
                                <p>Descrição</p>
                                <textarea 
                                    style={{width:'100%', maxHeight: '150px', minHeight:'75px', resize:'vertical', outline:'none', border: '3px solid #EEEEEE', borderRadius:'10px', padding:'0.25rem 0.5rem'}} 
                                    form='anuncio_form' 
                                    maxLength="300" 
                                    onInput={(e) => {
                                        if (e.target.value.length >= 300) {
                                            alert(' Atingiu o limite máximo de caracteres');
                                        }
                                        setText(e.target.value);
                                    }}>
                                </textarea>
                                <span style={{fontSize: '.75rem'}}>{text.length > 0 ? text.length : ''}</span>
                            </div>
                        </div>
                        <div className='app__anuncio_content-product_area-g2'>
                            <InputField title='Data de produção' inputype='date'></InputField>
                            <div>
                                <p>Categoria</p>
                                <button className='main__action_btn'>Escolher</button>
                            </div>
                            <div>
                                <p>Imagens <span style={{fontSize: '.75rem'}}>(máx. 10)</span></p>
                                {selectedImages.length > 0 &&
                                    <button onClick={() => setSelectedImages([])}>limpar tudo</button>
                                }
                                <div className='teste'>
                                    {selectedImages.length === 10 &&
                                        <p>Atingiu o limite de imagens!</p>
                                    }
                                    {selectedImages.length < 10 &&
                                        <label className='app__anuncio_image_input'>
                                            <div>
                                                <FiPlus style={{textAlign: 'center'}}></FiPlus>
                                            </div>
                                            <input type="file" accept="image/*" multiple onChange={onSelectFile}/>
                                        </label>
                                    }
                                    <div className='app__anuncio_images_selected'>
                                        {selectedImages &&
                                            selectedImages.map((image, index)=>{
                                                return(
                                                    <div key={image} className='app__anuncio_image_selected'>
                                                        <img src={image} alt='' className='app__anuncio_image_selected_img'/>
                                                        <FiX className='trash' onClick={() => setSelectedImages(selectedImages.filter((e) => e !== image))}></FiX>
                                                        {/*<p>{index + 1}</p>*/}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
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
                    <button type='submit' className='main__action_btn flex'>Publicar</button>
                </div>
            </form>
        </div>
        <Footer></Footer>
    </>
  )

}

export default CriarAnuncio