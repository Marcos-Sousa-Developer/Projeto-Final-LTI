import React from 'react';

const SubFeatureInput = ({ typeInput, featureName, featureTitle, formData, setFormData }) => {

  let subFeaturesKeys = Object.keys(formData.sub_features)
  let subFeature  = null;
  let subFeatureValue = null;
  if(subFeaturesKeys.length == 1 && subFeaturesKeys[0] == "0") {
    subFeature = formData.sub_features[0][featureName];
    subFeatureValue = subFeature ? subFeature[featureName] : '';
  }
  if(subFeaturesKeys.length >= 2) {
    subFeature = formData.sub_features[featureName];
    subFeatureValue = subFeature;
  }

  const handleInputChange = (e) => {
    const updatedSubFeature = { ...formData.sub_features };
    updatedSubFeature[0][featureName] = e.target.value;
    setFormData({ ...formData, sub_features: updatedSubFeature });
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