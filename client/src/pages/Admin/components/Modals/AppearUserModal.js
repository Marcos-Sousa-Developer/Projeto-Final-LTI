import React, { useState } from "react";
import activateOrDeactivateUser from "../../../../hooks/activateOrDeactivateUser";

function AppearUserModal({url, element, isShowingModal, element_type }) { 

  const [state, setState] = useState({
    consumer: "Consumidor",
    admin: "Administrador",
    supplier: "Fornecedor",
    product: "Produto",
    vehicle: "Trasporte"
  })
  
  const handleelement = () => {
    const newStateAccount = element.status == 0 ? 1 : 0;

    if (element.status == 0) {
      activateOrDeactivateUser(url + "/activate/" + element.id, newStateAccount);
    } else {
      activateOrDeactivateUser(url + "/deactivate/" + element.id, newStateAccount);
    }
  };

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

            
              <div className="modal-body" style={{maxHeight: "10px"}}>
                <div style={{textAlign: "center" }}> 
                  {state[element_type]} {element.id ?? element.EAN ?? element.licence_plate} está {element.status == 0 ? "ativado." : "desativado."}
                </div>
              </div>
            

            <div className="modal-footer text-start" style={{border: "none", justifyContent:"center"}}>
              <a href="#" className="btn btn-primary">Ver Detalhes</a>
            </div>

            <button type="button" onClick={() => handleelement()} className="btn btn-warning">
              {element.status == 0 ? "Ativar" : "Desativar"}
            </button>

          </div>
        </div>
      </div>
    </>
  );
}

export default AppearUserModal;
