import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Aside from "./components/Aside";
import Head from "./components/Head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UsersProfile from "./components/UsersProfile";

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
      <UsersProfile></UsersProfile>
      <Footer></Footer>
    </div>
  );
}

export default Admin_Perfil;
