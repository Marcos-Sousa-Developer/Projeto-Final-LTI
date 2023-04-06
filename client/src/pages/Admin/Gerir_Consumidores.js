import React from "react";
import Aside from "./components/Aside";
import Head from "./components/Head";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import FilterSearchUser from "./components/Filters/FilterSearchUser";

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

            <FilterSearchUser url={'/consumers'} nameOfSearch={"Consumidores"} type={"consumer"}></FilterSearchUser>

        </section>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default React.memo(Gerir_Consumidores);
