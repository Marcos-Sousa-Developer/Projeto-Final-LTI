import React, { useEffect, useState } from 'react';
import getAllFromDB from '../../../hooks/getAllFromDB';

import { Navbar, Footer, SubHeading } from '../../../components/index';
import './ConsumerOrdersHistory.css';

const ConsumerOrdersHistory = () => {
    const [ordersHistory, setConsumerOrder] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getConsumerOrder(){
      let consumerOrdersGet = await getAllFromDB("/orderedProducts", {product_buyer_uid: true})
      if(typeof consumerOrdersGet != "string") {
        return consumerOrdersGet
      }
      return []
    }

    async function getAd(data){
      let lista = []
      for (const orderHistory of data) {
        let adGet = await getAllFromDB("/ads/" + orderHistory.ad_id)
        lista = [...lista, { order: orderHistory, ad_name: adGet[0].title }];
      }
      setConsumerOrder(lista)
    }
    
    //Aparecer no loading da página
    useEffect(()=>{
      setLoading(true)
      async function run(){
        let data = await getConsumerOrder()
        await getAd(data)
        setLoading(false)
      }
      run()
    }, [])

    return (
    <>
    {
      loading ? "loading":
      <>
      <Navbar></Navbar>
      <div className='app__prod-unit main__container'>
        <SubHeading title="Histórico de encomendas"/>
        <div className='app__ConsumerHistory_Orders'>
          {ordersHistory.length > 0 && (
            <>
              <table className='app__prod-unit_existing-units'>
                <thead>
                  <tr>
                    <th>Número da encomenda</th>
                    <th>Nome do produto</th>
                    <th>Localização do comprador</th>
                    <th>Preço €</th>
                    <th>Estado</th>               
                  </tr>
                </thead>
                <tbody>
                  {ordersHistory.map((orderHistory) => (
                    <React.Fragment key={orderHistory.id}>
                      <tr>
                        <td>{orderHistory.order.order_id}</td>
                        <td>{orderHistory.ad_name}</td>
                        <td>{orderHistory.order.buyer_location}</td>
                        <td>{orderHistory.order.price}</td>
                        <td>{orderHistory.order.order_status}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </>
          )}
          </div>
        </div>
      <Footer></Footer>
      </>
    }
    </>
  )
}

export default ConsumerOrdersHistory;