import React from 'react'
import { Link } from "react-router-dom"
import { Helmet, HelmetProvider } from "react-helmet-async"
import Head from "./components/Head"
import TopBar from "./components/TopBar"
import Aside from "./components/Aside"
import Footer from "./components/Footer"
import GetUsersReports from './components/Reports/GetUsersReports'

function Relatorios_Fornecedores() {
  
  return (
    <div>

      <HelmetProvider>
        <Helmet>
          <title>Admin - Relatorios de Fornecedores</title>
        </Helmet>
      </HelmetProvider>
      <Head></Head>
      <TopBar></TopBar>
      <Aside></Aside>

      <main id="main" className="main">

        <div className="pagetitle">
          <h1>Relatorios de Fornecedores</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin">Home</Link>
              </li>
              <li className="breadcrumb-item active">Relatorios de Fornecedores</li>
            </ol>
          </nav>
        </div>
        <br></br>

        <section className="section dashboard">

         <GetUsersReports url={'/suppliers'} type={"Fornecedores"}></GetUsersReports>


        </section>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default Relatorios_Fornecedores