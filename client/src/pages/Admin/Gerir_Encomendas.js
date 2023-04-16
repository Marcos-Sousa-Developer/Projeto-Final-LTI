import React, {useEffect, useState } from 'react'
import Aside from "./components/Aside";
import Head from "./components/Head";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import FilterSearchOrder from './components/Filters/FilterSearchOrder';

// user can be consumer, supplier or admin
function Gerir_Encomendas() { 

    
    return (
      <div>
        <HelmetProvider>
          <Helmet>
            <title>Admin-Gerir Encomendas</title>
          </Helmet>
        </HelmetProvider>
        <Head></Head>
        <TopBar></TopBar>
        <Aside></Aside>

        <main id="main" className="main">
          <div className="pagetitle" style={{paddingBottom: "10px"}}>
            <h1>Gerir Encomendas</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/admin" >
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item active">Gerir Encomendas</li>
              </ol>
            </nav>
          </div>
          <section className="section dashboard">

            <FilterSearchOrder></FilterSearchOrder>

          </section>
        </main>
        <Footer></Footer>
      </div>
    );
}


export default Gerir_Encomendas