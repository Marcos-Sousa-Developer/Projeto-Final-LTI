import React from 'react';

import './Button.css';

const Button = ({ title }) => (
  <button className='main__action_btn'>{title}</button>
);

export default Button;