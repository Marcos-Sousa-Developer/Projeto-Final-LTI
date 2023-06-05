import React, {useState, useEffect} from 'react';

import {Navbar, NavbarSupplier, Footer} from '../../../components/index';
import images from '../../../assets/images';
import './NotFound.css';
import { useCookies } from 'react-cookie';
import deleteToDB from '../../../hooks/deleteToDB';
import putToDB from '../../../hooks/putToDB';

const SuccessOrNot = ({success}) => {

  const [cookies, setCookie, removeCookie] = useCookies();

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
            await putToDB('/orderedProducts/'+ordersCheck[1][i],{order_status: "Em preparação"})
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