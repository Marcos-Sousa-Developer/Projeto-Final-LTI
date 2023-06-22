import React, { useState } from "react";
//import { authentication as auth}  from '../../authentication'
import './TransportadoraIndex.css';
import {Footer} from '../../../components/index';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from "react-router-dom";
import postToDB from "../../../hooks/postToDB";
import axios from "axios";

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
      try {
        let params = {
          order_status: "Entregue",
        }
        await axios.post('/insertNotificationsByID/'+orderedProductID, null, {params, withCredentials:true}) 
      }
      catch (error) {
      }
      setOK(true)
    }
    else {
      setError(true)
    }

    setLoading(false) 

  }

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
                        value={credentialAccess}
                        onChange={(e) => setCredentialAccess(e.target.value)}
                    />
                </div>
            </div>
            <div className='app__Transportadora_box1'>
            <p>Código de Acesso</p>
                <div className='app__Transportadora_box11'>
                    <input
                        required
                        type="text" 
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                    />
                </div>
            </div>
            <div className='app__Transportadora_box1'>
            <p>Número de Encomenda</p>
                <div className='app__Transportadora_box11'>
                    <input
                        required
                        type="text"
                        value={orderedProductID}
                        onChange={(e) => setOrderedProductID(e.target.value)}
                    />
                </div>
            </div>
            <div className='app__Transportadora_box1'>
            <p>Código de Validação</p>
                <div className='app__Transportadora_box11'>
                    <input
                        required
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
            </div>
            <div style={{textAlign: 'center', margin: '2rem 0 0 0'}}>
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
            </div>
            <div>
              {
                error ? 
                (
                  <p>Não foi possivel validar esta a encomenda, verifique se já está validada ou se o acesso está correto!</p>
                  
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
          </div>
        </div>
        <Footer></Footer>
    </>
  );
}

export default TransportadoraIndex;