import React, {useState, useEffect} from 'react';

import {Navbar, NavbarSupplier, Footer} from '../../../components/index';
import images from '../../../assets/images';
import { useCookies } from 'react-cookie';
import deleteToDB from '../../../hooks/deleteToDB';
import putToDB from '../../../hooks/putToDB';
import emailjs from '@emailjs/browser';
import getAllFromDB from '../../../hooks/getAllFromDB';
import './SucessOrNot.css';

const SuccessOrNot = ({success}) => {

  const [cookies, setCookie, removeCookie] = useCookies();

  function redirectToConsumer() {
    window.location.href = '/';
  }

  const sendEmail = async (supplierEmail, supplierName, productName) => {
    const params = {
      supplier_email: supplierEmail,
      supplier_name: supplierName,
      product_name: productName
    }

    emailjs.send('service_z2i61vc', 'template_rbywj43', params, process.env.REACT_APP_EMAILJS_KEY)
  };

  useEffect(() => {
    async function run() {

      try {

        if(!cookies.ordersToCheck) {
          window.location = "/consumer"
        }
        else {
          let ordersCheck = cookies.ordersToCheck.ordersToGet
          if(!success) {
            await deleteToDB('/orders/'+ordersCheck[0])          
            for(let i=0; i < ordersCheck[1].length; i++){
              await deleteToDB('/orderedProducts/'+ordersCheck[1][i])
            }
            removeCookie('ordersToCheck', { path: '/'});
            
          }
         else {
            for(let i=0; i < ordersCheck[1].length; i++){
              await putToDB('/orderedProducts/'+ordersCheck[1][i],{order_status: "Em preparação"})
              let order = await getAllFromDB('/orderedProducts/' + ordersCheck[1][i])
              let ad = await getAllFromDB('/ads/' + order[0].ad_id)
              let supplier = await getAllFromDB('/suppliers/' + ad[0].supplier_id)
  
              await sendEmail(supplier[0].email, supplier[0].name, ad[0].title)
            }
            removeCookie('ordersToCheck', { path: '/'});
            removeCookie('cart', { path: '/'});
          }
        }
      }
      catch {
      }
    }
    run()
  },[])

  return (
    <>
        <Navbar></Navbar>
        {
          success ?
            <div className='app__notfound main__container flex'>
              <div className='app__notfound_content'>
                <img  className='app__notfound_img' src={images.payment_success}></img>
                <div className='app__notfound_bottom'>
                  <p>Compra feita com sucesso!</p>
                  <button className='main__action_btn' onClick={redirectToConsumer}>Home</button>
                </div>
              </div>
            </div>
          :
            <div className='app__notfound main__container flex'>
              <div className='app__notfound_content'>
                <img className='app__notfound_img' src={images.payment_nosuccess}></img>
                <div className='app__notfound_bottom'>
                  <p>Ups! Houve algum erro no pagamento...</p>
                  <button className='main__action_btn' onClick={redirectToConsumer}>Home</button>
                </div>
              </div>
            </div>
        }
      <Footer></Footer>
    </>
  );
}

export default SuccessOrNot