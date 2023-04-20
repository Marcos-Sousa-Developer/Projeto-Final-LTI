import React from 'react';
import ReactDom from 'react-dom';
import { FiX } from 'react-icons/fi';


import "./Modal.css";

function Modal({ open, children, onClose }) {
    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div className='app__modal_overlay'></div>
            <div className='app__modal_content'>
                <button onClick={onClose}><FiX></FiX></button>
                {children}
            </div>
        </>, document.getElementById('portal')
    );
  }

export default Modal