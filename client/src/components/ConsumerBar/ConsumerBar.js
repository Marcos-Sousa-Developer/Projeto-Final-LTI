import React from 'react'
import { Link } from 'react-router-dom'

function ConsumerBar({active1="", active2=""}) {
  return (
    <div className='app__ConsumerProfile_options'>
        <ul>
        <Link to='/consumer/profile'><li><span className={'option ' + active1 + ' app__text_effect'}>Dados Pessoais</span></li></Link>
        <Link to='/consumer/encomendas'><li><span className={'option ' + active2 + ' app__text_effect'}>Histórico de Encomendas</span></li></Link>
        </ul>
    </div>
  )
}

export default ConsumerBar
