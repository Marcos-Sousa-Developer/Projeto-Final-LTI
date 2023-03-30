import React from "react";
import Aside from "./components/Aside";
import Head from "./components/Head";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import FilterSearch from "./components/Managements/FilterSearch";

function Gerir_Adminstradores() { 

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Admin-Gerir Administradores</title>
        </Helmet>
      </HelmetProvider>
      <Head></Head>
      <TopBar></TopBar>
      <Aside></Aside>

      <main id="main" className="main">
        <div className="pagetitle" style={{paddingBottom: "10px"}}>
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
          <FilterSearch url={'/admins'} type={"admin"} name={"Adminstradores"} filter1={"Nome ou iniciais do administrador"} filter2={"Indentifcador do Administrador"} 
                filter3={"Email"} filter4={"Endereço"} filter5={"Telemóvel / Telefone"}>
          </FilterSearch>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default React.memo(Gerir_Adminstradores);
