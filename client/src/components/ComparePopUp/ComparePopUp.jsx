import React from 'react';
import ReactDom from 'react-dom';
import { FiX, FiRepeat } from 'react-icons/fi';

import './ComparePopUp.css';

const ComparePopUp = ({ openComparePopUp, onCloseComparePopUp }) => {
    if (!openComparePopUp) return null

    return ReactDom.createPortal(
        <>
            <div className='app__compare_pop-up'>
                {/*<button onClick={onCloseComparePopUp}><FiX></FiX></button>*/}
                <div>
                    <p style={{fontSize: '14px'}}>Comparador</p>
                    <p style={{fontSize: '10px', opacity: '.9'}}>Escolha até 4 produtos</p>
                </div>
                <div>
                    
                </div>
                <div className='app__compare_pop-up_actions'>
                    <button>Comparar  <FiRepeat></FiRepeat></button>
                    <button onClick={onCloseComparePopUp}>Limpar tudo</button>
                </div>
            </div>
        </>, document.getElementById('comparador')
    )
}

export default ComparePopUp