import React, { useState } from "react";

function UserData() {
  const [isread_Only, setisread_Only] = useState(true)
  const [isform_disable, setisform_disable] = useState(true)


  const activeOrDeactivateForm = () => {

    isread_Only ? setisread_Only(false) : setisread_Only(true)
    isform_disable ? setisform_disable(false) : setisform_disable(true)

  }
  return (
    <div className="col-xxl-12">
      <h5 className="card-title">
        <i className="bi bi-file-person"></i> Meus Dados Pessoais
      </h5>
      <div className="card">
        <form>
          <div className="container">
          <br></br>
            <div className="row">
              <div className="form-group col-md-4 mb-3">
                <label htmlFor="name">Nome</label>
                <input
                  className="form-control"
                  id="name"
                  placeholder="Anderson de Lisboa"
                  disabled={isform_disable}
                  readOnly={isread_Only}
                ></input>
              </div>
              <div className="form-group col-md-4 mb-3">
                <label htmlFor="mobile">Telemóvel</label>
                <input
                  className="form-control"
                  id="mobile"
                  placeholder="916191614"
                  disabled={isform_disable}
                  readOnly={isread_Only}
                ></input>
              </div>
              <div className="form-group col-md-4 mb-3">
                <label htmlFor="date">Data de Nascimento</label>
                <input
                  className="form-control"
                  id="date"
                  placeholder="1990-07-22"
                  disabled={isform_disable}
                  readOnly={isread_Only}
                ></input>
              </div>
            </div>
            <div className="form-group col-md-12 mb-3">
              <label htmlFor="email">Email </label>
              <input
                className="form-control"
                id="email"
                placeholder="anderson@admin.com"
                disabled={isform_disable}
                readOnly={isread_Only}
              ></input>
            </div>
            <div className="row">
              <div className="form-group col-md-4 mb-3">
                <label htmlFor="date">Data de Nascimento</label>
                <input
                  className="form-control"
                  id="date"
                  placeholder="1990-07-22"
                  disabled={isform_disable}
                  readOnly={isread_Only}
                ></input>
              </div>
              <div className="form-group col-md-4 mb-3">
                <label htmlFor="country">País</label>
                <input
                  className="form-control"
                  id="country"
                  placeholder="Portugal"
                  disabled={isform_disable}
                  readOnly={isread_Only}
                ></input>
              </div>
              <div className="form-group col-md-4 mb-3">
                <label htmlFor="state">Distrito</label>
                <input
                  className="form-control"
                  id="state"
                  placeholder="Lisboa"
                  disabled={isform_disable}
                  readOnly={isread_Only}
                ></input>
              </div>
            </div>
            <div className="form-group col-md-12 mb-3">
              <label htmlFor="address">Endereço</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Faculdade de Ciências da Universidade de Lisboa"
                disabled={isform_disable}
                readOnly={isread_Only}
              ></input>
            </div>
            <div className="row">
              <div className="form-group col-md-4 mb-3">
                <label htmlFor="concelho">Concelho</label>
                <input
                  className="form-control"
                  id="concelho"
                  placeholder="Cacém"
                  disabled={isform_disable}
                  readOnly={isread_Only}
                ></input>
              </div>
              <div className="form-group col-md-5 mb-3">
                <label htmlFor="freguesia">Freguesia</label>
                <input
                  className="form-control"
                  id="freguesia"
                  placeholder="Santo António dos Cavaleiros"
                  disabled={isform_disable}
                  readOnly={isread_Only}
                ></input>
              </div>
              <div className="form-group col-md-3 mb-3">
                <label htmlFor="postal_code">Código Postal</label>
                <input
                  className="form-control"
                  id="postal_code"
                  placeholder="1900-256"
                  disabled={isform_disable}
                  readOnly={isread_Only}
                ></input>
              </div>
            </div>
          </div>
          <div className="text-center" style={{paddingBottom: "15px"}}>
            {isread_Only ? (
              <button
                className="btn btn-warning"
                style={{ fontSize: "15px" }}
                onClick={() => activeOrDeactivateForm()}
              >
                Editar
              </button>
            ) : (
              <div>
                <button
                  className="btn btn-secondary"
                  style={{ fontSize: "15px" }}
                  onClick={() => activeOrDeactivateForm()}
                >
                  Fechar
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className="btn btn-success"
                  style={{ fontSize: "15px" }}
                >
                  Alterar
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserData;
