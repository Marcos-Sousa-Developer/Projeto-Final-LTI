import React from "react";
//import { authentication as auth}  from '../../authentication'
import './TransportadoraIndex.css';
import {Footer} from '../../../components/index';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from "react-router-dom";

function TransportadoraIndex() { 

  return (
    <>
    
    <div className='app__Transportadora main__container'>
    <Link to='/signin'><FiArrowLeft></FiArrowLeft></Link>
    <h3 className=''>Transportadora</h3>
      


      <div className='app__Transportadora_box'>
            <div className='app__Transportadora_box1'>
            <p>Crendencial de Acesso</p>
                <div className='app__Transportadora_box11'>
                    
                    <input
                        required
                        type="text" 
                    />
                </div>
            </div>
            <div className='app__Transportadora_box1'>
            <p>Código de Acesso</p>
                <div className='app__Transportadora_box11'>
                    
                    <input
                        required
                        type="text" 
                    />
                </div>
            </div>
            <div className='app__Transportadora_box1'>
            <p>Número de Encomenda</p>
                <div className='app__Transportadora_box11'>
                    
                    <input
                        required
                        type="text" 
                    />
                </div>
            </div>
            <div className='app__Transportadora_box1'>
            <p>Código de Validação</p>
                <div className='app__Transportadora_box11'>
                    
                    <input
                        required
                        type="text" 
                    />
                </div>
            </div>
        <div className='flex btn'>
        <button className='main__action_btn'>Login</button>
        </div>
      </div>
      

      </div>
        <Footer></Footer>
    </>
  );
}

export default TransportadoraIndex;