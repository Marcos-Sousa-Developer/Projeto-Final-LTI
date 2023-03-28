import React, { useEffect, useState } from "react";
import Aside from "./components/Aside";
import Head from "./components/Head";
import TopBar from "./components/TopBar";
import Navigator from "./components/Navigator";
import AppearUserModal from "./components/Modals/AppearUserModal";
import Footer from "./components/Footer";
import SearchBar from './components/ProfilesComponents/SearchBar';
import { Helmet, HelmetProvider } from "react-helmet-async";
import getAllFromDB from "../../hooks/getAllFromDB";
import { Link } from "react-router-dom";


const $ = require('jquery')
$.DataTable = require('datatables.net')

function Gerir_consumidores() { 

  const consumers = getAllFromDB("/consumers") 

  const [show, setShow] = useState(false) 

  const isShowingModal = () => {
    show == true ? setShow(false) : setShow(true)
  }

  useEffect(() => {

    $('#example').DataTable({
      processing: true,
      "bDestroy": true
    });
     
  },[consumers])

  if (consumers.length == 0) {
    return <div className="App">Loading...</div>;
  }
  

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
        <div className="pagetitle">
          <h1> Gerir Consumidores</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin"  >Home</Link>
              </li>
              <li className="breadcrumb-item active">Gerir Consumidores</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="col-lg-12">
            <div className="row">
              <h5 className="card-title"><i className="bi bi-bag"></i> Consumidores 
                {/*<SearchBar></SearchBar>*/}
              </h5>
              <div className="col-12">
                <table id="example" class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col">Estado</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                  {
                    consumers.map((user) => {
                      return (
                        <tr key={user.id}>
                          <th scope="row">{user.id}</th>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.account_status == 1 ? "Ativado" : "Desativado"}</td>
                          <td><button onClick={isShowingModal} >
                              <i className="bi bi-pencil-square"></i>
                              </button>
                              {
                                show && (<AppearUserModal user={user} user_type={"consumidor"} isShowingModal={isShowingModal}></AppearUserModal>)
                              }
                          </td>
                        </tr>)
                    })
                  }
                </tbody>
              </table>
                {/*<Navigator users={consumers} user_type={"consumer"}></Navigator>*/}    
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
