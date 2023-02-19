import React from 'react'

function Scripts() {


  let apexCharts = require("../assets/vendor/apexcharts/apexcharts.min.js");
  let bootstrap = require("../assets/vendor/bootstrap/js/bootstrap.bundle.min.js");
  let chart = require("../assets/vendor/chart.js/chart.umd.js");
  let echarts = require("../assets/vendor/echarts/echarts.min.js");
  let quill = require("../assets/vendor/quill/quill.min.js");
  let datatables = require("../assets/vendor/simple-datatables/simple-datatables.js");
  let tinymce = require("../assets/vendor/tinymce/tinymce.min.js");
  let main = require("../assets/js/main.js");
  

  return (
    <>
      {/* End Page Title */}
      <script src={apexCharts.name}></script>
      <script src={bootstrap.name}></script>
      <script src={chart.name}></script>
      <script src={echarts.name}></script>
      <script src={quill.name}></script>
      <script src={datatables.name}></script>
      <script src={tinymce.name}></script>
      {/* Template Main JS File */}
      <script src={main.name}></script>
    </>
  );
}

export default Scripts
