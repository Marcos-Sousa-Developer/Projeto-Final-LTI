import React from 'react'
import { Link } from 'react-router-dom'

function SupplierBar({active1="", active2="", active4="", active5=""}) {
  return (
    <div className='app__SupplierPage_options'>
      <ul>
        <Link to='/supplier'><li><span className={'option ' + active1 + ' app__text_effect'}>Home</span></li></Link>
        <Link to='/supplier/add'><li><span className={'option ' + active2 + ' app__text_effect'}>Anúncios</span></li></Link>
        <Link to='/supplier/produnit'><li><span className={'option ' + active4 + ' app__text_effect'}>Unidade Produção</span></li></Link>
        <Link to='/supplier/encomendas'><li><span className={'option ' + active5 + ' app__text_effect'}>Encomendas</span></li></Link>
      </ul>
    </div>
  )
}

export default SupplierBar
