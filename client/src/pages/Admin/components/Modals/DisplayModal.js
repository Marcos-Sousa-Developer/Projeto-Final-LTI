import React, {useState } from 'react'
import Modal from './Modal'

function DisplayModal({user}) {

  const [show, setShow] = useState(false) 

  const isShowingModal = () => {
    show == true ? setShow(false) : setShow(true)
  }
  
  return (

    <tr data-toggle="modal" data-target={user.id} key={user.id}>
        <th scope="row">{user.id}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.account_status == 1 ? "Ativado" : "Desativado"}</td>
        <td><i onClick={isShowingModal} className="bi bi-pencil-square"></i>
            {
                show && (<Modal user={user}></Modal>)
            }
        </td>
    </tr>

  );
}

export default DisplayModal
