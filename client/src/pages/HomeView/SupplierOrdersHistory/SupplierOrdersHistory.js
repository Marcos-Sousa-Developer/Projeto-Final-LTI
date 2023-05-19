import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import getAllFromDB from '../../../hooks/getAllFromDB';

import { NavbarSupplier, Footer, Modal, SubHeading } from '../../../components/index';
import './SupplierOrdersHistory.css';

const SupplierOrdersHistory = () => {
    const [ordersHistory, setSupplierOrder] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getSupplierOrder(){
      let supplierOrdersGet = await getAllFromDB("/orderedProducts", {product_owner_uid: true})
      if(typeof supplierOrdersGet != "string") {
          //setSupplierOrder(prevState => [...supplierOrdersGet])
          return supplierOrdersGet
      }
    }

    async function getAd(data){
      let lista = []
      data.map(async(orderHistory) => {
        let adGet = await getAllFromDB("/ads/" + orderHistory.ad_id)
        lista.push([orderHistory, adGet[0].title])
        console.log(12312)
      })
      setSupplierOrder(lista)
    }

    //Aparecer no loading da página
    useEffect(()=>{
      setLoading(true)
      async function run(){
        let data = await getSupplierOrder()
        await getAd(data)
        setLoading(false)
      }
      run()
    }, [])

    function test(oi) {
      console.log(Object.keys(oi))
    }

    return (
    <>
    {
      loading ? "loading":
      <>
      <NavbarSupplier></NavbarSupplier>
      <div className='app__prod-unit main__container'>
        <SubHeading title="Histórico de encomendas"/>
        <button onClick={() => {console.log(ordersHistory)}}>QWEWQEQWE</button>
          {ordersHistory.length > 0 && (
            <>
              <table className='app__prod-unit_existing-units'>
                <thead>
                  <tr>
                    <th>Número da encomenda</th>
                    <th>Nome do produto</th>
                    <th>Localização do comprador</th>
                    <th>Total €</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersHistory.map((orderHistory) => (
                    <React.Fragment key={orderHistory.id}>
                      <tr>
                        <td>{orderHistory.order_id}</td>
                        <td>{test(orderHistory)??"ok"}</td>
                        <td>{orderHistory.buyer_location}</td>
                        <td>{orderHistory.price}</td>                      
                        <td>{orderHistory.order_status}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      <Footer></Footer>
      </>
    }
    </>
  )
}

export default SupplierOrdersHistory;