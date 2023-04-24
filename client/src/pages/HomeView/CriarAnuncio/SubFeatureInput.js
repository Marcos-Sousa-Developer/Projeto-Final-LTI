import React from 'react';

const SubFeatureInput = ({ typeInput, featureName, featureTitle, formData, setFormData }) => {

  let subFeaturesKeys = Object.keys(formData.sub_features)
  let subFeature  = null;
  let subFeatureValue = null;
  if(subFeaturesKeys.length == 1 && subFeaturesKeys[0] == "0") {
    subFeature = formData.sub_features.find(sub_feature => sub_feature[featureName]);
    subFeatureValue = subFeature ? subFeature[featureName] : '';
  }
  if(subFeaturesKeys.length >= 2) {
    subFeature = formData.sub_features[featureName];
    subFeatureValue = subFeature;
  }

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