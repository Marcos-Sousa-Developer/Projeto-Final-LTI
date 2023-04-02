import React from "react";

function DeleteAccountModal({isShowingModal}) {

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        className="fade modal show"
        tabIndex="-1"
        aria-labelledby="contained-modal-title-vcenter"
        style={{
          backgroundColor: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="modal-dialog"
          style={{ width: "100%", backgroundColor: "transparent" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                <i style={{color:"red"}} class="bi bi-exclamation-triangle"></i>
              </h2>

              <button type="button" onClick={isShowingModal} className="close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="container">
                <div style={{textAlign: "center" }}>
                    <br></br>
                    <div>
                        <h2 style={{color:"black"}}>Apagar conta?</h2>
                        <p className="card-text">Apagar a conta é um ato permanente e não pode ser revertido.</p>
                        <p className="card-text" style={{color:"red", fontWeight: "bold"}}>Tens mesmo a certeza?</p>
                        <form class="form-inline">

                          <div class="input-group">
                            <input type="text" class="form-control" placeholder="Insere a tua password"></input>
                            <button type="submit" class="btn btn-warning">Confirmar</button>
                          </div>

                          
                        </form>
                    </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                onClick={isShowingModal}
                className="btn btn-secondary"
                data-dismiss="modal">
                Fechar
              </button>

              <button
                type="button"
                className="btn btn-danger" style={{opacity: "0.5"}}>
                Apagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteAccountModal;
