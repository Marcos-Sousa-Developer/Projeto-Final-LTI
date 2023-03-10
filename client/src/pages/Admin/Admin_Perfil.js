import React, {useState} from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Aside from "./components/Aside";
import Head from "./components/Head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from './components/UsersProfiles/Profile'
import UserData from './components/UsersProfiles/UserData' 
import { Link } from "react-router-dom";

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
                <Link to="/admin" reloadDocument >Home</Link>
              </li>
              <li className="breadcrumb-item active">Meu Perfil</li>
            </ol>
          </nav>
        </div>
        
        <section className="section dashboard">
          <div className="col-lg-12">
            <div className="card">
              <br></br>
              <div className="card-body">
                <div className="row">
                  <Profile></Profile>
                  <UserData read_Only={isread_Only} form_disable={isform_disable}></UserData>
                </div>
                <div className="text-center">
                  {
                    isread_Only ? 
                    (
                      <button className="btn btn-warning" style={{ fontSize: "20px" }} onClick={() => activeOrDeactivateForm()}>
                      Editar
                      </button>
                    ) : 
                    (
                      <div>
                        <button className="btn btn-secondary" style={{ fontSize: "20px" }} onClick={() => activeOrDeactivateForm()}>
                        Fechar
                        </button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-success" style={{ fontSize: "20px" }}>
                        Alterar
                        </button>
                      </div>
                    )
                  }
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

export default Admin_Perfil;
