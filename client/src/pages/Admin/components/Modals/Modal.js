import React from 'react'
import "../../assets/styles/style.css"

function Modal({user}) {
  return (
    <>
    <div className="fade modal-backdrop show"></div>
    
    <div role="dialog" aria-modal="true" className="fade modal show"
        tabIndex="-1"
        aria-labelledby="contained-modal-title-vcenter"
        style={{backgroundColor: "transparent", display: "flex", alignItems: "center"}}>
    
        <div className="modal-dialog" style={{width: "100%", backgroundColor: "transparent"}}>

            <div className="modal-content" style={{borderRadius: "15px"}}>
            
                <div className="modal-header">
                    <h5 className="modal-title">
                        {user.name}
                    </h5>

                    <button type="button" className="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div className="modal-body">
                        ....
                </div>
                
                <div className="modal-footer">

                    <button type="button" className="btn btn-secondary" data-dismiss="modal">
                            Close
                    </button>

                    <button type="button" className="btn btn-primary">
                            Save changes
                    </button>

                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Modal
