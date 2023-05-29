import React, { useEffect, useState } from 'react';
import getAllFromDB from '../../../hooks/getAllFromDB';
import putToDB from '../../../hooks/putToDB';

import { Navbar, Footer, SubHeading } from '../../../components/index';
import './ConsumerOrdersHistory.css';
import ConsumerBar from '../../../components/ConsumerBar/ConsumerBar';

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
        <ConsumerBar active2='active'></ConsumerBar>
        <br></br>
        <button className='active app__text_effect' style={{color: "green"}} onClick={() => exportJson()}>Exportar dados de Encomenda</button>
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
                    <th></th>              
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
                        <td><button disabled={orderHistory.order.order_status == "Em preparação" || orderHistory.order.order_status == "A confirmar"? false : true} onClick={() => {handleEditStatusOrder(orderHistory.order.id, "Cancelado"); location.reload();}}>Cancelar</button></td>
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