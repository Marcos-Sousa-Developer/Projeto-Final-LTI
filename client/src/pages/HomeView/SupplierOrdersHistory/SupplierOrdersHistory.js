import React, { useState, useEffect, useRef } from 'react';

import getAllFromDB from '../../../hooks/getAllFromDB';
import putToDB from '../../../hooks/putToDB';

import { NavbarSupplier, Footer, Modal, SubHeading, SnackBar } from '../../../components/index';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import SupplierBar from '../../../components/SupplierBar/SupplierBar';
import LoadingPage from '../../LoadingPage';
import './SupplierOrdersHistory.css';
import emailjs from '@emailjs/browser';

const SnackbarType = {
  success: "success",
  fail: "fail",
};

const SupplierOrdersHistory = () => {
    const [modalOpen, setModalOpen] = useState([]); //modal
    const snackbarRef = useRef(null); //snackbar
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

  const sendEmail = async () => {

    let orderedPorduct = await getAllFromDB("/orderedProducts/" + currentOrder)

    let consumer = await getAllFromDB("/consumers", {uid: orderedPorduct[0].product_buyer_uid})

    let consumerEmail = consumer[0].email;
    let consumerName = consumer[0].name; 
    let orderNumber = orderedPorduct[0].order_id;

    const params = {
      consumer_email: "rafael.ribeiro.rr11@gmail.com",
      consumer_name: consumerName,
      order_number: orderNumber,
    }

    emailjs.send('service_z2i61vc', 'template_j3rgk2d', params, process.env.REACT_APP_EMAILJS_KEY)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      setTimeout(function() {
        location.reload();
      }, 1000);
  };

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
        <SubHeading title="Encomendas"/>
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
                        <td className='actions'>
                          <div>
                            {
                              orderHistory.order.order_status == "Em preparação" ? (
                                <button className='secondary__negative_action_btn app__pointer' disabled={false} onClick={() => {handleEditStatusOrder(orderHistory.order.id, "Cancelado"); location.reload();}}>Cancelar</button>
                              )
                              : (
                                <button className='secondary__negative_action_btn' style={{opacity:"0.4"}} disabled={true} onClick={() => {handleEditStatusOrder(orderHistory.order.id, "Cancelado"); location.reload();}}>Cancelar</button>
                              )
                            }
                            <button className='secondary__action_btn app__pointer' disabled={orderHistory.order.order_status == "Em preparação" ? false : true} onClick={() => modalToOpen(orderHistory.order.id)}>Enviar</button>
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
                                              <td><button className='secondary__action_btn app__pointer' onClick={async () => {handleEditVehicle(vehicleHistory.name); handleEditStatusOrder("Enviado"); await sendEmail();}}>Confirmar</button></td>
                                            </tr>
                                          </React.Fragment>
                                        ))}
                                      </tbody>
                                    </table>
                                  </>
                                )}
                              </div>   
                            </Modal>
                          </div>
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