import React, { useEffect, useState, useMemo } from 'react'
import {NavbarSupplier, Footer, SubHeading, Searchbar} from '../../../components/index';
import './SupplierPage.css';
import LoadingPage from '../../LoadingPage';
import OrderStats from './SupplierOrderReport/OrderStats';
import getAllFromDB from '../../../hooks/getAllFromDB'; 
import SupplierBar from '../SupplierBar/SupplierBar';

function SupplierPage() { 

  const [isLoading, setLoading] = useState(false); 

  const [datas, setDatas] = useState({})

  const [saleToday, setSaleToday] = useState(0)
  const [saleMonth, setSaleMonth] = useState(0) 

  const [fiveSells, setFiveSells] = useState([])

  const getThisDay = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  const createData = (values) => { 

    const thismonth = new Date().getMonth()+1; 
    const today = getThisDay()

    let months = {
      1:'jan.', 2:'fev.', 3:'mar.', 4:'abr.', 
      5:'maio.', 6:'jun.', 7:'jul.', 8:'ago.', 9:'set.', 
      10:'out.', 11:'nov.', 12:'dez.'
    }

    let data = {'jan.':0,'fev.':0, 'mar.':0, 'abr.':0, 
            'maio.':0, 'jun.':0, 'jul.':0, 'ago.':0, 'set.':0, 
            'out.':0, 'nov.':0, 'dez.':0} 

            for (const value of values) {

              const date = new Date(value.created_at);
              const isoDateString = date.toISOString();
              const month = isoDateString.substring(6, 7); 

              if (thismonth == month) {
                setSaleMonth((prev) => prev + 1)
              }

              if (today == isoDateString.substring(0, 10)) {
                setSaleToday((prev) => prev + 1)
              }


              data[months[month]] +=1
              
            } 
    setDatas(data)


  }


  const getMySells = async () => {

    const response = await getAllFromDB('/orderedProducts',{
      product_owner_uid: true,
      created_at_init: new Date().getFullYear()+'-01-01',
      created_at_final: new Date().getFullYear()+'-12-31'
    })
     
    setFiveSells(response.slice(0, 5) );
    
    createData(response)

  }

  useEffect( () => {
    setLoading(true)
    let data = {}
    async function getData() {
      await getMySells()
      setLoading(false)
    }
    getData()
  },[])

  return (
    <>
    {isLoading ? 
      <LoadingPage></LoadingPage>
    :
      <>
        <NavbarSupplier></NavbarSupplier>
        <div className='app__SupplierPage main__container'>   
          <SubHeading title="Home"/>
          <SupplierBar></SupplierBar>
          <div className='app__SupplierPage_boxes'>
            <div className='app__SupplierPage_boxesEsquerda'>
              <div className='app__SupplierPage_boxesEsquerda1'>
                <p>Estatísticas</p>
                <div className='app__SupplierPage_boxesEsquerda1Est'>
                  { datas === {} ? <div>loading</div> : <OrderStats datas={datas}></OrderStats>}
                  <button onClick={() => console.log(datas)}>Exportar dados</button>
                </div>

              </div>
              <div className='app__SupplierPage_boxesEsquerda2'>
                <p>Últimas ordens</p>
                <div className='app__SupplierPage_boxesEsquerda1Ult'>
                  
                </div>

              </div>
            </div>

            <div className='app__SupplierPage_boxesDireita'>
              <div className='app__SupplierPage_boxesDireita1'>
                <div className='app__SupplierPage_boxesDireita1Nmr'>
                  <div className='app__SupplierPage_boxesDireita1Nmr1'>
                    <p>Hoje</p>
                    <p><span className='numeroLaranja'>{saleToday}</span> vendas</p>
                  </div>
                  <div className='app__SupplierPage_boxesDireita1Nmr2'>
                    <p>Este mês</p>
                    <p><span className='numeroLaranja'>{saleMonth}</span> vendas</p>
                  </div>
                </div>
                <p>5 Vendas Recentes</p>
                <div className='app__SupplierPage_boxesDireita1Vend'>
                  {
                    fiveSells.map((sells) => {

                      return <div> {sells.id + " " + sells.price} </div>

                    })
                  }
                </div>

              </div>
            
            </div>
          </div>
        </div>
        <Footer></Footer>
      </>
      }
    </>
  );

}

export default SupplierPage;