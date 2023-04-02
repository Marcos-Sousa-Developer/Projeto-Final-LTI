import React, { useEffect, useState } from 'react'
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

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  let tableContent = {}

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

  let data = {
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

  const [show, setShow] = useState(false)

  function setData() {
    data = {
      labels,
      datasets: [
        {
          label: 'Novos utilizadores',
          data: labels.map((label) => datas[label] ?? 0),
          backgroundColor: 'coral',
        }
      ],
    };
    setShow(true)
  }

  useEffect(() => {

    if(datas !== {}) {

      setData()


    }
  })


  return (

    <div >
        {
          show &&  <Bar options={options} data={data} />
        }
        
        <br></br>
        <hr></hr>

    </div>
    
    
  )
}

export default BarReports