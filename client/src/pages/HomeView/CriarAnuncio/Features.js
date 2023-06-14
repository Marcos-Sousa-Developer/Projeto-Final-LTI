import React from 'react';

import FeatureInput from './FeatureInput';

const Features = ({formData, setFormData}) => {

    const isMarcaFeatureExist = formData.features.some(feature => feature.hasOwnProperty('Marca'));
    const isValidadeFeatureExist = formData.features.some(feature => feature.hasOwnProperty('Validade'));
    const isLocaldeProducaoFeatureExist = formData.features.some(feature => feature.hasOwnProperty('Local de Produção'));
    const isEstadoFeatureExist = formData.features.some(feature => feature.hasOwnProperty('Estado'));
    const isGarantiaFeatureExist = formData.features.some(feature => feature.hasOwnProperty('Garantia'));
    const isClasseEnergeticaFeatureExist = formData.features.some(feature => feature.hasOwnProperty('Classe Energética'));

    return (
        <div className='app__anuncio_features'>
            {isMarcaFeatureExist ?                                 
                <FeatureInput typeInput="text" featureName="Marca" featureTitle="Marca" formData={formData} setFormData={setFormData}/>
            : 
                ""
            }
            {isValidadeFeatureExist ? 
                <FeatureInput typeInput="date" featureName="Validade" featureTitle="Validade" formData={formData} setFormData={setFormData}/>
            : 
                ""
            }
            {isLocaldeProducaoFeatureExist ? 
                <FeatureInput typeInput="text" featureName="Local de Produção" featureTitle="Local de Produção" formData={formData} setFormData={setFormData}/>
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
                            <option value="">Escolher</option>
                            <option value="Novo">Novo</option>
                            <option value="Usado">Usado</option>
                        </select>
                    </div>
                </> 
            : 
                ""
            }
            {isGarantiaFeatureExist ? 
                <FeatureInput typeInput="text" featureName="Garantia" featureTitle="Garantia" formData={formData} setFormData={setFormData}/>
            : 
                ""
            }
            {isClasseEnergeticaFeatureExist ? 
                <>
                    <div className='inputField'>
                        <p>Classe Energética:</p>
                        <select 
                            value={formData.features[0]["Classe Energética"] || ''} 
                            onChange={(e) => {
                                const updatedFeature = {...formData.features[0]};
                                updatedFeature[0]["Classe Energética"] = e.target.value;
                                const updatedFeatures = [...formData.features];
                                updatedFeatures[0] = updatedFeature;
                                setFormData({ ...formData, features: updatedFeatures });
                            }}
                            >
                            <option value="">Escolher</option>
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
    )
}

export default Features