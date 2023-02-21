import React, { useEffect } from 'react'
import "../../assets/styles/style.css"
import activateOrDeactivateUser from '../../../../hooks/activateOrDeactivateUser';

function Modal({user, isShowingModal, user_type}) { 

  const handleUser = () => {

    const newStateAccount = user.account_status == 0 ? 1 : 0  

    let url = ""
    if(user_type == "consumer") {
      url = "/consumers"
    }
    else {
      url = "/suppliers"
    }

    if(user.account_status == 0) {
      activateOrDeactivateUser(url+"/activate/"+user.id, newStateAccount)
    }
    else {
      activateOrDeactivateUser(url+"/deactivate/"+user.id, newStateAccount)
    }

  }

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        className="fade modal show"
        tabIndex="-1"
        aria-labelledby="contained-modal-title-vcenter"
        style={{
          backgroundColor: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="modal-dialog modal-xl"
          style={{ width: "100%", backgroundColor: "transparent"}}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"><i className="bi bi-person-fill-gear"></i></h5>

              <button type="button" onClick={isShowingModal} className="close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="form-group col-md-4">
                      <label htmlFor="name">Nome</label>
                      <input className="form-control" id="name" placeholder={user.name} disabled readOnly></input>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="nif">NIF</label>
                      <input className="form-control" id="nif" placeholder={user.nif} disabled readOnly></input>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="mobile">Telemóvel</label>
                      <input className="form-control" id="mobile" placeholder={user.mobile_number} disabled readOnly></input>
                    </div>
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" id="email" placeholder={user.email} disabled readOnly></input>
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="address">Endereço</label>
                    <input type="text" className="form-control" id="address" placeholder={user.address} disabled readOnly></input>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-4">
                      <label htmlFor="order">Encomendas</label>
                      <input className="form-control" id="order" placeholder={user.orders ?? 0} disabled readOnly></input>
                    </div>
                    {user_type == "consumer" ? (
                      <div className="form-group col-md-4">
                        <label htmlFor="interest">Interesses</label>
                        <input className="form-control" id="interest" placeholder={user.shopping_cart ?? 0} disabled readOnly></input>
                      </div>
                    ): 
                      <div className="form-group col-md-4">
                        <label htmlFor="products">Lista de Produtos</label>
                        <input className="form-control" id="products" placeholder={user.products_list ?? 0} disabled readOnly></input>
                      </div>
                    
                    }
                    <div className="form-group col-md-4">
                      <label htmlFor="status">Estado da Conta</label>
                      <input className="form-control" id="status" placeholder={user.account_status == 0 ? "Desativada" : "Ativada"} disabled readOnly></input>
                    </div>
                  </div>
                </div>
              </div>

            <div className="modal-footer">
              <button
                type="button"
                onClick={isShowingModal}
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>

              <button type="button" onClick={() => handleUser()} className="btn btn-primary">
                {user.account_status == 0 ? "Ativar" : "Desativar" }
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal
