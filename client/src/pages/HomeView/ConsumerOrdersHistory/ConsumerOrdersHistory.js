import React, { useEffect, useState, useRef } from 'react';
import getAllFromDB from '../../../hooks/getAllFromDB';
import putToDB from '../../../hooks/putToDB';

import LoadingPage from '../../LoadingPage';
import { Navbar, Footer, SubHeading, SnackBar } from '../../../components/index';
import { PriceDisplay } from '../../../utilities/formatCurrency';
import './ConsumerOrdersHistory.css';
import ConsumerBar from '../../../components/ConsumerBar/ConsumerBar';
import axios from 'axios';

const SnackbarType = {
  success: "success",
  fail: "fail",
};

const ConsumerOrdersHistory = () => {
    const snackbarRef = useRef(null);
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

    const exportJson = () => {
      const fileName = "encomendas";
      let data = []
      for(let i=0; i < ordersHistory.length; i++) {
        let toExport = {
          numero_encomenda: ordersHistory[i].order.order_id,
          estado_encomenda: ordersHistory[i].order.order_status,
          localizacao_consumidor: ordersHistory[i].order.buyer_location,
          data_encomenda: ordersHistory[i].order.created_at,
          categoria_produto:ordersHistory[i].order.product_category,
          subcategoria_produto:ordersHistory[i].order.product_subcategory,
          subsubcategoria_produto:ordersHistory[i].order.product_subsubcategory,
          preco:ordersHistory[i].order.price,
          nome_produto:ordersHistory[i].ad_name,
          localizacao_produto: ordersHistory[i].order.product_location
        }
        data.push(toExport)
      }
      const json = JSON.stringify(data);
      const blob = new Blob([json], { type: "application/json" });
      const href = URL.createObjectURL(blob);

      // create "a" HTLM element with href to file
      const link = document.createElement("a");
      link.href = href;
      link.download = fileName + ".json";
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    }

    async function handleEditStatusOrder(index, status) {
      let productProdUnitPut = await putToDB("/orderedProducts/" + index,{
        order_status: status
      })
      try {
        let params = {
          order_status: "Cancelado",
        }
        await axios.post('/insertNotificationsByID/'+index, null, {params, withCredentials:true}) 
      }
      catch (error) {
      }
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
      loading ? 
        <LoadingPage></LoadingPage> 
        :
        <>
          <Navbar></Navbar>
          <div className='app__ConsumerHistory main__container'>
            <SubHeading title="Histórico de encomendas"/>
            <ConsumerBar active2='active'></ConsumerBar>
            <div className='app__ConsumerHistory_Orders'>
              {ordersHistory.length > 0 && (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>Número da encomenda</th>
                        <th>Nome do produto</th>
                        <th>Localização do comprador</th>
                        <th>Preço</th>
                        <th>Estado</th>
                        <th>Transportadora</th>
                        <th>Código de Entrega</th>
                        <th></th>              
                      </tr>
                    </thead>
                    <tbody>
                      {ordersHistory.map((orderHistory) => (
                        <React.Fragment key={orderHistory.id}>
                          <tr>
                            <td data-cell='Número da encomenda: '>#{orderHistory.order.order_id}</td>
                            <td data-cell='Nome do produto: '>{orderHistory.ad_name}</td>
                            <td data-cell='Localização do comprador: '>{orderHistory.order.buyer_location}</td>
                            <td data-cell='Preço: ' className='priceShow'><PriceDisplay price={orderHistory.order.price}></PriceDisplay></td>
                            <td data-cell='Estado: '>{orderHistory.order.order_status}</td>                            
                            <td data-cell='Transportadora: '>{orderHistory.order.vehicle ?? "N/A"}</td>
                            <td data-cell='Codigo de Entrega: '>{orderHistory.order.code ?? "N/A"}</td>
                            <td className='actions'>
                              {
                                orderHistory.order.order_status == "Em preparação" || orderHistory.order.order_status == "A confirmar" ? (
                                  <>
                                      <button className='secondary__action_btn' disabled={false} onClick={() => {handleEditStatusOrder(orderHistory.order.id, "Cancelado"); snackbarRef.current.show(); setTimeout(() => {window.location.reload();}, 2000);}}>Cancelar</button>
                                      <SnackBar
                                        ref={snackbarRef}
                                        message="A encomenda foi cancelada!"
                                        type={SnackbarType.success}
                                      />
                                  </>
                                )
                                : 
                                (
                                  <button className='secondary__action_btn' style={{opacity:"0.4"}} disabled={true} onClick={() => {handleEditStatusOrder(orderHistory.order.id, "Cancelado"); }}>Cancelada</button>
                                )
                              }
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
            {
              ordersHistory === [] ? 
              (
                ""
              )
              : 
              (
                <button className='active main__action_btn' style={{marginTop: '1rem'}} onClick={() => exportJson()}>Exportar dados</button>
              )
            }
          </div>
          <Footer></Footer>
        </>
      }
    </>
  )
}

export default ConsumerOrdersHistory;