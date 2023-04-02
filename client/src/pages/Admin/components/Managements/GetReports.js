import React from 'react'


function GetReports() {
  return (
    <>
        <br></br>
        <h5>Obter relátorio de utilizadores</h5>

        <small style={{color:"red"}}>
        Nenhum dos dados é obrigatório, porém quanto menos especifico
        mais demorada a obtenção do relatório, por exemplo se data não for selecionada
        obtém-se todas as datas até ao dia de hoje.
        
        </small>
       
           
        <form>
        <br></br>
            <div className="row">

                <div className="form-group col-md-2 mb-3">
                    <label htmlFor="name">Continente</label>
                    <input className="form-control" id="name"></input>
                </div>

                <div className="form-group col-md-2 mb-3">
                    <label htmlFor="name">País</label>
                    <input className="form-control" id="name"></input>
                </div>

                <div className="form-group col-md-2 mb-3">
                    <label htmlFor="name">Distrito</label>
                    <input className="form-control" id="name"></input>
                </div>

                <div className="form-group col-md-3 mb-3">
                    <label htmlFor="name">Município</label>
                    <input className="form-control" id="name"></input>
                </div>

                <div className="form-group col-md-3 mb-3">
                    <label htmlFor="name">Freguesia</label>
                    <input className="form-control" id="name"></input>
                </div>

                <div className="form-group col-md-2 mb-3">
                    <label htmlFor="name">Estado</label>
                    <select className="form-select" aria-label="Default select example">
                        <option defaultValue value="none"> Selecionar todos</option>
                        <option value="active">Apenas ativados</option>
                        <option value="deactive">Apenas desativados</option>
                    </select>
                </div>

                <div className="form-group col-md-2 mb-3">
                    <label htmlFor="name">NºEncomendas</label>
                    <input className="form-control" id="name"></input>
                </div>

                <div className="form-group col-md-3 mb-3">
                    <label htmlFor="name">Data de criação de conta</label>
                    <input type="date" className="form-control" ></input>
                </div>

            </div>
        </form>
                
        <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-primary">Obter relatório</button>
        </div>
               
    </>
  )
}

export default GetReports