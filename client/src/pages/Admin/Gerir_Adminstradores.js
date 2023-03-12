import React from "react";
import Aside from "./components/Aside";
import Head from "./components/Head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

function Gerir_Adminstradores() { 

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Admin-Gerir Administradores</title>
        </Helmet>
      </HelmetProvider>
      <Head></Head>
      <Header></Header>
      <Aside></Aside>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Gerir Adminstradores</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin"  >Home</Link>
              </li>
              <li className="breadcrumb-item active">Gerir Adminstradores</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="col-xl-12">
            
            <div className="row ">
              <h5 className="card-title"><i className="bi bi-star"></i> Adminstradores </h5>

                <div className="col-xxl-3">
                  <div className="card" style={{ textAlign: "center" }}>
                    <br></br>
                    <img className="card-img-top rounded mx-auto d-block" src="https://nationalgeographic.pt/images/revistas/192/MACACOS/macacos3A.jpg" alt="Card image cap"  style={{ width: "60%" }}></img>
                    <div className="card-body">
                      <h5 className="card-title">Gabriel Fonseca</h5>
                      <p className="card-text">fcXXXXX@greatergoods.admin.pt</p>
                      <a href="#" className="btn btn-primary">Ver Detalhes</a>
                      {/*<i className="bi bi-trash3" style={{float:"right", fontSize:"1.5rem"}}></i>*/}
                    </div>
                  </div>
                </div>

                <div className="col-xxl-3">
                  <div className="card" style={{ textAlign: "center" }}>
                    <br></br>
                    <img className="card-img-top rounded mx-auto d-block" src="https://nationalgeographic.pt/images/revistas/192/MACACOS/macacos3A.jpg" alt="Card image cap"  style={{ width: "60%" }}></img>
                    <div className="card-body">
                      <h5 className="card-title">Marcos Leitão</h5>
                      <p className="card-text">fcXXXXX@greatergoods.admin.pt</p>
                      <a href="#" className="btn btn-primary">Ver Detalhes</a>
                      {/*<i className="bi bi-trash3" style={{float:"right", fontSize:"1.5rem"}}></i>*/}
                    </div>
                  </div>
                </div>

                <div className="col-xxl-3">
                  <div className="card" style={{ textAlign: "center" }}>
                    <br></br>
                    <img className="card-img-top rounded mx-auto d-block" src="https://nationalgeographic.pt/images/revistas/192/MACACOS/macacos3A.jpg" alt="Card image cap"  style={{ width: "60%" }}></img>
                    <div className="card-body">
                      <h5 className="card-title">Miguel Fernandes</h5>
                      <p className="card-text">fcXXXXX@greatergoods.admin.pt</p>
                      <a href="#" className="btn btn-primary">Ver Detalhes</a>
                      {/*<i className="bi bi-trash3" style={{float:"right", fontSize:"1.5rem"}}></i>*/}
                    </div>
                  </div>
                </div>

                <div className="col-xxl-3">
                  <div className="card" style={{ textAlign: "center" }}>
                    <br></br>
                    <img className="card-img-top rounded mx-auto d-block" src="https://nationalgeographic.pt/images/revistas/192/MACACOS/macacos3A.jpg" alt="Card image cap" style={{ width: "60%" }}></img>
                    <div className="card-body">
                      <h5 className="card-title">Pedro Moita</h5>
                      <p className="card-text">fcXXXXX@greatergoods.admin.pt</p>
                      <a href="#" className="btn btn-primary">Ver Detalhes</a>
                      {/*<i className="bi bi-trash3" style={{float:"right", fontSize:"1.5rem"}}></i>*/}
                    </div>
                  </div>
                </div>

                <div className="col-xxl-3">
                  <div className="card" style={{ textAlign: "center" }}>
                    <br></br>
                    <img className="card-img-top rounded mx-auto d-block" src="https://nationalgeographic.pt/images/revistas/192/MACACOS/macacos3A.jpg" alt="Card image cap" style={{ width: "60%" }}></img>
                    <div className="card-body">
                      <h5 className="card-title">Rafel Ribeiro</h5>
                      <p className="card-text">fcXXXXX@greatergoods.admin.pt</p>
                      <div className="" >
                        <a href="#" className="btn btn-primary">Ver Detalhes</a>
                        {/*<i className="bi bi-trash3" style={{float:"right", fontSize:"1.5rem"}}></i>*/}
                      </div>
                    </div>
                  </div>
                </div>
 
              
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default React.memo(Gerir_Adminstradores);
