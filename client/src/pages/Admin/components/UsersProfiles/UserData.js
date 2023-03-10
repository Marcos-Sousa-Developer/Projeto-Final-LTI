import React, {useEffect} from "react";

function UserData({ read_Only = true, form_disable = true }) { 



  return (
    <div className="col-xxl-8">
      <h5 className="card-title"><i class="bi bi-file-person"></i> Meus Dados Pessoais</h5>
      <div className="card">
        <form>
          <div className="container">
            <div className="row">
              <div className="form-group col-md-4">
                <br></br>
                <label htmlFor="name">Nome</label>
                <input
                  className="form-control"
                  id="name"
                  placeholder="Anderson de Lisboa"
                  disabled={form_disable}
                  readOnly={read_Only}
                ></input>
              </div>
              <div className="form-group col-md-4">
                <br></br>
                <label htmlFor="mobile">Telemóvel</label>
                <input
                  className="form-control"
                  id="mobile"
                  placeholder="916191614"
                  disabled={form_disable}
                  readOnly={read_Only}
                ></input>
              </div>
              <div className="form-group col-md-4">
                <br></br>
                <label htmlFor="date">Data de Nascimento</label>
                <input
                  className="form-control"
                  id="date"
                  placeholder="1990-07-22"
                  disabled={form_disable}
                  readOnly={read_Only}
                ></input>
              </div>
            </div>
            <br></br>
            <div className="form-group col-md-12">
              <label htmlFor="email">Email </label>
              <input
                className="form-control"
                id="email"
                placeholder="anderson@admin.com"
                disabled={form_disable}
                readOnly={read_Only}
              ></input>
            </div>
            <div className="row">
              <div className="form-group col-md-4">
                <br></br>
                <label htmlFor="date">Data de Nascimento</label>
                <input
                  className="form-control"
                  id="date"
                  placeholder="1990-07-22"
                  disabled={form_disable}
                  readOnly={read_Only}
                ></input>
              </div>
              <div className="form-group col-md-4">
                <br></br>
                <label htmlFor="country">País</label>
                <input
                  className="form-control"
                  id="country"
                  placeholder="Portugal"
                  disabled={form_disable}
                  readOnly={read_Only}
                ></input>
              </div>
              <div className="form-group col-md-4">
                <br></br>
                <label htmlFor="state">Distrito</label>
                <input
                  className="form-control"
                  id="state"
                  placeholder="Lisboa"
                  disabled={form_disable}
                  readOnly={read_Only}
                ></input>
              </div>
            </div>
            <br></br>
            <div className="form-group col-md-12">
              <label htmlFor="address">Endereço</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Faculdade de Ciências da Universidade de Lisboa"
                disabled={form_disable}
                readOnly={read_Only}
              ></input>
            </div>
            <br></br>
            <div className="row">
              <div className="form-group col-md-4">
                <label htmlFor="concelho">Concelho</label>
                <input
                  className="form-control"
                  id="concelho"
                  placeholder="Cacém"
                  disabled={form_disable}
                  readOnly={read_Only}
                ></input>
                <br></br>
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="freguesia">Freguesia</label>
                <input
                  className="form-control"
                  id="freguesia"
                  placeholder="Santo António dos Cavaleiros"
                  disabled={form_disable}
                  readOnly={read_Only}
                ></input>
                <br></br>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="postal_code">Código Postal</label>
                <input
                  className="form-control"
                  id="postal_code"
                  placeholder="1900-256"
                  disabled={form_disable}
                  readOnly={read_Only}
                ></input>
              </div>
            </div>
            <br></br>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserData;
