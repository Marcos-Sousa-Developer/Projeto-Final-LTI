import React from 'react'

function NewFornecedores() {
  return (
    <div className="col-12">
    <div className="card recent-sales overflow-auto">
      <div className="filter">
        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
          <li className="dropdown-header text-start">
            <h6>Filter</h6>
          </li>
          <li><a className="dropdown-item" href="#">Today</a></li>
          <li><a className="dropdown-item" href="#">This Month</a></li>
          <li><a className="dropdown-item" href="#">This Year</a></li>
        </ul>
      </div>
      <div className="card-body">
        <h5 className="card-title">Novos Fornecedores <span>/Hoje</span></h5>
        <div id="reportsChart"></div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Brandon Jacob</td>
              <td>fat@.com</td>
              <td>Fornecedor</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob Thornton</td>
              <td>fat@.com</td>
              <td>Fornecedor</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>Larry@@twitterm</td>
              <td>Fornecedor</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
  )
}

export default NewFornecedores
