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

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
      }
    ],
  };

function BarConsumersReports({datas}) { 

  const [show, setShow] = useState(false)

  /**
   * @description set data to barReports
   */
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

export default BarConsumersReports