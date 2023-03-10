import React from "react";
import Aside from "./components/Aside";
import Head from "./components/Head";
import Header from "./components/Header";
import Navigator from "./components/Navigator";
import Footer from "./components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import getUsersType from "../../hooks/getUsersType";
import { Link } from "react-router-dom";

function Gerir_consumidores() { 

  const consumers = getUsersType("/consumers")

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Admin-Gerir Consumidores</title>
        </Helmet>
      </HelmetProvider>
      <Head></Head>
      <Header></Header>
      <Aside></Aside>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1> Gerir Consumidores</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin" reloadDocument >Home</Link>
              </li>
              <li className="breadcrumb-item active">Gerir Consumidores</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-12">
                <h5 className="card-title"><i class="bi bi-bag"></i> Consumidores </h5>
                <Navigator users={consumers} user_type={"consumer"}></Navigator>    
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default React.memo(Gerir_consumidores);
