import React, {useState, useEffect} from 'react'

function UsersProfile({read_Only=true, form_disable = true}) {

  const [isread_Only, setRead_Only] = useState(true)
  const [isform_disable, setForm_disable] = useState(true) 

  useEffect(() => {
    read_Only ?  null : setRead_Only(false)
    form_disable ?  null : setForm_disable(false)

  },[isread_Only, isform_disable] )

  
  return (
    <form>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Meu Perfil</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Meu Perfil</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-xxl-4">
                <h5 className="card-title">Perfil </h5>
                <div className="card" style={{ textAlign: "center" }}>
                  <br></br>
                  <img
                    className="card-img-top rounded mx-auto d-block "
                    src="https://img.freepik.com/premium-photo/3d-render-image-smirking-cool-yellow-emoticon-emoji_477250-7.jpg?w=2000"
                    alt="Card image cap"
                    style={{ width: "60%" }}
                  ></img>
                  <div className="card-body">
                    <h5 className="card-title">Anderson Bandera</h5>
                    <p className="card-text">GreaterGoods Admin</p>
                    <p className="card-text">
                      fcXXXXX, Faculdade de Ciências da UL
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-8">
                <h5 className="card-title">Meus Dados </h5>
                <div className="card">
                  <div className="container">
                    <div className="row">
                      <div className="form-group col-md-4">
                        <br></br>
                        <label htmlFor="name">Nome</label>
                        <input
                          className="form-control"
                          id="name"
                          placeholder="Anderson de Lisboa"
                          disabled={isread_Only}
                          readOnly={isform_disable}
                        ></input>
                      </div>
                      <div className="form-group col-md-4">
                        <br></br>
                        <label htmlFor="mobile">Telemóvel</label>
                        <input
                          className="form-control"
                          id="mobile"
                          placeholder="916191614"
                          disabled={isread_Only}
                          readOnly={isform_disable}
                        ></input>
                      </div>
                      <div className="form-group col-md-4">
                        <br></br>
                        <label htmlFor="telephone">Telefone</label>
                        <input
                          className="form-control"
                          id="telephone"
                          placeholder="1234567"
                          disabled={isread_Only}
                          readOnly={isform_disable}
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
                        disabled={isread_Only}
                        readOnly={isform_disable}
                      ></input>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-4">
                        <br></br>
                        <label htmlFor="gender">Género</label>
                        <input
                          className="form-control"
                          id="gender"
                          placeholder="Masculino"
                          disabled={isread_Only}
                          readOnly={isform_disable}
                        ></input>
                      </div>
                      <div className="form-group col-md-4">
                        <br></br>
                        <label htmlFor="date">Data de Nascimento</label>
                        <input
                          className="form-control"
                          id="date"
                          placeholder="1990-07-22"
                          disabled={isread_Only}
                          readOnly={isform_disable}
                        ></input>
                      </div>
                      <div className="form-group col-md-4">
                        <br></br>
                        <label htmlFor="country">País</label>
                        <input
                          className="form-control"
                          id="country"
                          placeholder="Portugal"
                          disabled={isread_Only}
                          readOnly={isform_disable}
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
                        disabled={isread_Only}
                        readOnly={isform_disable}
                      ></input>
                    </div>
                    <br></br>
                    <div className="row">
                      <div className="form-group col-xl-4">
                        <label htmlFor="state">Distrito</label>
                        <input
                          className="form-control"
                          id="state"
                          placeholder="Lisboa"
                          disabled={isread_Only}
                          readOnly={isform_disable}
                        ></input>
                        <br></br>
                      </div>
                      <div className="form-group col-xl-4">
                        <label htmlFor="concelho">Concelho</label>
                        <input
                          className="form-control"
                          id="concelho"
                          placeholder="Cacém"
                          disabled={isread_Only}
                          readOnly={isform_disable}
                        ></input>
                        <br></br>
                      </div>
                      <div className="form-group col-xl-4">
                        <label htmlFor="postal_code">Código Postal</label>
                        <input
                          className="form-control"
                          id="postal_code"
                          placeholder="1900-256"
                          disabled={isread_Only}
                          readOnly={isform_disable}
                        ></input>
                      </div>
                    </div>
                    <br></br>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="text-center">
          <button className="btn">
            <p style={{ fontSize: "20px" }}>
              <i className="bi bi-pencil-square"></i> Editar
            </p>
          </button>
        </div>
      </main>
    </form>
  );
}

export default UsersProfile