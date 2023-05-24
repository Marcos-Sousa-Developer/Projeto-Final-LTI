import React from 'react'
import { Link } from 'react-router-dom'

function SupplierBar() {
  return (
    <div className='app__SupplierPage_options'>
    <ul>
    <Link to='/supplier'><li><span className='option active app__text_effect'>Home</span></li></Link>
    <Link to='/supplier/add'><li><span className='option app__text_effect'>Anúncios</span></li></Link>
    <Link to='/supplier/sell'><li><span className='option app__text_effect'>Encomendas</span></li></Link>
    <Link to='/supplier/produnit'><li><span className='option app__text_effect'>Unidade Produção</span></li></Link>
    <Link to='/supplier/encomendas'><li><span className='option app__text_effect'>Histórico</span></li></Link>
    </ul>
  </div>
  )
}

export default SupplierBar
