import React, { useState, useEffect } from 'react'
import getAllFromDB from '../../../../hooks/getAllFromDB';
import LoadingModal from '../Modals/LoadingModal';

const $ = require('jquery')
$.DataTable = require('datatables.net')

let datas = null

function FilterSearchOrder() {

    const [orderNumber,setOrderNumber] = useState("")
    const [totalProducts,setTotalProducts] = useState("")
    const [addressDelivery,setAddressDelivery] = useState("")
    const [orderStatus,setOrderStatus] = useState("")
    const [totalPrice,setTotalPrice] = useState("")
    const [dateInit,setDateInit] = useState(new Date(2023, 0, 1).toLocaleDateString())
    const [dateFinal,setDateFinal] = useState(new Date().toLocaleDateString())
    const [error,setError] = useState(false)

  //Loading content
  const [isloading, setLoading] = useState(false) 

  /**
   * @description fetch data from server
   */
  const getResponses = async () => {

    const params = {
        order_number: orderNumber,
        quantity: totalProducts,
        buyer_location: addressDelivery,
        order_status: orderStatus,
        price: totalPrice,
        created_at_init: dateInit.includes("/") ? dateInit.substring(6,10) + '-' + dateInit.substring(3,5) + '-' + dateInit.substring(0,2) : dateInit,
        created_at_final: dateFinal.includes("/") ? dateFinal.substring(6,10) + '-' + dateFinal.substring(3,5) + '-' + dateFinal.substring(0,2) : dateFinal
    }

    setLoading(true)
    let resp = await getAllFromDB('/orderedProducts',params) 
    try {
      setRow(resp)
      setError(false)
    }
    catch(e){
      setError(true)
    }
    
    setLoading(false)
    
  }

  /**
   * @param resp Response from server method get
   * @describe Set row to table after get data 
   */
  const setRow = (resp) => {

    datas = resp

    let table = $('#app_table').DataTable() 
    table.clear().draw();
      
      resp.map((r) => { 
      table.row.add(
        [ r.id,
          r.order_id,
          r.ad_id,
          r.product_buyer_uid,
          r.product_owner_uid,
          r.buyer_location,
          r.quantity,
          r.price,
          r.created_at,
          r.order_status,
        ]).draw();    
      })
  }

  /**
   * @description when access create dataTables
   */
  useEffect(() => {

    $('#app_table').DataTable({
      dom: '<"#top.row"' +
          '<"col-sm-12 col-md-6"f>' +
          '<"col-sm-12 col-md-6"l>' +
          '>t' +
          '<"#bottom.row"' +
          '<"col-sm-12 col-md-6"i>' +
          '<"col-sm-12 col-md-6"p>' +
          '>',
      "processing": true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Procurar...",
        "lengthMenu": "Mostrar _MENU_ entradas",
        "oPaginate": {
          "sNext": " > ",
          "sPrevious": " < ",
          "sShow": "Mostrar"
        },
      },

      initComplete: function(){
        
        $("#top").css('padding-bottom','8px');
        $("#app_table_filter").css('float','left');
        $("#app_table_filter label input").addClass("form-control");
        $("#app_table_length").css('float','right');
        $("#app_table_info").css('float','left');
        $("#app_table_paginate").css('float','right');
        $("#bottom").css('text-align','center');
        $("#bottom").css('text-align','center');
        $("#app_table_paginate").addClass("pagination")
        
      },
      "bDestroy": true,
      
    });  
  },[])

  return (
    <>
      <h6>Pesquisar por Encomendas</h6>

      <small style={{color:"red"}}>
        Nenhum dos filtros é obrigatório, porém quanto menos especifico mais demorada é a obtenção dos dados... <br></br>
        - Se o periodo inicial não for selecionado por defeito é a data desde o inicio do ano corrente! <br></br>
        - Se o periodo final não for selecionado, por defeito é até a data de hoje!
      </small>

      <div className="col-lg-12">

        <br></br>

        <div className="row">
          <div className="form-group col-xxl-3 mb-3">
            <label>Número da Encomenda</label>
            <input type="text" className="form-control" onChange={(e) => setOrderNumber(e.target.value)}></input>
          </div>

          <div className="form-group col-xxl-2 mb-2">
            <label>Total de Artigos até</label>
            <input type="text" className="form-control" onChange={(e) => setTotalProducts(e.target.value)}></input>
          </div>

          <div className="form-group col-xxl-3 mb-3">
            <label>Endereço de Entrega</label>
            <input type="text" className="form-control" onChange={(e) => setAddressDelivery(e.target.value)}></input>
          </div>

          <div className="form-group col-xxl-3 mb-3">
            <label>Estado da Encomenda</label>
            <select className="form-select" aria-label="Default select example" onChange={(e) => setOrderStatus(e.target.value)}>
              <option defaultValue value={""}> Selecionar todos</option>
              <option value="Cancelado">Cancelado</option>
              <option value="Em preparação">Em preparação</option>
              <option value="Enviados">Enviados</option>
              <option value="Recebidos">Recebidos</option>
            </select>
          </div>

          <div className="form-group col-xxl-1 mb-1">
            <label>Total até</label>
            <input type="text" className="form-control" onChange={(e) => setTotalPrice(e.target.value)}></input>
          </div>

          <div className="form-group col-xl-3 mb-3"></div>

          <div className="form-group col-xl-3 mb-3">
            <label htmlFor="created_at">Periodo inicial</label>
            <input type="date" className="form-control" id="created_at" onChange={(event) => setDateInit(event.target.value)}></input>
          </div>

          <div className="form-group col-xl-3 mb-3">
            <label htmlFor="created_at">Periodo final</label>
            <input type="date" className="form-control" id="created_at" onChange={(event) => setDateFinal(event.target.value)}></input>
          </div>

          <div className="form-group col-xl-3"></div>

          {
            error && (<small className="d-flex justify-content-center" style={{color: "red"}}>Nenhum dado encontrado</small>)
          }

          <div className="form-group col-xxl-12 d-flex justify-content-center">
            {
              (!isloading) ? 

              (                  
                <button type="submit" className="btn btn-primary mb-2" onClick={getResponses}>
                  Pesquisar
                </button>
              )
              :
              <LoadingModal></LoadingModal>
            }
            
          </div>
        </div>
    
        <hr style={{padding: "15px"}}></hr>

        <div className="row overflow-auto">
          <h4 style={{paddingBottom: "8px"}}>Resultados da pesquisa</h4>
          <table id="app_table" className="table table-striped border">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Encomenda ID</th>
                <th scope="col">Anúncio ID</th>
                <th scope="col">Consumidor UID</th>
                <th scope="col">Vendedor UID</th>
                <th scope="col">Endereço de Entrega</th>
                <th scope="col">Total de Artigos</th> 
                <th scope="col">Preço total da Encomenda</th>
                <th scope="col">Data da Encomenda</th>
                <th scope="col">Estado da Encomenda</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>

      </div>      
    </>
  );
}

export default FilterSearchOrder