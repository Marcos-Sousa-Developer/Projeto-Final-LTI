import React, { useState, useEffect } from 'react'
import getAllFromDB from '../../../../hooks/getAllFromDB';
import AppearUserModal from '../Modals/AppearUserModal'
import LoadingModal from '../Modals/LoadingModal';
import { FiTrash2 } from 'react-icons/fi';

const $ = require('jquery')
$.DataTable = require('datatables.net')

let datas = null

function FilterSearchVehicle() {

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
          r.name
        ]).draw();    
      })
  }

  /**
   * @description when access create dataTables
   */
  useEffect(() => {

    async function run() {

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

      let resp = await getAllFromDB('/vehicles')   
      setRow(resp)
    }
    run()
 
  },[])

  return (
    <>
      <h6>Transportes disponiveis</h6>

      <div className="col-lg-12">

        <br></br>

        <div className="row">

          <div className="form-group col-xxl-3 mb-3">
            <label>Nome do Veiculo</label>
            <input type="text" className="form-control" onChange={(e) => setName(e.target.value)}></input>
          </div>
          <div className="form-group col-xxl-12">
            <button type="submit" className="btn btn-primary mb-2">
                  Adicionar Veiculo
            </button>
          </div>
          
        </div>
    
        <hr style={{padding: "15px"}}></hr>

        <div className="row overflow-auto">
          <h4 style={{paddingBottom: "8px"}}>Resultados da pesquisa</h4>
          <table id="app_table" className="table table-striped border">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>

      </div>

      {
        (show) && 
        (
        <AppearUserModal url={'/vehicles'} element={elementToShow} isShowingModal={isShowingModal} element_type={"vehicle"}></AppearUserModal>
        )
      }
      
    </>
  );
}

export default FilterSearchVehicle