import React from 'react'
import getConsumers from '../../hooks/getConsumers'

function Gerir_consumidores() { 

  const users = getConsumers('/api/consumers') 

  return ( 
    <div>
          {
            users.map((user) => (
              <div className=''> {user.name},{user.id} </div>
            ))
          }

    </div>
  )
}

export default Gerir_consumidores
