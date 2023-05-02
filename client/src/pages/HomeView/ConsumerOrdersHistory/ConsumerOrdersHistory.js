import React, { useEffect, useState } from 'react';
import getAllFromDB from '../../../hooks/getAllFromDB';

import {Navbar, Footer, SubHeading} from '../../../components/index';
import './ConsumerOrdersHistory.css';

const ConsumerOrdersHistory = () => {
    const [ordersHistory, setConsumerOrder] = useState([]);

    async function getConsumerOrder(){
        let consumerOrdersGet = await getAllFromDB("/orders", {uid_consumer: true})
        if(typeof consumerOrdersGet != "string") {
            setConsumerOrder(prevState => [...consumerOrdersGet])
        }
    }

    //Aparecer no loading da página
    useEffect(()=>{
        getConsumerOrder()
    }, [])

    return (
    <>
    <Navbar></Navbar>
    <div className='app__prod-unit main__container'>
      <SubHeading title="Histórico de encomendas"/>
        {ordersHistory.length > 0 && (
          <>
            <p>Histórico de encomendas</p>
            <table className='app__prod-unit_existing-units'>
                <thead>
                    <tr>
                        <th>Número da encomenda</th>
                        <th>Data da encomenda</th>
                        <th>Estado da encomenda</th>
                        <th>Lista de Produtos</th>
                        <th>Total</th>
                        <th>Morada</th>
                        <th>Tamanho</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersHistory.map((orderHistory, index) => (
                        <React.Fragment key={index}>
                        <tr>
                            <td>{orderHistory.order_number}</td>
                            <td>{orderHistory.order_date}</td>
                            <td>{orderHistory.order_status}</td>
                            <td>{orderHistory.products_list}</td>
                            <td>{orderHistory.total}</td>
                            <td>{orderHistory.address}</td>
                            <td>{orderHistory.size}</td>
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
  )
}

export default ConsumerOrdersHistory;