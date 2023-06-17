import React from "react";
import Aside from "./components/Aside";
import Head from "./components/Head";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import FilterSearchUser from "./components/Filters/FilterSearchUser";

function TransportadoraIndex() { 

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Transportadora</title>
        </Helmet>
      </HelmetProvider>
      <Head></Head>

      <main className="main" style={{padding:"60px"}}>

        <div className="pagetitle d-flex justify-content-center d-flex justify-content-center align-items-center">
          <h1> Transportadora </h1>
        </div>
      <br></br>
        <section className="section dashboard">

          <div className="col-lg-12">

            <div className="row justify-content-center d-flex align-items-center center">
              <div className="col-xxl-4 mb-4 ">
                <label className="justify-content-center">Crendencial de Acesso</label>
                <input type="text" className="form-control"></input>
              </div>
            </div>

            <div className="row justify-content-center d-flex align-items-center center">
              <div className="col-xxl-4 mb-4 ">
                <label className="justify-content-center">Código de Acesso</label>
                <input type="text" className="form-control"></input>
              </div>
            </div>

            <div className="row justify-content-center d-flex align-items-center center">
              <div className="col-xxl-4 mb-4 ">
                <label className="justify-content-center">Número de Encomenda</label>
                <input type="text" className="form-control"></input>
              </div>
            </div>

            <div className="row justify-content-center d-flex align-items-center center">
              <div className="col-xxl-4 mb-4 ">
                <label className="justify-content-center">Código de Validação</label>
                <input type="text" className="form-control"></input>
              </div>
            </div>

            <div className="row justify-content-center d-flex align-items-center">
              <div className="col-xxl-4 mb-4 ">
                <button type="submit" className="btn btn-primary" >
                    Validar Encomenda
                </button>
              </div>
            </div>

          </div>

        </section>

      </main>

      <footer className="footer">
          <div className="copyright">
            © Copyright{" "}
            <strong>
              <span>Fcul Grupo01</span>
            </strong>
            . All Rights Reserved
          </div>
          <div className="credits">
            Designed by <a href="#">Grupo01 LTI</a>
          </div>
        </footer>

    </div>
  );
}

export default React.memo(TransportadoraIndex);
