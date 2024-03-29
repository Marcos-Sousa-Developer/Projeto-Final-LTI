import React, { useState } from "react";
import { Link } from "react-router-dom";

function Aside() {

  const [collapsedU, setCollapsedU] = useState("nav-link collapsed")
  const [expandedU, setExpandedU] = useState("false")
  const [showU, setShowU] = useState("nav-content collapse")
  
  const [collapsedR, setCollapsedR] = useState("nav-link collapsed")
  const [expandedR, setExpandedR] = useState("false")
  const [showR, setShowR] = useState("nav-content collapse")
  

  const collapseU = () => {
    if(collapsedU === "nav-link collapsed") {
      setCollapsedU("nav-link")
      setExpandedU("true")
      setShowU("nav-content collapse show")
    }
    else {
      setCollapsedU("nav-link collapsed")
      setExpandedU("false")
      setShowU("nav-content collapse")
    }
  }
  
  const collapseR = () => {
    if(collapsedR === "nav-link collapsed") {
      setCollapsedR("nav-link")
      setExpandedR("true")
      setShowR("nav-content collapse show")
    }
    else {
      setCollapsedR("nav-link collapsed")
      setExpandedR("false")
      setShowR("nav-content collapse")
    }
  } 

  return (
    <aside id="sidebar" className="sidebar">
      
      <ul className="sidebar-nav" id="sidebar-nav">
        
        <li className="nav-heading">Editar Perfil</li>

        <li className="nav-item">
          <Link reloadDocument  to="/admin/perfil" className="nav-link collapsed">
            <i className="bi bi-person"/>
            <span>Meu Perfil</span>
          </Link>
        </li>

        <li className="nav-heading">Gestão de utilizadores</li>

        <li className="nav-item">
          <button onClick={() => collapseU()} className={collapsedU} data-bs-target="#gerir-users" data-bs-toggle="collapse" aria-expanded={expandedU}>
            <i className="bi bi-people"/>
            <span>Gerir Utilizadores&nbsp;&nbsp;</span>
            <i className="bi bi-chevron-down ms-auto"/>
          </button>

          <ul id="gerir-users" className={showU} data-bs-parent="#sidebar-nav">

            <li>
              <Link reloadDocument  to="/admin/gerir/consumidores">
                <i className="bi bi-circle"/>
                <span>Gerir Consumidores</span>
              </Link>
            </li>

            <li>
              <Link reloadDocument  to="/admin/gerir/fornecedores">
                <i className="bi bi-circle"/>
                <span>Gerir Fornecedores</span>
              </Link> 
            </li>
          </ul>
        </li>

        <li className="nav-heading">Gestão de Vendas Anúnciadas</li>

        <li className="nav-item">
          <Link reloadDocument  to="/admin/gerir/anuncio" className="nav-link collapsed">
            <i class="bi bi-currency-dollar"></i>
            <span>Gerir Anúncios</span>
          </Link>
        </li>

        <li className="nav-heading">Gerir Encomendas Realizadas</li>

        <li className="nav-item">
          <Link reloadDocument to="/admin/gerir/encomendas" className="nav-link collapsed">
            <i class="bi bi-box-seam"></i>
            <span>Gerir Encomendas</span>
          </Link>
        </li>

        <li className="nav-heading">Gestão de Transportes</li>

        <li className="nav-item">
          <Link reloadDocument to="/admin/gerir/transportes" className="nav-link collapsed">
            <i className="bi bi-car-front"/>
            <span>Gerir Transportes</span>
          </Link>
        </li>

        <li className="nav-heading">Relatório de Atividades</li>

        <li className="nav-item">
          <button onClick={() => collapseR()} className={collapsedR} data-bs-target="#data-activity" data-bs-toggle="collapse" aria-expanded={expandedR}>
            <i className="bi bi-journal-text"/>
            <span>Obter relatórios&nbsp;&nbsp;</span>
            <i className="bi bi-chevron-down ms-auto"/>
          </button>

          <ul id="data-activity" className={showR} data-bs-parent="#sidebar-nav">
            <li>
              <Link reloadDocument to="/admin/relatorios/consumidores">
                <i className="bi bi-circle"/>
                <span>Relatório de Consumidores</span>
              </Link>
            </li>

            <li>
              <Link reloadDocument to="/admin/relatorios/fornecedores">
                <i className="bi bi-circle"/>
                <span>Relatório de Fornecedores</span>
              </Link>
            </li>

            <li>
              <Link reloadDocument to="/admin/relatorios/encomendas">
                <i className="bi bi-circle"/>
                <span>Relatório de Encomendas</span>
              </Link>
            </li>

          </ul>
        </li>

      </ul>
    </aside>
  );
}

export default Aside;
