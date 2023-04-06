import React, { useEffect, useState } from 'react'
import {Chart as ChartJS, CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

  const labels = ['0-10 km', '10-50 km', '50-100 km', '100-500 km', '500-1000 km', 'more than 1000 km'];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Distribuição dos produtos encomendados pela proximidade (km) entre consumidores e fornecedores',
      },
    },
  };

  let data = {
    labels,
    datasets: [
      {
        label: 'Distribuição dos produtos encomendados em km',
        data: labels.map((label) =>  0),
      }
    ],
  };

function BarOrderReports_km({datas}) { 

  const [show, setShow] = useState(false)

  /**
   * @description set data to barReports
   */
  function setData() {
    data = {
      labels,
      datasets: [
        {
          label: 'Distribuição dos produtos encomendados',
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

export default  BarOrderReports_km