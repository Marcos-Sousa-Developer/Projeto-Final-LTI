import React from 'react'
import { Link } from "react-router-dom"
import { Helmet, HelmetProvider } from "react-helmet-async"
import Head from "./components/Head"
import TopBar from "./components/TopBar"
import Aside from "./components/Aside"
import Footer from "./components/Footer"
import GetReports from './components/Managements/GetReports'
import BarReports from './components/Reports/BarReports'

function Relatorios_Consumidores() {
  
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
          <h1>Relatorios de Consumidores</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin">Home</Link>
              </li>
              <li className="breadcrumb-item active">Relatorios de Consumidores</li>
            </ol>
          </nav>
        </div>
        <br></br>

        <BarReports></BarReports>

        <section className="section dashboard">

         <GetReports></GetReports>


        </section>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default Relatorios_Consumidores