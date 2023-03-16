import React from 'react';

import './InputField.css';

const InputFiled = ({title, inputype}) => {
  return (
    <div className='inputField'>
      <p>{title}</p>
      {title === 'Preço' ? <input type={inputype} step="0.01" min="0" required/> : <input type={inputype} required/>}
    </div>
  )
}

export default InputFiled;