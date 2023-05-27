import React, { useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Navbar, Footer, SubHeading, Modal } from '../../../components/index';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import { CartItem } from './CartItem';
import images from '../../../assets/images.js';

import './Cart.css';
import { useState } from 'react';
import axios from 'axios';
import getAllFromDB from '../../../hooks/getAllFromDB';

const Cart = () => {
  //---------------------Modal---------------------
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  //------------------------------------------------

  const [loading, setLoading] = useState(false)
  const [cookies, setCookie] = useCookies(['cart']);
  const [totalItems, setTotalItems] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0) 

  const [email, setEmail] = useState("")
  const [nif, setNif] = useState("")
  const [morada, setMorada] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [cidade, setCidade] = useState("")
  const [distrito, setDistrito] = useState("")
  const [localidade, setLocalidade] = useState("")

  const deleteAllCartItem = () => {
    const prevValue =  {};
    setCookie('cart', prevValue, { path: '/' });
  }

  const goToCheckout = async () => {
    const params = {}
    for (const item in cookies.cart) {
      const quantity = cookies.cart[item][0]
      const price = cookies.cart[item][1]
      const name = cookies.cart[item][2]

      params[item] = {price: price, quantity: quantity, name:name}
    }
    params['details'] = {
      email: email,
      nif: nif,
      morada: morada,
      postal_code: postalCode,
      cidade: cidade,
      distrito: distrito,
      localidade: localidade,
    }
    
    const response = await axios.post('/create-checkout-session', null, {params});
    window.location = response.data
    
  }



  const changePostalCode = async (event) => { 

    setPostalCode(event.target.value)
    await axios.get('https://json.geoapi.pt/cp/'+event.target.value) 
    .then((response) => { 
      let distrito = response.data.Distrito
      let concelho = response.data.Concelho
      let localidade = response.data.Localidade
      let morada = response.data.partes[0]["Artéria"]
      setCidade(concelho)
      setMorada(morada)
      setPostalCode(event.target.value)
      setLocalidade(localidade)
      setDistrito(distrito)
    })
    .catch((error) => {
      console.log(error)
    })

  }

  const consumerData = async () => {
    let data = await getAllFromDB('/consumers',{uid:true})
    setEmail(data[0].email)
    setNif(data[0].nif)
    setMorada(data[0].address)
    setPostalCode(data[0].postal_code)
    setCidade(data[0].city)
    setDistrito(data[0].district)
    setLocalidade(data[0].town)
  }
  
  useEffect(() => {
    async function run() {
      await consumerData()
      if(cookies.cart){
        let total= 0;
        let totalI = 0;
        for (const item in cookies.cart) {
          total += (cookies.cart[item][1] * cookies.cart[item][0]);
          totalI += cookies.cart[item][0]
        }
      setTotalAmount(total)
      setTotalItems(totalI)
      }
    }
    run()
  },[cookies.cart])

  return (
    <>
      <Navbar></Navbar>
      <div className='main__container app__cart'>
        <SubHeading title="Carrinho"></SubHeading>

        {totalAmount > 0 ? (
          <>
            <div className='app__cart_before_content'>
              <div className='flex'>
                <Link to='/' className='flex app__cart_before_content_btn'>
                  <FiArrowLeft></FiArrowLeft>
                  <p>Continuar a comprar</p>
                </Link>
                <button className='flex app__cart_before_content_btn' onClick={() => setIsOpen(true)}>
                  <FiTrash2></FiTrash2>
                  <p>Limpar carrinho</p>
                </button>
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                  <p>Tem a certeza que deseja apagar os items do carrinho?</p>
                  <button className='main__action_btn' onClick={() => setIsOpen(false)}>Cancelar</button>
                  <button className='main__negative_action_btn' onClick={() => deleteAllCartItem()}>Apagar tudo</button>
                </Modal>
              </div>
            </div>

            <div className='app__cart_content'>
              <div className='app__cart_subcontent'>

                {Object.keys(cookies.cart).map((key) => {
                    return <CartItem data={cookies.cart[key][3]}></CartItem>
                })}

              </div>

              <div className='app__cart_checkout_area'>
                <p style={{marginBottom: '1rem', fontSize: '1.5rem'}}>Sumário</p>
                <p>Nº de Items: {totalItems}</p>
                <p>SubTotal: {0}</p>
                <p>Total: <PriceDisplay className='product_price' price={totalAmount} /></p>
                {
                  !loading ?  
                    <>
                      <button className='main__action_btn app__cart_checkout_btn' type="submit" onClick={() => setIsOpen2(true)}>
                        Checkout
                      </button>
                      <Modal open={isOpen2} onClose={() => setIsOpen2(false)}>
                        <p style={{fontSize: '18px'}}>Informações de Encomenda</p>
                        <div>
                          <div className='inputField'>
                            <p>Email:</p>
                            <input                         
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={email}
                            />
                          </div>
                          <div className='inputField'>
                            <p>NIF:</p>
                            <input                         
                                type="number"
                                placeholder="NIF"
                                name="NIF"
                                value={nif}
                            />
                          </div>
                          <div className='inputField'>
                            <p>Morada:</p>
                            <input               
                                type="text"
                                placeholder="Morada"
                                name="morada"
                                value={morada}
                            />
                          </div> 
                          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                            <div className='inputField'>
                              <p>Cidade:</p>
                              <input                               
                                  type="text"
                                  placeholder="Cidade"
                                  name="cidade"
                                  value={cidade}
                              />
                            </div> 
                            <div className='inputField'>
                              <p>Cód. Postal:</p>
                              <input                         
                                  type="text"
                                  placeholder="Cód. Postal"
                                  name="codigoPostal"
                                  value={postalCode}
                                  onChange={(e) => changePostalCode(e)}
                              />
                            </div>
                          </div>
                        </div>
                        <div style={{display:'flex', justifyContent:'space-evenly', gap:'1.5rem', marginTop:'2rem'}}>
                          <button className='main__action_btn' onClick={() => setIsOpen2(false)}>Cancelar</button>
                          {
                            postalCode === "" || morada === "" || cidade === "" || email === "" ? 
                            <>
                              <button className='main__negative_action_btn'>Pagamento</button>
                              <small style={{color:'red'}}>Insira os dados para encomenda</small>
                            </>
                            :
                            <button className='main__negative_action_btn' onClick={() => goToCheckout()}>Pagamento</button>
                          }
                          
                        </div>
                      </Modal>
                    </>
                  :
                  <button className='main__action_btn app__cart_checkout_btn'>Loading</button>
                }
              </div>
            </div>
          </>
        ) : (
          <>
            <img className='empty_cart_img' src={images.empty_cart}></img>
            <h5>O carrinho está vazio.</h5>
          </>
        )}

      </div>
      <Footer></Footer>
    </>
  )
}

export default Cart