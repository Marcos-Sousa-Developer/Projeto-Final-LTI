import React from "react";
import Aside from "./components/Aside";
import Head from "./components/Head";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import FilterSearch from "./components/Managements/FilterSearch";

function Gerir_Consumidores() { 

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Admin-Gerir Consumidores</title>
        </Helmet>
      </HelmetProvider>
      <Head></Head>
      <TopBar></TopBar>
      <Aside></Aside>

      <main id="main" className="main">
        <div className="pagetitle" style={{paddingBottom: "10px"}}>
          <h1> Gerir Consumidores</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin">Home</Link>
              </li>
              <li className="breadcrumb-item active">Gerir Consumidores</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">

            <FilterSearch url={'/consumers'} type={"consumer"} name={"Consumidores"} filter1={"Nome ou iniciais do consumidor"} filter2={"Indentifcador do Consumidor"} 
              filter3={"Email"} filter4={"Endereço"} filter5={"Telemóvel / Telefone"}
            >
            </FilterSearch>

        </section>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default React.memo(Gerir_Consumidores);
