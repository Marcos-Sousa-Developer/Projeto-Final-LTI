import React from "react";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import Head from "./components/Head";
import Header from "./components/Header";
import Main from "./components/Sections/Section";
import {Helmet, HelmetProvider} from 'react-helmet-async'; 


function Dashboard() { 

  let apexCharts = require("./assets/vendor/apexcharts/apexcharts.min.js");
  let bootstrap = require("./assets/vendor/bootstrap/js/bootstrap.bundle.min.js");
  let chart = require("./assets/vendor/chart.js/chart.umd.js");
  let echarts = require("./assets/vendor/echarts/echarts.min.js");
  let quill = require("./assets/vendor/quill/quill.min.js");
  let datatables = require("./assets/vendor/simple-datatables/simple-datatables.js");
  let tinymce = require("./assets/vendor/tinymce/tinymce.min.js");
  let php = require("./assets/vendor/php-email-form/validate.js");
  let main = require("./assets/js/main.js");
  
  return (
    <div>
      <Head></Head>

      <Header></Header>

      <Aside></Aside>

      <Main></Main> 

      <Footer></Footer>

      {/* End Page Title */}
      <script src={apexCharts.name}></script>
      <script src={bootstrap.name}></script>
      <script src={chart.name}></script>
      <script src={echarts.name}></script>
      <script src={quill.name}></script>
      <script src={datatables.name}></script>
      <script src={tinymce.name}></script>
      <script src={php.name}></script>
      {/* Template Main JS File */}
      <script src={main.name}></script>
    </div>
  );
}

export default Dashboard;
