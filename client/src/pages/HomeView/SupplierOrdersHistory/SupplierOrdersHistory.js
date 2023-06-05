import React, { useState, useEffect, useRef } from 'react';

import getAllFromDB from '../../../hooks/getAllFromDB';
import putToDB from '../../../hooks/putToDB';

import { NavbarSupplier, Footer, Modal, SubHeading, SnackBar } from '../../../components/index';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import SupplierBar from '../../../components/SupplierBar/SupplierBar';
import LoadingPage from '../../LoadingPage';
import './SupplierOrdersHistory.css';

const SupplierOrdersHistory = () => {
    const [modalOpen, setModalOpen] = useState([]); //modal1    
    const [currentOrder, setCurrentOrder] = useState(0);  
    const [ordersHistory, setSupplierOrder] = useState([]);
    const [vehiclesHistory, setVehicle] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getSupplierOrder(){
      let supplierOrdersGet = await getAllFromDB("/orderedProducts", {product_owner_uid: true})
      if(typeof supplierOrdersGet != "string") {
        return supplierOrdersGet
      }
      return []
    }

    async function getAd(data){
      let lista = []
      for (const orderHistory of data) {
        let adGet = await getAllFromDB("/ads/" + orderHistory.ad_id)
        lista = [...lista, { order: orderHistory, ad_name: adGet[0].title }];
      }
      setSupplierOrder(lista)
    }

    async function getVehicle(){
      let vehicleGet = await getAllFromDB("/vehicles/")
      if(typeof vehicleGet != "string") {
        setVehicle(prevState => [...vehicleGet])
      }
  }

    async function handleEditStatusOrder(status) {
      await putToDB("/orderedProducts/" + currentOrder, {
        order_status: status
      })
    }

    async function handleEditVehicle(vehicle) {
      await putToDB("/orderedProducts/" + currentOrder, {
          vehicle: vehicle
      })
  }

    function modalToOpen(orderID) {
      setModalOpen(prevState => {
        const newState = [...prevState];
        newState[orderID] = true;
        return newState;
      })
      setCurrentOrder(orderID)
    }

    function modalToClose(orderID) {
      setModalOpen(prevState => {
        const newState = [...prevState];
        newState[orderID] = false;
        return newState;
      })
      setCurrentOrder(0)
    }

    //Aparecer no loading da página
    useEffect(()=>{
      setLoading(true)
      async function run(){
        let data = await getSupplierOrder()
        await getAd(data)
        getVehicle()
        setLoading(false)
      }
      run()
    }, [])

    return (
    <>
    {
      loading ? 
        <LoadingPage></LoadingPage>
      :
      <>
      <NavbarSupplier></NavbarSupplier>
      <div className='app__SupplierHistory main__container'>
        <SubHeading title="Histórico de encomendas"/>
        <SupplierBar active5='active'></SupplierBar>
        <div className='app__SupplierHistory_Orders'>
          {ordersHistory.length > 0 && (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Número da encomenda</th>
                    <th>Nome do produto</th>
                    <th>Localização do comprador</th>
                    <th>Total €</th>
                    <th>Estado</th>
                    <th>Transportadora</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {ordersHistory.map((orderHistory) => (
                    <React.Fragment key={orderHistory.order.id}>
                      <tr>
                        <td data-cell='Número da encomenda: '>#{orderHistory.order.order_id}</td> 
                        <td data-cell='Título: '>{orderHistory.ad_name}</td>
                        <td data-cell='Localização do comprador: '>{orderHistory.order.buyer_location}</td>
                        <td data-cell='Total €: ' className='priceShow'><PriceDisplay price={orderHistory.order.price}></PriceDisplay></td>                      
                        <td data-cell='Estado: '>{orderHistory.order.order_status}</td>
                        <td data-cell='Transportadora: '>{orderHistory.order.vehicle ?? "N/A" }</td>
                        <td>
                          {
                            orderHistory.order.order_status == "Em preparação" ? (
                              <button className='main__action_btn' disabled={false} onClick={() => {handleEditStatusOrder(orderHistory.order.id, "Cancelado"); location.reload();}}>Cancelar</button>
                            )
                            : (
                              <button className='main__action_btn' style={{opacity:"0.4"}} disabled={true} onClick={() => {handleEditStatusOrder(orderHistory.order.id, "Cancelado"); location.reload();}}>Cancelar</button>
                            )
                          }
                        </td>
                        <td>
                          <button className='main__negative_action_btn' disabled={orderHistory.order.order_status == "Em preparação" ? false : true} onClick={() => modalToOpen(orderHistory.order.id)}>ENVIAR</button>
                          <Modal open={modalOpen[orderHistory.order.id]} onClose={() => modalToClose(orderHistory.id)}>
                            <div className='app__ConsumerHistory_Orders'>
                              {vehiclesHistory.length > 0 && (
                                <>
                                  <table>
                                    <thead>
                                      <tr>
                                        <th>Transportadora</th>
                                        <th></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {vehiclesHistory.map((vehicleHistory) => (
                                        <React.Fragment key={vehicleHistory.id}>
                                          <tr>
                                            <td>{vehicleHistory.name}</td>
                                            <td><button className='main__action_btn' onClick={() => {handleEditVehicle(vehicleHistory.name); handleEditStatusOrder("Enviado"); location.reload();}}>Confirmar</button></td>
                                          </tr>
                                        </React.Fragment>
                                      ))}
                                    </tbody>
                                  </table>
                                </>
                              )}
                            </div>   
                          </Modal>
                        </td>
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

export default SupplierOrdersHistory; 