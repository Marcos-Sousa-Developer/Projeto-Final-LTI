import React from "react";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import Head from "./components/Head";
import Header from "./components/Header";
import Main from "./components/Sections/Main";
import {Helmet, HelmetProvider} from 'react-helmet-async'; 
import Scripts from "./components/Scripts";

function Dashboard() { 

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Admin - Dashboard</title>
        </Helmet>
      </HelmetProvider>

      <Head></Head>

      <Header></Header>

      <Aside></Aside>

      <Main></Main> 

      <Footer></Footer>

      <Scripts></Scripts>
    </div>
  );
}

export default Dashboard;
