import React, { useEffect, useState, useMemo } from 'react'
import {NavbarSupplier, Footer, SubHeading, Searchbar} from '../../../components/index';
import './SupplierPage.css';
import LoadingPage from '../../LoadingPage';
import getAllFromDB from '../../../hooks/getAllFromDB'; 
import SupplierBar from '../../../components/SupplierBar/SupplierBar';
import LocalImpact from './SupplierOrderReport/LocalImpact';
import { PriceDisplay } from '../../../utilities/formatCurrency';

let tableLocationData = {}

function SupplierPage() { 

  const [isLoading, setLoading] = useState(false); 

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

  async function getSupplierAddress(){
    let supplier = await getAllFromDB('/suppliers', {uid:true})
    if(supplier[0].postal_code != null){
        return true
    } else{
      return false
    }
  }

  
  const createData = (datas) => { 

    const thismonth = new Date().getMonth()+1; 
    const today = getThisDay()

    tableLocationData = {
      'freguesia':0, 
      'município':0, 
      'distrito':0, 
      'país':0, 
      'continente':0, 
      'mundo':0
    }

    for (const data of datas) {

      if(data.sameLocation.toLowerCase() === 'freguesia') {
        tableLocationData['freguesia'] +=1
      }
      else if(data.sameLocation.toLowerCase() === 'município') {
          tableLocationData['município'] +=1
      }
      else if(data.sameLocation.toLowerCase() === 'distrito') {
          tableLocationData['distrito'] +=1
      }
      else if(data.sameLocation.toLowerCase() === 'país') {
          tableLocationData['país'] +=1
      }
      else if(data.sameLocation.toLowerCase() === 'continente') {
          tableLocationData['continente'] +=1
      }
      else if(data.sameLocation.toLowerCase() === 'mundo') {
          tableLocationData['mundo'] +=1
      }

      const date = new Date(data.created_at);
      const isoDateString = date.toISOString();
      const month = isoDateString.substring(6, 7); 

      if (thismonth == month) {
        setSaleMonth((prev) => prev + 1)
      }

      if (today == isoDateString.substring(0, 10)) {
        setSaleToday((prev) => prev + 1)
      }
      
    }
  }


  const getMySells = async () => {

    try {
      const response = await getAllFromDB('/orderedProducts',{
        product_owner_uid: true
      })
  
      let supplierAddress = await getSupplierAddress()
      if(supplierAddress != false){
        let sells = response.slice(response.length - 5, response.length)
        if(response.length < 5) {
          sells = response.slice(0, response.length)
        }
  
        for (const sell of sells) {
          const ad = await getAllFromDB('/ads/' + sell.ad_id)
          sell['title'] = ad[0].title
        }
        console.log(sells)
  
        setFiveSells(sells);
        createData(response)
      }

    }
    catch {
      setFiveSells([]);
      createData([])
    }

  }

  useEffect( () => {
    setLoading(true)
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
          <SupplierBar active1='active'></SupplierBar>
          <div className='app__SupplierPage_boxes'>
            <div className='app__SupplierPage_boxesEsquerda'>
              <div className='app__SupplierPage_boxesEsquerda1'>
                <div className='app__SupplierPage_boxesEsquerda1Est'>
                <p>Impacto Local</p>
                  { tableLocationData === {} ? <div>loading</div> : <LocalImpact datas={tableLocationData}></LocalImpact>}
                </div>
              </div>
            </div>

            <div className='app__SupplierPage_boxesDireita'>
                <div className='app__SupplierPage_boxesDireita1Nmr'>
                  <div className='app__SupplierPage_boxesDireita1Nmr1'>
                    <p style={{fontWeight:'500'}}>Hoje</p>
                    <p><span className='numeroLaranja'>{saleToday}</span> Vendas</p>
                  </div>
                  <div className='app__SupplierPage_boxesDireita1Nmr2'>
                    <p style={{fontWeight:'500'}}>Este mês</p>
                    <p><span className='numeroLaranja'>{saleMonth}</span> Vendas</p>
                  </div>
                </div>
                <div className='app__SupplierPage_boxesDireita1Vend'>
                  <p style={{fontWeight:'500'}}>5 Vendas Recentes</p>
                  {fiveSells.map((sell) => {
                      return (
                          <>
                            <div style={{display: 'flex', justifyContent: 'space-between', gap: '1rem'}}> 
                              <p>{sell.title} {sell.quantity}Qt.</p>
                              <p> <PriceDisplay price={sell.price}></PriceDisplay></p>
                            </div>
                          </>
                        )
                    })
                  }
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