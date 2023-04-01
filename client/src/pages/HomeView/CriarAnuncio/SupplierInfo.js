import React, {useState} from 'react';
import { FiPlus, FiX, FiTrash2, FiChevronUp, FiChevronRight } from 'react-icons/fi';

import {NavbarSupplier, Footer, SubHeading, InputField} from '../../../components/index';
import { categories } from '../../../utilities/categories';
import "./CriarAnuncio.css";

const SupplierInfo = ({ formData, setFormData }) => {
    return (
        <div className='app__anuncio_content_supplierInfo'>
            <div>
                <div className='inputField'>
                    <p>Nome do anunciante</p>
                    <input type='text' required onChange={(e) => {setFormData({ ...formData, nome: e.target.value });}}/>
                </div>
                <div className='inputField'>
                    <p>Telemóvel</p>
                    <input type='tel' required onChange={(e) => {setFormData({ ...formData, telemovel: e.target.value });}}/>
                </div>
            </div>
            <div>
                <div className='inputField'>
                    <p>Email</p>
                    <input type='email' required onChange={(e) => {setFormData({ ...formData, email: e.target.value });}}/>
                </div>
                <div className='inputField'>
                    <p>Localização</p>
                    <input type='text' required onChange={(e) => {setFormData({ ...formData, localizacao: e.target.value });}}/>
                </div>
            </div>
        </div>
    )
}

export default SupplierInfo