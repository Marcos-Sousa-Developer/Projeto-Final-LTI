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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Crescimento dos utilizadores durante o ano de 2023',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Novos utilizadores',
        //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        //backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

function BarReports() {



  return (

    <div >

        <Bar options={options} data={data} />
        <br></br>
        <hr></hr>

    </div>
    
    
  )
}

export default BarReports