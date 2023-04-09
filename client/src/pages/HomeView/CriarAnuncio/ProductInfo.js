import React, {useState} from 'react';
import { FiPlus, FiX, FiTrash2} from 'react-icons/fi';

import "./styles/CriarAnuncio.css";

const ProductInfo = ({ formData, setFormData }) => {
    
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

    return (
        <div className='app__anuncio_content_productInfo'>
            <div className='app__anuncio_description_section'>
                <p>Descrição</p>
                <textarea 
                    style={{width:'100%', maxHeight: '170px', minHeight:'120px', resize:'vertical', outline:'none', border: '3px solid #EEEEEE', borderRadius:'10px', padding:'0.25rem 0.5rem'}} 
                    form='anuncio_form' 
                    maxLength="500" 
                    placeholder='Indique alguns detalhes sobre o seu produto'
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
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem'}}>
                <div className='inputField'>
                    <p>Telemóvel</p>
                    <input type='tel' required onChange={(e) => {setFormData({ ...formData, telemovel: e.target.value });}}/>
                </div>
                <div className='inputField'>
                    <p>Email</p>
                    <input type='email' required onChange={(e) => {setFormData({ ...formData, email: e.target.value });}}/>
                </div> 
            </div>
            <div>
                <p>Unidades de Produção</p>
                <div>

                </div>
            </div>           
        </div>
    )
}

export default ProductInfo