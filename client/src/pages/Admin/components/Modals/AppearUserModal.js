import React, { useEffect, useState } from "react";
import activateOrDeactivateUser from "../../../../hooks/activateOrDeactivateUser";
import deleteToDB from "../../../../hooks/deleteToDB";
import { error } from "jquery";

function AppearUserModal({url, element, isShowingModal, element_type }) { 

  const [error, setError] = useState(false) 


  const [state, setState] = useState({
    consumer: "Consumidor",
    admin: "Administrador",
    supplier: "Fornecedor",
    ad: "Anuncio",
    vehicle: "Trasporte"
  })
  
  const handleElement = () => {
    const newStateAccount = element.status == 0 ? 1 : 0;  

    if (element.status == 0) {
      activateOrDeactivateUser(url + "/activate/" + element.id, newStateAccount);
    } else {
      activateOrDeactivateUser(url + "/deactivate/" + element.id, newStateAccount);
    }
  };

  const deleteVehicle = async () => {

    setError(false)

    try {
      let resp = await deleteToDB('/vehicles/'+element.id)   
      console.log(resp)
      location.reload()
    }
    catch {
      setError(true)
    }
  };

  useEffect(() => {
    console.log(element)
  },[])

  return (
    <>
      <div className="fade modal show" id="myModal" style={{ backgroundColor: "rgba(0,0,0,0.4)", display: "block"}}>
        
        <div className="modal-dialog-centered mx-auto" style={{maxWidth:"500px", backgroundColor: "transparent"}}>
          <div className="modal-content">
          
            <div className="modal-header" style={{border: "none", flexDirection:"row-reverse", maxHeight: "10px"}}> 
              <button type="button" onClick={isShowingModal}>
                <i className="bi bi-x-circle"></i>
              </button>
            </div>

            
              <div className="modal-body h-auto">
                {
                  url === '/vehicles' ?
                  (
                    <div style={{textAlign: "center" }}> 
                      Pretendes apagar a transportadora {element.name} ?
                    </div>
                  ) 
                  :
                  (
                    <div style={{textAlign: "center" }}> 
                      {state[element_type]} { element.uid ?? element.EAN ?? element.id} está {element.status == 0 ? "desativado." : "ativado."}
                    </div>
                  )
                }
              </div>

            {
              url === '/ads' &&  element.status == 1 ? 
              (
                <button type="button" className="btn btn-warning" onClick={() => handleElement()}>
                  Desativar
                </button>
              )
              :
              url !== '/ads' &&  url !== '/vehicles' ?
              (
                
                <button type="button" className="btn btn-warning" onClick={() => handleElement()}>
                {element.status == 0 ? "Ativar" : "Desativar"}
                </button>
                
              )
              :
               url === '/vehicles' ?
              (
                <>
                <button type="button" className="btn btn-danger" onClick={() => deleteVehicle()}>
                  Apagar Transportadora
                </button>
                {
                  error ? (
                    <small style={{color:"red"}}>Não foi possivel apagar transportadora</small>
                  )
                  :
                  (
                    ""
                  )
                }
                </>
              )
              :
              (
                <button type="button" className="btn btn-warning">
                </button>
              )
            }


          </div>
        </div>
      </div>
    </>
  );
}

export default AppearUserModal;
