import React,{useState} from 'react'
import BarOrderReports_km from '../Reports/BarOrderReports_km'
import BarOrderReports_location from '../Reports/BarOrderReports_location'

function GetOrdersReports() {

    const [error, setError] = useState(false)
    const [dateInit, setDateInit] = useState(new Date(2023, 0, 1).toLocaleDateString()); 
    const [dateFinal, setDateFinal] = useState(new Date().toLocaleDateString()); 

    /**
     * @description fetch data from DB
     */
    const fetchResults = async () => { 

        if(dateInit < dateFinal) {
            setError(false)
        }

        else {
            setError(true)
        }
    }

  return (

    <div className="row">


        <div className='col-xl-6'>

            <BarOrderReports_km datas={{name:0}}></BarOrderReports_km>

        </div>

        <div className='col-xl-6'>

            <BarOrderReports_location datas={{name:0}}></BarOrderReports_location>

        </div>

        <br></br>
        <h5>Obter relátorio de encomendas</h5>

        <small style={{color:"red"}}>
        Nenhum dos dados é obrigatório, porém quanto menos especifico
        mais demorada a obtenção do relatório. <br></br>
        - Se o periodo inicial não for selecionado por defeito é a data desde o inicio do ano corrente! <br></br>
        - Se o periodo final não for selecionado, por defeito é até a data de hoje!
        </small>

        <form>
        <br></br>
            <div className="row">

                <div className="form-group col-md-4 mb-3">
                    <label htmlFor="continent">Categoria do Produto</label>
                    <input className="form-control" id="continent"></input>
                </div>

                <div className="form-group col-md-4 mb-3">
                    <label htmlFor="country">Subcategoria do Produto</label>
                    <input className="form-control" id="country"></input>
                </div>

                <div className="form-group col-md-4 mb-3">
                    <label htmlFor="district">Preço</label>
                    <input className="form-control" id="district"></input>
                </div>

                <div className="form-group col-md-3 mb-3"></div>

                <div className="form-group col-md-4 mb-3">
                    <label htmlFor="created_at">Periodo inicial da criação de conta</label>
                    <input type="date" className="form-control" id="created_at" onChange={(event) => setDateInit(event.target.value)}></input>
                </div>

                <div className="form-group col-md-4 mb-3">
                    <label htmlFor="created_at">Periodo final da criação de conta</label>
                    <input type="date" className="form-control" id="created_at" onChange={(event) => setDateFinal(event.target.value)}></input>
                </div>

                <div className="form-group col-md-3 mb-3"></div>

            </div>
        </form>

        {
            error && (
                <div class="d-flex justify-content-center">
                    <big style={{color: "red"}}>Periodo inválido, por favor escolha um periodo válido!</big>
                </div>
                
            )
        }


        <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-primary" onClick={fetchResults}>Obter relatório</button>
            &nbsp;&nbsp;&nbsp;
            {/*
                showExportResult && (
                    <button type="button" class="btn btn-success" onClick={fetchResults}>exportar relatório</button>
                )
            */}
        </div>


    </div>
  )
}

export default GetOrdersReports