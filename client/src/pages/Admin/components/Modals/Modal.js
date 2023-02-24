import React, { useEffect } from "react";
import "../../assets/styles/style.css";
import activateOrDeactivateUser from "../../../../hooks/activateOrDeactivateUser";

function Modal({ user, isShowingModal, user_type }) {
  const handleUser = () => {
    const newStateAccount = user.account_status == 0 ? 1 : 0;

    let url = "";
    if (user_type == "consumer") {
      url = "/consumers";
    } else {
      url = "/suppliers";
    }

    if (user.account_status == 0) {
      activateOrDeactivateUser(url + "/activate/" + user.id, newStateAccount);
    } else {
      activateOrDeactivateUser(url + "/deactivate/" + user.id, newStateAccount);
    }
  };

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
          className="modal-dialog"
          style={{ width: "100%", backgroundColor: "transparent" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="bi bi-person-fill-gear"> {user_type == "consumer" ? "Consumidor" : "Fornecedor"} </i>
              </h5>

              <button type="button" onClick={isShowingModal} className="close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="container">
                <div class="card" style={{ hover: "black", textAlign: "center" }}>
                  <br></br>
                  <img
                    className="card-img-top rounded mx-auto d-block "
                    src="https://static.thenounproject.com/png/112372-200.png"
                    alt="Card image cap"
                    style={{ width: "50%" }}
                  ></img>
                  <div class="card-body">
                    <label class="align-self-center">Nome</label>
                    <input className="form-control" id="name" style={{textAlign:"center"}} placeholder={user.name} disabled readOnly></input> 
                    <br></br>
                    <label class="align-self-center">Email</label>
                    <input className="form-control" id="email" style={{textAlign:"center"}} placeholder={user.email} disabled readOnly></input> 
                    <br></br>
                    <div class="d-flex align-items-center justify-content-center"></div>
                      <label class="align-self-center" htmlFor="status">Estado da Conta</label>
                      <input className="form-control" id="status" style={{textAlign:"center"}} placeholder={user.account_status == 0 ? "Desativada" : "Ativada"} disabled readOnly></input> 
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
                Fechar
              </button>

              <button
                type="button"
                onClick={() => handleUser()}
                className="btn btn-primary"
              >
                {user.account_status == 0 ? "Ativar" : "Desativar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
