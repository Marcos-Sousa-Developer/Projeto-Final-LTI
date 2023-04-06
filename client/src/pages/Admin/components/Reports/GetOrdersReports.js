import React,{useState} from 'react'
import BarOrderReports_km from '../BarReports/BarOrderReports_km'
import BarOrderReports_location from '../BarReports/BarOrderReports_location'
import getAllFromDB from '../../../../hooks/getAllFromDB'

let tableKmData = {}

let tableLocationData = {}

function GetOrdersReports() {

    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [subsubcategory, setSubsubcategory] = useState("");
    const [price, setPrice] = useState("");
    const [dateInit, setDateInit] = useState(new Date(2023, 0, 1).toLocaleDateString()); 
    const [dateFinal, setDateFinal] = useState(new Date().toLocaleDateString()); 
    const [showBarResult, setShowBarResult] = useState(true)
    const [showExportResult, setShowExportResult] = useState(false)
    const [error, setError] = useState(false)
    
    /**
     * @description fetch data from DB
     */
    const fetchResults = async () => { 

        if(dateInit < dateFinal) {

            setError(false)

            setShowBarResult(false)

            const params = {
                product_category: category,
                product_subcategory: subcategory,
                product_subsubcategory: subsubcategory,
                price: price,
                created_at_init: dateInit.includes("/") ? dateInit.substring(6,10) + '-' + dateInit.substring(3,5) + '-' + dateInit.substring(0,2) : dateInit,
                created_at_final: dateInit.includes("/") ? dateFinal.substring(6,10) + '-' + dateFinal.substring(3,5) + '-' + dateFinal.substring(0,2) : dateFinal
            }
    
            let response = await getAllFromDB('/orderedProducts',params) 
            if(typeof response == String) {
                response = []
            }
            mapKmData(response)  
            mapLocationData(response)  

            setShowExportResult(true)
            setShowBarResult(true)

        }

        else {
            setError(true)
        }
    }

    /**
     * @param datas //response from fetch results
     * @description set into tableKmData values
     */
    function mapKmData(datas) {  

        tableKmData = {
            '0-10 km':0, 
            '10-50 km':0, 
            '50-100 km':0, 
            '100-500 km':0, 
            '500-1000 km':0, 
            'more than 1000 km':0
        }

        datas.map((data) => { 

            if(data.orderDistance_km < 10){
                tableKmData['0-10 km'] +=1
            }
            else if(data.orderDistance_km >= 10 && data.orderDistance_km < 50){
                tableKmData['10-50 km'] +=1
            }
            else if(data.orderDistance_km >= 50 && data.orderDistance_km < 100){
                tableKmData['50-100 km'] +=1
            }
            else if(data.orderDistance_km >= 100 && data.orderDistance_km < 500){
                tableKmData['100-500 km'] +=1  
            }
            else if(data.orderDistance_km >= 500 && data.orderDistance_km < 1000){
                tableKmData['500-1000 km'] +=1       
            }
            else if(data.orderDistance_km >= 1000){
                tableKmData['more than 1000 km'] +=1
            }
        })
    }

        /**
     * @param datas //response from fetch results
     * @description set into tableLocationData values
     */
    function mapLocationData(datas) {  

        tableLocationData = {
            'freguesia':0, 
            'município':0, 
            'distrito':0, 
            'país':0, 
            'continente':0, 
            'mundo':0
        }

        datas.map((data) => { 

            if(data.sameLocation === 'freguesia') {
                tableLocationData['freguesia'] +=1
            }
            else if(data.sameLocation === 'município') {
                tableLocationData['município'] +=1
            }
            else if(data.sameLocation === 'distrito') {
                tableLocationData['distrito'] +=1
            }
            else if(data.sameLocation === 'país') {
                tableLocationData['país'] +=1
            }
            else if(data.sameLocation === 'continente') {
                tableLocationData['continente'] +=1
            }
            else if(data.sameLocation === 'mundo') {
                tableLocationData['mundo'] +=1
            }
        })
    }

  return (

    <div className="row">


        {
            showBarResult ? (
                <div className='col-xl-12'>
                    <div className='row'>
                        <div className='col-xl-6'>
                            <BarOrderReports_km datas={tableKmData}></BarOrderReports_km>
                        </div>

                        <div className='col-xl-6'>
                            <BarOrderReports_location datas={tableLocationData}></BarOrderReports_location>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <div className="spinner-border" style={{width: "10rem", height: "10rem", color: "coral"}} role="status"></div>
                    <br></br>
                </div>
            )
        }

        
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

                <div className="form-group col-md-3 mb-3">
                    <label htmlFor="category">Categoria do Produto</label>
                    <input className="form-control" id="category" onChange={(event) => setCategory(event.target.value)}></input>
                </div>

                <div className="form-group col-md-4 mb-3">
                    <label htmlFor="subcategory">Subcategoria do Produto</label>
                    <input className="form-control" id="subcategory" onChange={(event) => setSubcategory(event.target.value)}></input>
                </div>

                <div className="form-group col-md-4 mb-3">
                    <label htmlFor="subsubcategory">Sub de Subcategoria do Produto</label>
                    <input className="form-control" id="subsubcategory"onChange={(event) => setSubsubcategory(event.target.value)}></input>
                </div>

                <div className="form-group col-md-1 mb-3">
                    <label htmlFor="price">Preço até</label>
                    <input className="form-control" id="price" name='price' onChange={(event) => setPrice(event.target.value)}></input>
                </div>

                <div className="form-group col-md-2 mb-2"></div>

                <div className="form-group col-md-4 mb-4">
                    <label htmlFor="created_at_init">Periodo inicial da criação de conta</label>
                    <input type="date" className="form-control" id="created_at_init" name='created_at_init' onChange={(event) => setDateInit(event.target.value)}></input>
                </div>

                <div className="form-group col-md-4 mb-4">
                    <label htmlFor="created_at_final">Periodo final da criação de conta</label>
                    <input type="date" className="form-control" id="created_at_final" name='created_at_final' onChange={(event) => setDateFinal(event.target.value)}></input>
                </div>

                <div className="form-group col-md-2 mb-2"></div>

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