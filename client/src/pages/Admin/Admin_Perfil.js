import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Aside from "./components/Aside";
import Head from "./components/Head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from './components/UsersProfiles/Profile'
import UserData from './components/UsersProfiles/UserData'

function Admin_Perfil() {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Admin - Perfil</title>
        </Helmet>
      </HelmetProvider>
      <Head></Head>
      <Header></Header>
      <Aside></Aside>
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
              <Profile></Profile>
              <UserData></UserData>
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
      <Footer></Footer>
    </div>
  );
}

export default Admin_Perfil;
