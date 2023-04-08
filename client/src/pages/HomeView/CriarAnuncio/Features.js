import React from 'react';

import {teste} from '../../../utilities/teste';
import CriarAnuncio from './CriarAnuncio';

const Features = ({features, formData, setFormData}) => {
    const isMarcaFeatureExist = features.some(feature => feature.hasOwnProperty('Marca'));
    const isValidadeFeatureExist = features.some(feature => feature.hasOwnProperty('Validade'));
    const isLocaldeProducaoFeatureExist = features.some(feature => feature.hasOwnProperty('LocaldeProducao'));
    const isEstadoFeatureExist = features.some(feature => feature.hasOwnProperty('Estado'));
    const isGarantiaFeatureExist = features.some(feature => feature.hasOwnProperty('Garantia'));
    const isClasseEnergeticaFeatureExist = features.some(feature => feature.hasOwnProperty('ClasseEnergetica'));

    return (
        <>
            <p>Acerca do produto</p>
            {features.map((feature, g) => (
                <div key={g}>
                    {isMarcaFeatureExist && g === 0 ? 
                        <>
                            <div className='inputField'>
                                <p>Marca:</p>
                                <input 
                                    type='text'
                                    value={formData.features.find(feature => feature.Marca)?.Marca || ''}
                                    onChange={(e) => {
                                        const updatedFeature = {...formData.features[0]};
                                        updatedFeature.Marca = e.target.value;
                                        const updatedFeatures = [...formData.features];
                                        updatedFeatures[0] = updatedFeature;
                                        setFormData({ ...formData, features: updatedFeatures });
                                    }}
                                ></input>
                            </div>
                        </> 
                    : 
                        ""
                    }

                    {isValidadeFeatureExist ? 
                        <>
                            <div className='inputField'>
                                <p>Validade:</p>
                                <input 
                                    type='date'
                                    value={formData.features.find(feature => feature.Validade)?.Validade || ''}
                                    onChange={(e) => {
                                        const updatedFeature = {...formData.features[0]};
                                        updatedFeature.Validade = e.target.value;
                                        const updatedFeatures = [...formData.features];
                                        updatedFeatures[0] = updatedFeature;
                                        setFormData({ ...formData, features: updatedFeatures });
                                    }}
                                ></input>
                            </div>
                        </> 
                    : 
                        ""
                    }

                    {isLocaldeProducaoFeatureExist ? 
                        <>
                            <div className='inputField'>
                                <p>Local de Produção:</p>
                                <input 
                                    type='text' 
                                    value={formData.features.find(feature => feature.LocaldeProducao)?.LocaldeProducao || ''}
                                    onChange={(e) => {
                                        const updatedFeature = {...formData.features[0]};
                                        updatedFeature.LocaldeProducao = e.target.value;
                                        const updatedFeatures = [...formData.features];
                                        updatedFeatures[0] = updatedFeature;
                                        setFormData({ ...formData, features: updatedFeatures });
                                    }}
                                ></input>
                            </div>
                        </> 
                    : 
                        ""
                    }

                    {isEstadoFeatureExist ? 
                        <>
                            <div className='inputField'>
                                <p>Estado:</p>
                                <select 
                                    value={formData.features[0].Estado || ''} 
                                    onChange={(e) => {
                                        const updatedFeature = {...formData.features[0]};
                                        updatedFeature.Estado = e.target.value;
                                        const updatedFeatures = [...formData.features];
                                        updatedFeatures[0] = updatedFeature;
                                        setFormData({ ...formData, features: updatedFeatures });
                                    }}
                                    >
                                    <option value="">Selecione um estado</option>
                                    <option value="Novo">Novo</option>
                                    <option value="Usado">Usado</option>
                                </select>
                            </div>
                        </> 
                    : 
                        ""
                    }

                    {isGarantiaFeatureExist ? 
                        <>
                            <div className='inputField'>
                                <p>Garantia:</p>
                                <input 
                                    type='text'
                                    value={formData.features.find(feature => feature.Garantia)?.Garantia || ''}
                                    onChange={(e) => {
                                        const updatedFeature = {...formData.features[0]};
                                        updatedFeature.Garantia = e.target.value;
                                        const updatedFeatures = [...formData.features];
                                        updatedFeatures[0] = updatedFeature;
                                        setFormData({ ...formData, features: updatedFeatures });
                                    }}
                                ></input>
                            </div>
                        </> 
                    : 
                        ""
                    }

                    {isClasseEnergeticaFeatureExist ? 
                        <>
                            <div className='inputField'>
                                <p>Classe Energética:</p>
                                <select 
                                    value={formData.features[0].ClasseEnergetica || ''} 
                                    onChange={(e) => {
                                        const updatedFeature = {...formData.features[0]};
                                        updatedFeature.ClasseEnergetica = e.target.value;
                                        const updatedFeatures = [...formData.features];
                                        updatedFeatures[0] = updatedFeature;
                                        setFormData({ ...formData, features: updatedFeatures });
                                    }}
                                    >
                                    <option value="">Selecione uma classe</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                    <option value="F">F</option>
                                    <option value="G">G</option>
                                </select>
                                </div>
                        </> 
                    : 
                        ""
                    }
                </div>
            ))}
        </>
    )
}

export default Features