import React, {useState} from 'react';

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
                        <div>
                            <InputField title='Título' inputype='text'></InputField>
                            <InputField title='Preço' inputype='number'></InputField>
                            <div>
                                <p>Descrição</p>
                                <textarea 
                                    style={{width:'100%', maxHeight: '150px', minHeight:'75px', resize:'vertical', outline:'none', border: '3px solid #EEEEEE', borderRadius:'10px'}} 
                                    form='anuncio_form' 
                                    maxlength="300" 
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
                        <div>
                            <InputField title='Nome' inputype='text'></InputField>
                            <InputField title='Data de produção' inputype='date'></InputField>
                            <div>
                                <p>Categoria</p>
                                <button>Escolher categoria</button>
                            </div>
                            <div>
                                <p>Imagens</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    /*onChange={handleFileSelect}*/
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='app__anuncio_content-contact'>
                    <p>Dados de Contacto</p>
                    <div className='app__anuncio_inputArea app__anuncio_content-contact_area'>
                        <InputField title='Nome do anunciante' inputype='text'></InputField>
                        <InputField title='Telemóvel' inputype='tel'></InputField>
                        <InputField title='Email' inputype='email'></InputField>
                        <InputField title='Localização' inputype='text'></InputField>
                    </div>
                    <button type='submit' className='main__action_btn flex' style={{margin: '1rem auto'}}>Publicar</button>
                </div>
            </form>
        </div>
        <Footer></Footer>
    </>
  )

}

export default CriarAnuncio