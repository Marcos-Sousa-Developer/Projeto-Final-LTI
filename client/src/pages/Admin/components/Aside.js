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
        <li className="nav-item">
          <span className="nav-link">
            <i className="bi bi-grid"/>
            <span>Painel de Controlo</span>
          </span>
        </li>
        
        <li className="nav-heading">Editar Perfil</li>

        <li className="nav-item">
          <Link to="/admin" className="nav-link collapsed">
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
              <Link to="/admin">
                <i className="bi bi-circle"/>
                <span>Gerir Administradores</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/gerir_consumidores">
                <i className="bi bi-circle"/>
                <span>Gerir Consumidores</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/gerir_fornecedores">
                <i className="bi bi-circle"/>
                <span>Gerir Fornecedores</span>
              </Link> 
            </li>
          </ul>
        </li>

        <li className="nav-heading">Gestão de Produtos</li>

        <li className="nav-item">
          <Link to="/admin" className="nav-link collapsed">
            <i className="bi bi-cart"/>
            <span>Gerir Produtos</span>
          </Link>
        </li>

        <li className="nav-heading">Gestão de Transportes</li>

        <li className="nav-item">
          <Link to="/admin" className="nav-link collapsed">
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
              <Link to="/admin">
                <i className="bi bi-circle"/>
                <span>Relatório de Consumidores</span>
              </Link>
            </li>

            <li>
              <Link to="/admin">
                <i className="bi bi-circle"/>
                <span>Relatório de Encomendas</span>
              </Link>
            </li>

            <li>
              <Link to="/admin">
                <i className="bi bi-circle"/>
                <span>Relatório de Fornecedores</span>
              </Link>
            </li>

            <li>
              <Link to="/admin">
                <i className="bi bi-circle" />
                <span>Relatório de Veiculos</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-heading">Ferramentas</li>

        <li className="nav-item">
          <Link to="/admin" className="nav-link collapsed">
            <i className="bi bi-envelope"/>
            <span>Enviar Email</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin" className="nav-link collapsed">
            <i className="bi bi-chat-left-dots"/>
            <span>Mensagens</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin" className="nav-link collapsed" >
            <i className="bi bi-question-circle" />
            <span>Suporte</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin" className="nav-link collapsed">
            <i className="bi bi-gear"/>
            <span>Definições</span>
          </Link>
        </li>

      </ul>
    </aside>
  );
}

export default Aside;
