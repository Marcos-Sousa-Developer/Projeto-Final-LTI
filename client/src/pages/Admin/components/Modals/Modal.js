import React from 'react'
import "../../assets/styles/style.css"
import activateOrDeactivateUser from '../../../../hooks/activateOrDeactivateUser';

function Modal({user, isShowingModal, user_type}) { 

  const handleUser = () => {

    const newStateAccount = user.account_status == 0 ? 1 : 0  

    let url = ""
    if(user_type == "consumer") {
      url = "/api/consumers"
    }
    else {
      url = "/api/suppliers"
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
      <div className="fade modal-backdrop show"></div>

      <div
        role="dialog"
        aria-modal="true"
        className="fade modal show"
        tabIndex="-1"
        aria-labelledby="contained-modal-title-vcenter"
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="modal-dialog modal-xl"
          style={{ width: "100%", backgroundColor: "transparent" }}
        >
          <div className="modal-content" style={{ borderRadius: "15px" }}>
            <div className="modal-header">
              <h5 className="modal-title">Nome: {user.name}</h5>

              <button type="button" onClick={isShowingModal} className="close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            {user_type == "consumer" && (
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col border border">NIF: {user.nif}</div>
                    <div className="col border border">
                      Telemóvel: {user.mobile_number}
                    </div>
                    <div className="col border border">
                      Endereço: {user.address}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col border border">Email: {user.email}</div>
                    <div className="col border border">
                      Encomendas: {user.orders ?? 0}
                    </div>
                    <div className="col border border">
                      Estado Conta:{" "}
                      {user.account_status == 0 ? "Desativada" : "Ativada"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {user_type == "supplier" && (
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col border border">NIF: {user.nif}</div>
                    <div className="col border border">
                      Telemóvel: {user.mobile_number}
                    </div>
                    <div className="col border border">
                      Endereço: {user.address}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col border border">Email: {user.email}</div>
                    <div className="col border border">
                      Encomendas: {user.orders ?? 0}
                    </div>
                    <div className="col border border">
                     Produtos: {user.products_list ?? 0}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col border border">
                      Estado Conta: {user.account_status == 0 ? "Desativada" : "Ativada"}
                    </div>
                  </div>
                </div>
              </div>
            )}

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
