import React from 'react';

const FeatureInput = ({ typeInput, featureName, featureTitle, formData, setFormData }) => {
  const feature = formData.features.find(feature => feature[featureName]);
  const featureValue = feature ? feature[featureName] : '';

  const handleInputChange = (e) => {
    const updatedFeature = { ...formData.features[0] };
    updatedFeature[featureName] = e.target.value;
    const updatedFeatures = [...formData.features];
    updatedFeatures[0] = updatedFeature;
    setFormData({ ...formData, features: updatedFeatures });
  };

  return (
    <div className='inputField'>
      <p>{featureTitle}:</p>
      <input
        type={typeInput}
        value={featureValue}
        onChange={handleInputChange}
      ></input>
    </div>
  );
};

export default FeatureInput;