import React from 'react'
import {useState,useEffect} from 'react' 
import getConsumers from './components/hooks/getConsumers'

function Gerir_consumidores() { 

  //const [users, setUsers] = useState([]);

  const users = getConsumers('/api/consumers') 

  console.log(users)
  
  

  return ( 
    <div>
          {
            users.map((user) => (
              <div className=''> -> {user.name},{user.id}</div>
            ))
          }

    </div>
  )
}

export default Gerir_consumidores
