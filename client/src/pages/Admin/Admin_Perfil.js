import React, {useState} from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Aside from "./components/Aside";
import Head from "./components/Head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from './components/UsersProfiles/Profile'
import UserData from './components/UsersProfiles/UserData'

function Admin_Perfil() {

  const [isread_Only, setRead_Only] = useState(true);
  const [isform_disable, setForm_disable] = useState(true);


  const activeOrDeactivateForm = () => {

    console.log("ok")

    isread_Only ? setRead_Only(false) : setRead_Only(true);
    isform_disable ? setForm_disable(false) : setForm_disable(true);

  }

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
              <form>
                <div className="row">
                  <Profile></Profile>
                  <UserData read_Only={isread_Only} form_disable={isform_disable}></UserData>
                </div>
              </form>
            </div>
          </section>
        <div className="text-center">

          {
            isread_Only ? 
            (
              <button className="btn" onClick={() => activeOrDeactivateForm()}>
              <p style={{ fontSize: "20px" }}>
                <i className="bi bi-pencil-square"></i> Editar
              </p>
              </button>
            ) : 
            (
              <div>
                <button className="btn" onClick={() => activeOrDeactivateForm()}>
                <p style={{ fontSize: "40px" }}>
                  <i className="bi bi-x-circle"></i>
                </p>
                </button>
                <button className="btn">
                <p style={{ fontSize: "40px" }}>
                  <i className="bi bi-check-circle"></i>
                </p>
                </button>
              </div>
            )
          }

        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default Admin_Perfil;
