import React from "react";
import Aside from "./components/Aside";
import Head from "./components/Head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import getUsersType from "../../hooks/getUsersType";
import Navigator from "./components/Navigator";

function Gerir_fornecedores() {

    const suppliers = getUsersType("/suppliers")

    return (
    <div>
        <HelmetProvider>
        <Helmet>
            <title>Admin-Gerir Fornecedores</title>
        </Helmet>
        </HelmetProvider>
        <Head></Head>
        <Header></Header>
        <Aside></Aside>

        <main id="main" className="main">
        <div className="pagetitle">
            <h1>Gerir Fornecedores</h1>
            <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item active">Gerir Fornecedores</li>
            </ol>
            </nav>
        </div>
        <section className="section dashboard">
            <div className="col-lg-12">
            <div className="row">
                <div className="col-12">
                    <h5 className="card-title">Fornecedores</h5>
                    <Navigator users={suppliers} user_type={"supplier"}></Navigator>
                </div>
            </div>
            </div>
        </section>
        </main>
        <Footer></Footer>
    </div>
    );
}

export default React.memo(Gerir_fornecedores);
