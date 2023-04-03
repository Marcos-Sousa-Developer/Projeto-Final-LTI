import React from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import Aside from "./components/Aside"
import Head from "./components/Head"
import TopBar from "./components/TopBar"
import Footer from "./components/Footer"
import Profile from './components/UsersProfiles/Profile'
import UserData from './components/UsersProfiles/UserData' 
import { Link } from "react-router-dom"
import SupportActivity from "./components/ProfilesComponents/SupportActivity"
import MessagesActivity from "./components/ProfilesComponents/MessagesActivity"


function Admin_Perfil() {

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Admin - Perfil</title>
        </Helmet>
      </HelmetProvider>
      <Head></Head>
      <TopBar></TopBar>
      <Aside></Aside>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Meu Perfil</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin">Home</Link>
              </li>
              <li className="breadcrumb-item active">Meu Perfil</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="col-lg-12">
            <div className="row">
              <Profile></Profile>

              <div className="col-lg-8">
                <UserData></UserData>

                <div className="row justify-content-center">
                  <SupportActivity></SupportActivity>
                  <MessagesActivity></MessagesActivity>
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

export default Admin_Perfil
