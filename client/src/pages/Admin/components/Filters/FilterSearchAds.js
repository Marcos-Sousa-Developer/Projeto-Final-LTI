import React, { useState, useEffect } from 'react'
import getAllFromDB from '../../../../hooks/getAllFromDB';
import AppearUserModal from '../Modals/AppearUserModal'
import LoadingModal from '../Modals/LoadingModal';

const $ = require('jquery')
$.DataTable = require('datatables.net')

let datas = null

function FilterSearchAds() {

    const [title,setTitle] = useState("")
    const [supplierID,setsupplierID] = useState("")
    const [category,setCategory] = useState("")
    const [subcateogry,setSubCategory] = useState("")
    const [subsubcategory,setSubSubCateogry] = useState("")
    const [price,setPrice] = useState("")
    const [status,setStatus] = useState("")
    const [dateInit,setDateInit] = useState(new Date(2023, 0, 1).toLocaleDateString())
    const [dateFinal,setDateFinal] = useState(new Date().toLocaleDateString())
    const [error,setError] = useState(false)

  //show or not show modal
  const [show, setShow] = useState(false) 

  //Loading content
  const [isloading, setLoading] = useState(false) 

  //data of componenent to show
  const [elementToShow, setElementToShow] = useState({}) 

  /**
   * @param key get object by key intended
   * @param value get object compared by value intended
   * @description get object intended
   */
  const getObject = (key,value) => {
   
    datas.map((data) => {  
      if(data[key] === value) {
        setElementToShow(data)
        isShowingModal()
      }
    })
  }

  /**
   * @description fetch data from server
   */
  const getResponses = async () => {

    const params = {
        title: title,
        supplier_id: supplierID,
        category_name: category,
        subcategory_name: subcateogry,
        subsubcategory_name: subsubcategory,
        price: price,
        status: status,
        created_at_init: dateInit.includes("/") ? dateInit.substring(6,10) + '-' + dateInit.substring(3,5) + '-' + dateInit.substring(0,2) : dateInit,
        created_at_final: dateFinal.includes("/") ? dateFinal.substring(6,10) + '-' + dateFinal.substring(3,5) + '-' + dateFinal.substring(0,2) : dateFinal
    }

    setLoading(true)
    let resp = await getAllFromDB('/ads', params) 
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
   * @describe Show Modal of element selected
   */
  const isShowingModal = () => {
      show == true ? setShow(false) : setShow(true)
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
          r.title,
          r.supplier_id,
          r.category_name, 
          r.subcategory_name,
          r.subsubcategory_name,
          r.price + "€",
          r.status == 1 ? "Ativado" : "Desativado",
          r.created_at
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
      "rowCallback": function(row, data) {
        $(row).off('click').on('click', function() {
            getObject("id",data[0])
        });

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
      <h6>Pesquisar por Produtos</h6>

      <small style={{color:"red"}}>
        Nenhum dos filtros é obrigatório, porém quanto menos especifico mais demorada é a obtenção dos dados... <br></br>
        - Se o periodo inicial não for selecionado por defeito é a data desde o inicio do ano corrente! <br></br>
        - Se o periodo final não for selecionado, por defeito é até a data de hoje!
      </small>

      <div className="col-lg-12">

        <br></br>

        <div className="row">
          <div className="form-group col-xxl-4 mb-4">
            <label>Titulo</label>
            <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)}></input>
          </div>

          <div className="form-group col-xxl-4 mb-4">
            <label>ID do Fornecedor</label>
            <input type="text" className="form-control" onChange={(e) => setsupplierID(e.target.value)}></input>
          </div>

          <div className="form-group col-xxl-4 mb-4">
            <label>Estado</label>
            <select className="form-select" aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
              <option defaultValue value="none"> Selecionar todos</option>
              <option value="1">Apenas ativados</option>
              <option value="0">Apenas desativados</option>
            </select>
          </div>

          <div className="form-group col-xxl-3 mb-3">
            <label>Nome da Categoria</label>
            <input type="text" className="form-control" onChange={(e) => setCategory(e.target.value)}></input>
          </div>

          <div className="form-group col-xxl-4 mb-4">
            <label>Nome da Subcategoria</label>
            <input type="text" className="form-control" onChange={(e) => setSubCategory(e.target.value)}></input>
          </div>

          <div className="form-group col-xxl-4 mb-4">
            <label>Nome da Sub de Subcategoria</label>
            <input type="text" className="form-control" onChange={(e) => setSubSubCateogry(e.target.value)}></input>
          </div>

          <div className="form-group col-xxl-1 mb-1">
            <label>Preço até</label>
            <input type="text" className="form-control" onChange={(e) => setPrice(e.target.value)}></input>
          </div>

          <div className="form-group col-xl-3 mb-3"></div>

          <div className="form-group col-xl-3 mb-3">
            <label htmlFor="created_at">Periodo inicial da criação</label>
            <input type="date" className="form-control" id="created_at" onChange={(event) => setDateInit(event.target.value)}></input>
          </div>

          <div className="form-group col-xl-3 mb-3">
            <label htmlFor="created_at">Periodo final da criação</label>
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
                <th scope="col">Titulo</th>
                <th scope="col">UID do Fornecedor</th>
                <th scope="col">Categoria</th>
                <th scope="col">Subcategoria</th>
                <th scope="col">Sub Subcategoria</th>
                <th scope="col">Preço</th>
                <th scope="col">Estado</th>
                <th scope="col">Criado em</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>

      </div>

      {
        (show) && 
        (
        <AppearUserModal url={'/products'} element={elementToShow} isShowingModal={isShowingModal} element_type={"product"}></AppearUserModal>
        )
      }
      
    </>
  );
}

export default FilterSearchAds