import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from 'react-dom';
import { FiCheck, FiX } from 'react-icons/fi';

import './SnackBar.css';

const SnackBar = forwardRef((props, ref) => {
    const [showSnackbar, setShowSnackbar] = useState(false);
  
    useImperativeHandle(ref, () => ({
      show() {
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
        }, 3000);
      },
    }));

    return ReactDOM.createPortal (
      <div
        className="snackbar"
        id={showSnackbar ? "showSnackBar" : "hideSnackBar"}
        style={{
          border: props.type === "success" ? "3px solid #98fb98" : "3px solid #dd3232",
          color: props.type === "success" ? "black" : "white",
        }}
      >
        <div className="symbol">
          {props.type === "success" ? <FiCheck></FiCheck> : <FiX></FiX>}
        </div>
        <div className="message">{props.message}</div>
      </div>, 
      document.getElementById('notification')
    );
  });

export default SnackBar