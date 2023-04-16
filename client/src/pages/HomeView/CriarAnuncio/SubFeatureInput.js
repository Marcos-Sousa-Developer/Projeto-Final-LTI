import React from 'react';

const SubFeatureInput = ({ typeInput, featureName, featureTitle, formData, setFormData }) => {
  const subFeature = formData.sub_features.find(sub_feature => sub_feature[featureName]);
  const subFeatureValue = subFeature ? subFeature[featureName] : '';

  const handleInputChange = (e) => {
    const updatedSubFeature = { ...formData.sub_features[0] };
    updatedSubFeature[featureName] = e.target.value;
    const updatedSubFeatures = [...formData.sub_features];
    updatedSubFeatures[0] = updatedSubFeature;
    setFormData({ ...formData, sub_features: updatedSubFeatures });
  };

  return (
    <div className='inputField'>
      <p>{featureTitle}:</p>
      <input
        type={typeInput}
        value={subFeatureValue}
        onChange={handleInputChange}
      ></input>
    </div>
  );
};

export default SubFeatureInput;