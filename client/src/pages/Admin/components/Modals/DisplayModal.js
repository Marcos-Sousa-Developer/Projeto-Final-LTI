import React, {useState } from 'react'
import AppearUserModal from './AppearUserModal'


function DisplayModal({user, user_type}) {

  const [show, setShow] = useState(false) 

  const isShowingModal = () => {
    show == true ? setShow(false) : setShow(true)
  }
  
  return (

    <tr key={user.id}>
        <th scope="row">{user.id}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.account_status == 1 ? "Ativado" : "Desativado"}</td>
        <td><button onClick={isShowingModal} >
            <i className="bi bi-pencil-square"></i>
            </button>
            {
                show && (<AppearUserModal user={user} user_type={user_type} isShowingModal={isShowingModal}></AppearUserModal>)
            }
        </td>
    </tr>

  );
}

export default DisplayModal
