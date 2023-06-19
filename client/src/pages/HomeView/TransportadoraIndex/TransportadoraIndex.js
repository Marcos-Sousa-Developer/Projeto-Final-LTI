import React, { useState } from "react";
//import './TransportadoraIndex.css';
import {Footer} from '../../../components/index';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from "react-router-dom";
import postToDB from "../../../hooks/postToDB";

function TransportadoraIndex() { 

  const [credentialAccess, setCredentialAccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [accessCode, setAccessCode] = useState("")
  const [orderedProductID, setOrderedProductID] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState(false)
  const [OK, setOK] = useState(false)

  const validate = async () => {

    setLoading(true) 
    setOK(false)
    setError(false)


    let response = await postToDB('/orderedProducts/acceptOrder',{
      credentialAccess: credentialAccess,
      accessCode: accessCode,
      order_id: orderedProductID,
      code: code
    }) 

    if(response === true) {
      setOK(true)
    }
    else {
      setError(true)
    }

    setLoading(false) 

  }

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
                  value={credentialAccess}
                  onChange={(e) => setCredentialAccess(e.target.value)}
              />
          </div>
      <p>Código de Acesso</p>
        <div className='app__SignIn_box11'>
            <div></div>
            <input
                required
                type="text" 
                className="form-control"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
            />
        </div>
      <p>Número de Encomenda</p>
        <div className='app__SignIn_box11'>
            <div></div>
            <input
                required
                type="text" 
                className="form-control"
                value={orderedProductID}
                onChange={(e) => setOrderedProductID(e.target.value)}
            />
        </div>
      <p>Código de Validação</p>
        <div className='app__SignIn_box11'>
            <div></div>
            <input
                required
                type="text" 
                className="form-control"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
        </div>
        {
          loading ? 
          (
            <button className='main__action_btn'>Loading</button>

          )
          :
          (
            <button className='main__action_btn' onClick={() => validate()}>Validar Encomenda</button>

          )
        }
        <div>
          {
            error ? 
            (
              <p>Não foi possivel validar a encomenda, verifique o acesso</p>
            )
            :
            OK ?
            (
              <p>Encomenda Validada</p>
            )
            :
            ""
          }
        </div>
        <Footer></Footer>
    </div>
  );
}

export default TransportadoraIndex;