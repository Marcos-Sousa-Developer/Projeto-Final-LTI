import React, { useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  let tableContent = {}
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Crescimento dos utilizadores',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Novos utilizadores',
        data: labels.map((label) => tableContent[label] ?? 0),
        //backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

function BarReports({datas}) { 

  tableContent = datas


  return (

    <div >

        <Bar options={options} data={data} />
        <br></br>
        <hr></hr>

    </div>
    
    
  )
}

export default BarReports