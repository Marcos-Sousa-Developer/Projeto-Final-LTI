import React, { useEffect, useState } from 'react';
import getAllFromDB from '../../../hooks/getAllFromDB';
import putToDB from '../../../hooks/putToDB';

import { NavbarSupplier, Footer, SubHeading } from '../../../components/index';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import './SupplierOrdersHistory.css';
import SupplierBar from '../../../components/SupplierBar/SupplierBar';
import LoadingPage from '../../LoadingPage';

const SupplierOrdersHistory = () => {
    const [ordersHistory, setSupplierOrder] = useState([]);
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

    async function handleEditStatusOrder(index, status) {
      let productProdUnitPut = await putToDB("/orderedProducts/" + index,{
        order_status: status
      })
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
              <table className='app__prod-unit_existing-units'>
                <thead>
                  <tr>
                    <th>Número da encomenda</th>
                    <th>Nome do produto</th>
                    <th>Localização do comprador</th>
                    <th>Total €</th>
                    <th>Estado</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {ordersHistory.map((orderHistory) => (
                    <React.Fragment key={orderHistory.id}>
                      <tr>
                        <td data-cell='Número da encomenda: '>#{orderHistory.order.order_id}</td> 
                        <td data-cell='Título: '>{orderHistory.ad_name}</td>
                        <td data-cell='Localização do comprador: '>{orderHistory.order.buyer_location}</td>
                        <td data-cell='Total €: ' className='priceShow'><PriceDisplay price={orderHistory.order.price}></PriceDisplay></td>                      
                        <td data-cell='Estado: '>{orderHistory.order.order_status}</td>
                        <td><button className='main__action_btn' disabled={orderHistory.order.order_status == "Em preparação" ? false : true} onClick={() => {handleEditStatusOrder(orderHistory.order.id, "Cancelado"); location.reload();}}>Cancelar</button></td>
                        <td><button className='main__negative_action_btn' disabled={orderHistory.order.order_status == "Em preparação" ? false : true} onClick={() => {handleEditStatusOrder(orderHistory.order.id, "Enviado"); location.reload();}}>Enviar</button></td>
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