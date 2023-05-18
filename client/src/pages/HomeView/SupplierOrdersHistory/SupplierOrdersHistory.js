import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import getAllFromDB from '../../../hooks/getAllFromDB';

import { NavbarSupplier, Footer, Modal, SubHeading } from '../../../components/index';
import './SupplierOrdersHistory.css';

const SupplierOrdersHistory = () => {
    const [ordersHistory, setSupplierOrder] = useState([]);
    const [modalOpen, setModalOpen] = useState([]);

    async function getSupplierOrder(){
      let supplierOrdersGet = await getAllFromDB("/orderedProducts", {product_owner_uid: true})
      if(typeof supplierOrdersGet != "string") {
          setSupplierOrder(prevState => [...supplierOrdersGet])
      }
    }

    //Aparecer no loading da página
    useEffect(()=>{
        getSupplierOrder()
    }, [])

    return (
    <>
    <NavbarSupplier></NavbarSupplier>
    <div className='app__prod-unit main__container'>
      <SubHeading title="Histórico de encomendas"/>
        {ordersHistory.length > 0 && (
          <>
            <table className='app__prod-unit_existing-units'>
              <thead>
                <tr>
                  <th>Número da encomenda</th>
                  <th></th>
                  <th>Localização do comprador</th>
                  <th>Total €</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {ordersHistory.map((orderHistory, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>{orderHistory.order_id}</td>
                      <td>
                        <button onClick={() => setModalOpen(prevState => {
                          const newState = [...prevState];
                          newState[index] = true;
                          return newState;
                        })}><FiPlusCircle></FiPlusCircle></button>
                        <Modal open={modalOpen[index]} onClose={() => setModalOpen(prevState => {
                          const newState = [...prevState];
                          newState[index] = false;
                          return newState;
                        })}>
                          <p>Categoria: {orderHistory.product_category}</p>
                          <p>Subcategoria: {orderHistory.product_subcategory}</p>
                          <p>Subsubcategoria: {orderHistory.product_subsubcategory}</p>
                        </Modal>
                      </td>
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
  )
}

export default SupplierOrdersHistory;