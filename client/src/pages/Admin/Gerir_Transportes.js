import React, {useEffect, useState } from 'react'
import Aside from "./components/Aside";
import Head from "./components/Head";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import FilterSearch from "./components/Managements/FilterSearch";


// user can be consumer, supplier or admin
function Gerir_Transportes() { 

    
    return (
      <div>
        <HelmetProvider>
          <Helmet>
            <title>Admin-Gerir Transportes</title>
          </Helmet>
        </HelmetProvider>
        <Head></Head>
        <TopBar></TopBar>
        <Aside></Aside>

        <main id="main" className="main">
          <div className="pagetitle" style={{paddingBottom: "10px"}}>
            <h1>Gerir Transportes</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/admin" >
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item active">Gerir Transportes</li>
              </ol>
            </nav>
          </div>
          <section className="section dashboard">

          <FilterSearch url={'/vehicles'} type={"vehicle"} name={"Tansportes"} filter1={"Nome ou iniciais do transporte"} filter2={"Matricula"} 
              filter3={"Unidade de Produção"} filter4={"Capacidade"} filter5={"Data de Produção"}
            >
            </FilterSearch>

          </section>
        </main>
        <Footer></Footer>
      </div>
    );
}


export default Gerir_Transportes