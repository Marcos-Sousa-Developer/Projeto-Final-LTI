import React, {useState, useEffect} from 'react';

import {Navbar, NavbarSupplier, Footer} from '../../../components/index';
import images from '../../../assets/images';
import './NotFound.css';
import { useCookies } from 'react-cookie';
import deleteToDB from '../../../hooks/deleteToDB';
import putToDB from '../../../hooks/putToDB';
import emailjs from '@emailjs/browser';
import getAllFromDB from '../../../hooks/getAllFromDB';

const SuccessOrNot = ({success}) => {

  const [cookies, setCookie, removeCookie] = useCookies();


  const sendEmail = async (supplierEmail, supplierName, productName) => {
    const params = {
      supplier_email: "dibutia12@gmail.com",
      supplier_name: supplierName,
      product_name: productName
    }

    emailjs.send('service_z2i61vc', 'template_rbywj43', params, process.env.REACT_APP_EMAILJS_KEY)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  useEffect(() => {
    async function run() {

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
            console.log(ordersCheck[1])
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
    run()
  },[])

  return (
    <>

        <Navbar></Navbar>
        <div className='app__notfound main__container flex'>
          <div className='app__notfound_content'>
            <img className='app__notfound_img' src={images}></img>
            <div className='app__notfound_bottom'>
              {
                success ? <p>Pagamento feito com sucesso</p> :
                (
                  <p>Pagamento Cancelado</p>
                )
              }
            </div>
          </div>
        </div>

      <Footer></Footer>
      
    </>
  );
}

export default SuccessOrNot