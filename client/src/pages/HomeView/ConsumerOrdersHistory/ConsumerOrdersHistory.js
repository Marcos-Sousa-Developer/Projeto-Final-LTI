import React, { useEffect, useState } from 'react';
import getAllFromDB from '../../../hooks/getAllFromDB';

import { Navbar, Footer, Modal, SubHeading } from '../../../components/index';
import './ConsumerOrdersHistory.css';

const ConsumerOrdersHistory = () => {
    const [ordersHistory, setConsumerOrder] = useState([]);
    const [modalOpen, setModalOpen] = useState([]);

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
      <div className='app__ConsumerHistory_Orders'>
        {ordersHistory.length > 0 && (
          <>
            <table className='app__prod-unit_existing-units'>
              <thead>
                <tr>
                  <th>Número da encomenda</th>
                  <th>Lista de Produtos</th>
                  <th>Data da encomenda</th>
                  <th>Morada</th>
                  <th>Total €</th>                  
                </tr>
              </thead>
              <tbody>
                {ordersHistory.map((orderHistory, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>{orderHistory.order_number}</td>
                      <td>{orderHistory.order_date}</td>
                      <td>{orderHistory.order_status}</td>
                      <td>
                        <button onClick={() => setModalOpen(prevState => {
                          const newState = [...prevState];
                          newState[index] = true;
                          return newState;
                        })}>Ver produtos</button>
                        <Modal open={modalOpen[index]} onClose={() => setModalOpen(prevState => {
                          const newState = [...prevState];
                          newState[index] = false;
                          return newState;
                        })}>
                          <p>Produto: </p>
                        </Modal>
                      </td> 
                      <td>{orderHistory.order_date}</td>
                      <td>{orderHistory.address}</td>
                      <td>{orderHistory.total}</td>
                      <td>{orderHistory.order_status}</td>
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
  )
}

export default ConsumerOrdersHistory;