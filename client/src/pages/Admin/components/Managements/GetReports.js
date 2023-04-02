import React, {useState} from 'react'
import BarReports from '../Reports/BarReports'
import getAllFromDB from '../../../../hooks/getAllFromDB'

function GetReports() {

    const [continent, setContinent] = useState("");
    const [country, setCountry] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [town, setTown] = useState("");
    const [status, setStatus] = useState("");
    const [total_Orders, setTotalOrders] = useState("");
    const [date, setDate] = useState(""); 
    const [result, setResult] = useState(null)
    const [showBarResult, setShowBarResult] = useState(true)
    const [showExportResult, setShowExportResult] = useState(false)
    const [tableData, setTableData] = useState({})

    const fetchResults = async () => { 

        setShowBarResult(false)

        let allEmpty = [continent, country, 
                        district, city, town,
                        status, total_Orders, date].every(item => item === "");

        const params = {
            continent: continent,
            country: country,
            district: district,
            city: city,
            town: town,
            status: status,
            total_orders: total_Orders,
            date: date
        }
        let response = ""
        if(allEmpty == true) {  
            let response = await getAllFromDB('/consumers') 
            setResult(response)
            mapData(response)
           
        }

        else {
            let response = await getAllFromDB('/consumers',params) 
            setResult(response)
            mapData(response)
           

        }

        setShowBarResult(true)
    }

    function mapData(datas) {  
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let tableData = {}

        datas.map((data) => { 

            const dateString = data.created_at 
            const date = new Date(dateString); 

            // January is 0, so we add 1 to get the actual month number
            const monthNumber = date.getMonth() + 1; 
            const monthName = months[monthNumber - 1];  

            if(!tableData.hasOwnProperty(monthName)) {
                tableData[monthName] = 0
            }
            tableData[monthName] +=1
                
                
            
        })
        setTableData(tableData)
    }


  return (
    <>
        {
            showBarResult ? (<BarReports data={tableData}></BarReports>) : (
                <div className="text-center">
                    <div className="spinner-border" style={{width: "10rem", height: "10rem"}} role="status"></div>
                </div>
            )
        }
       

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
                    <label htmlFor="continent">Continente</label>
                    <input className="form-control" id="continent" onChange={(event) => setContinent(event.target.value)}></input>
                </div>

                <div className="form-group col-md-2 mb-3">
                    <label htmlFor="country">País</label>
                    <input className="form-control" id="country" onChange={(event) => setCountry(event.target.value)}></input>
                </div>

                <div className="form-group col-md-2 mb-3">
                    <label htmlFor="district">Distrito</label>
                    <input className="form-control" id="district" onChange={(event) => setDistrict(event.target.value)}></input>
                </div>

                <div className="form-group col-md-3 mb-3">
                    <label htmlFor="city">Município</label>
                    <input className="form-control" id="city" onChange={(event) => setCity(event.target.value)}></input>
                </div>

                <div className="form-group col-md-3 mb-3">
                    <label htmlFor="town">Freguesia</label>
                    <input className="form-control" id="town" onChange={(event) => setTown(event.target.value)}></input>
                </div>

                <div className="form-group col-md-2 mb-3">
                    <label htmlFor="status">Estado</label>
                    <select className="form-select" onChange={(event) => setStatus(event.target.value)} aria-label="Default select example">
                        <option defaultValue value=""> Selecionar todos</option>
                        <option value="1">Apenas ativados</option>
                        <option value="0">Apenas desativados</option>
                    </select>
                </div>

                <div className="form-group col-md-2 mb-3">
                    <label htmlFor="orders">NºEncomendas</label>
                    <input className="form-control" id="orders" onChange={(event) => setTotalOrders(event.target.value)}></input>
                </div>

                <div className="form-group col-md-3 mb-3">
                    <label htmlFor="created_at">Data de criação de conta</label>
                    <input type="date" className="form-control" id="created_at" onChange={(event) => setDate(event.target.value)}></input>
                </div>

            </div>
        </form>
                
        <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-primary" onClick={fetchResults}>Obter relatório</button>
            &nbsp;&nbsp;&nbsp;
            {
                showExportResult && (
                    <button type="button" class="btn btn-success" onClick={fetchResults}>exportar relatório</button>
                )
            }
        </div>
               
    </>
  )
}

export default GetReports