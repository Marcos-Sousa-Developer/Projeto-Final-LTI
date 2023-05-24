import React, {useState, useEffect}  from 'react'

import getAllFromDB from '../../../hooks/getAllFromDB';
import { PriceDisplay } from '../../../utilities/formatCurrency';

import {NavbarSupplier, Footer, SubHeading} from '../../../components/index';
import './SupplierAdd.css';

function SupplierAdd() {

  const [ads, setAds] = useState([]);
  const [didMount, setDidMount] = useState(false)

  async function changeDateFormat(date){
    const parts = date.split(/-|T/);
    return `${parts[2]}-${parts[1]}-${parts[0]}`
  }

  async function formatPrice(price) {
    const formattedPrice = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
    return formattedPrice;
  }

  async function getProducts(){

    let supplier = await getAllFromDB("/suppliers", {uid: true})
    let idUser = supplier[0].id;

    let ads = await getAllFromDB("/ads", {supplier_id: idUser})
    ads.map(async (ad) => (
      ad.created_at = await changeDateFormat(ad.created_at),
      ad.price = await formatPrice(ad.price)
    ))
    setAds(ads);
  }

  useEffect(()=>{
    getProducts()
    setDidMount(true)
}, [])

  return (
    <>
    {
      didMount == false ? (
        <>
          Loading
        </>
      )
      :
      (
      <>
        <NavbarSupplier></NavbarSupplier>
        <div className='app__SupplierAdd'>   
            <SubHeading title="Home"/>
            <div className='app__SupplierAdd_options'>
              <ul>
                <li><span></span><a className='option app__text_effect' href="#">Home</a></li>
                <li><span></span><a className='option active app__text_effect' href="#">Anúncios</a></li>
                <li><a className='app__text_effect' href="#">Vendas e Ordens</a></li>
              </ul>
            </div>
            <div className='app__SupplierAdd_Box'>
              <table>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Unidades</th>
                    <th>Data de criação</th>
                  </tr>
                </thead>
                <tbody>
                    {ads.map((ad) => (
                    <tr key={ad.title}>
                      {/*<td><div className='app__SupplierAdd_Box_Image'>
                      <img src={product.src} alt={product.title}/>
                      {ad.title}
                      </div></td>*/}
                      <td>{ad.title}</td>
                      <td>{ad.price}</td>            
                      <td>{ad.units}</td>
                      <td>{ad.created_at}</td>
                    </tr>
                    ))}
                    </tbody>
              </table>
            </div>
        </div>
        <Footer></Footer>
      </>
      )
    }
    </>
  );
}

export default SupplierAdd;