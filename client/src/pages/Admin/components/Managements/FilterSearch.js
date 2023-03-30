import React, { useState, useEffect } from 'react'
import getAllFromDB from '../../../../hooks/getAllFromDB';
import AppearResponseModal from '../Modals/AppearUserModal'

const $ = require('jquery')
$.DataTable = require('datatables.net')

function FilterSearch({url, type, name, filter1, filter2, filter3, filter4, filter5}) {

  const [show, setShow] = useState(false) 

  const [componentToShow, setComponentToShow] = useState({}) 

  const [inputType, setInputType] = useState("text")

  const getResponses = async () => {
    let resp = await getAllFromDB(url) 
    setRow(resp)
  }

  const isShowingModal = () => {
      show == true ? setShow(false) : setShow(true)
  }

  /**
   * @param resp Response from server method get
   * @describe Set row to table after get data 
   */
  const setRow = (resp) => {

    let table = $('#app_table').DataTable() 
    table.clear().draw();

    if(!["product","vehicle"].includes(type)) {
      
      resp.map((r) => { 
      table.row.add(
        [ r.id,
          r.name, 
          r.uid, 
          r.email,
          r.account_status == 1 ? "Ativado" : "Desativado"
        ]).draw();    
      })
    }
    else if(type === "product") { 

      resp.map((r) => { 
        table.row.add(
          [ r.EAN, 
            r.name, 
            //TODO CHNAGE DESCRIPTION TO CATEGORY
            r.description, 
            r.production_date,
            r.status == 1 ? "Ativado" : "Desativado"
          ]).draw();    
        })
    }

    else {
      resp.map((r) => { 
      table.row.add(
        [ r.licence_plate, 
          r.name, 
          r.production_unit,
          r.capacity,
          r.status == 1 ? "Ativado" : "Desativado"
        ]).draw();    
      })

    }
    
  }

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
          if(!["product","vehicle"].includes(type)) {

            let u = {
              id : data[0], 
              name: data[1],
              uid : data[2],
              email : data[3],
              account_status : data[4]
            }
            setComponentToShow(u)
            
          }

          else if(type == "product") {
            let p = {
              EAN: data[0], 
              name: data[1],
              category : data[2],
              production_date : data[3],
              status : data[4]
            }
            setComponentToShow(p) 
          }

          else if(type == "vehicle") {
            let v = {
              licence_plate: data[0], 
              name: data[1],
              production_unit : data[2],
              capacity : data[3],
              status : data[4]
            }
            setComponentToShow(v)
          }

          isShowingModal()
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
        
      },
      "bDestroy": true,
      
    });  
  },[])

  return (
    <>
      <h6>Pesquisar {name}</h6>

      <small style={{color:"red"}}>
        Nenhum dos dados é obrigatório, porém se a quantidade de 
        dados recebidos for maior que 100 sera 
        necessário uma pesquisa mais especifica.
      </small>

      <div className="col-lg-12">

        <br></br>

        <div className="row">
          <div className="form-group col-xxl-4 mb-3">
            <input type="text" className="form-control" placeholder={filter1}></input>
          </div>

          <div className="form-group col-xxl-4 mb-3">
            <input type="text" className="form-control" placeholder={filter2} ></input>
          </div>

          <div className="form-group col-xxl-4 mb-3">
            <input type="text" className="form-control" placeholder={filter3}></input>
          </div>

          <div className="form-group col-xxl-4 mb-3">
            <input type="text" className="form-control" placeholder={filter4}></input>
          </div>

          {type==="product" ?  
          
            (<div className="form-group col-xxl-4 mb-3">
              <input type={inputType} onClick={()  => {setInputType('date')}} className="form-control" placeholder={filter5} ></input>
            </div>) 
          
            :

            (<div className="form-group col-xxl-4 mb-3">
              <input type="text" className="form-control" placeholder={filter5} ></input>
            </div> )
          }
          
          <div className="form-group col-xxl-4 mb-3">
            <select className="form-select" aria-label="Default select example">
              <option defaultValue value="none"> Selecionar todos</option>
              <option value="active">Apenas ativados</option>
              <option value="deactive">Apenas desativados</option>
            </select>
          </div>

          <div className="form-group col-xxl-12 mb-3 d-flex justify-content-center">
            <button type="submit" className="btn btn-primary mb-2" onClick={getResponses}>
              Procurar
            </button>
          </div>
        </div>
    
        <hr style={{padding: "15px"}}></hr>

        <div className="row overflow-auto">
          <h4 style={{paddingBottom: "8px"}}>Resultados da pesquisa</h4>
          <table id="app_table" className="table table-striped border">
            <thead className="thead-dark">
              <tr>
                <th scope="col">{type === "product" ? "EAN" : type === "vehicle" ? "Matrícula" : "ID" }</th>
                <th scope="col">Nome</th>
                <th scope="col">{type === "product" ? "Categoria" :  type === "vehicle" ? "Unidade de Produçao" : "Identificador" }</th>
                <th scope="col">{type === "product" ? "Data de Produção" : type === "vehicle" ? "Capacidade" : "Email" }</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>

      </div>

      {
        (show === "ok") && (<AppearResponseModal user={componentToShow} response_type={type} isShowingModal={isShowingModal}></AppearResponseModal>)
      }
      
    </>
  );
}

export default FilterSearch