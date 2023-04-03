import React from 'react'
import { Link } from "react-router-dom"
import { Helmet, HelmetProvider } from "react-helmet-async"
import Head from "./components/Head"
import TopBar from "./components/TopBar"
import Aside from "./components/Aside"
import Footer from "./components/Footer"
import GetOrdersReports from './components/Managements/GetOrdersReports'

function Relatorios_Encomendas() {
  return (
    <div>
        <HelmetProvider>
            <Helmet>
            <title>Admin - Relatorios de Consumidores</title>
            </Helmet>
        </HelmetProvider>
        <Head></Head>
        <TopBar></TopBar>
        <Aside></Aside>

        <main id="main" className="main">

        <div className="pagetitle">
          <h1>Relatorios de Encomendas</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin">Home</Link>
              </li>
              <li className="breadcrumb-item active">Relatorios de Encomendas</li>
            </ol>
          </nav>
        </div>

        <br></br>

        <section className="section dashboard">

          <GetOrdersReports></GetOrdersReports>


        </section>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default Relatorios_Encomendas