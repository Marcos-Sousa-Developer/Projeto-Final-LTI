import React, { useEffect, useState } from 'react'
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

  const labels = ['freguesia', 'município', 'distrito', 'país', 'continente', 'mundo'];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Distribuição dos produtos encomendados pela proximidade (localização) entre consumidores e fornecedores',
      },
    },
  };

  let data = {
    labels,
    datasets: [
      {
        label: 'Distribuição dos produtos encomendados',
        data: labels.map((label) => 0),
      }
    ],
  };

function LocalImpact({datas}) { 

  const [show, setShow] = useState(false)

  /**
   * @description set data to barReports
   */
  function setData() {
    data = {
      labels,
      datasets: [
        {
          label: 'Distribuição dos produtos encomendados por localização',
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

export default  LocalImpact