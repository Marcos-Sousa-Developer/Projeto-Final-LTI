import React from "react";
//import { authentication as auth}  from '../../authentication'
//import './TransportadoraIndex.css';
import {Footer} from '../../../components/index';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from "react-router-dom";

function TransportadoraIndex() { 

  return (
    <div>
      <Link to='/signin'><FiArrowLeft></FiArrowLeft></Link>
      <h3 className=''>Transportadora</h3>



      <p>Crendencial de Acesso</p>
          <div className='app__SignIn_box11'>
              <div></div>
              <input
                  required
                  type="text" 
                  className="form-control"
              />
          </div>
      <p>Código de Acesso</p>
        <div className='app__SignIn_box11'>
            <div></div>
            <input
                required
                type="text" 
                className="form-control"
            />
        </div>
      <p>Número de Encomenda</p>
        <div className='app__SignIn_box11'>
            <div></div>
            <input
                required
                type="text" 
                className="form-control"
            />
        </div>
      <p>Código de Validação</p>
        <div className='app__SignIn_box11'>
            <div></div>
            <input
                required
                type="text" 
                className="form-control"
            />
        </div>
      <button className='main__action_btn'>Login</button>

      

      
        <Footer></Footer>
    </div>
  );
}

export default TransportadoraIndex;