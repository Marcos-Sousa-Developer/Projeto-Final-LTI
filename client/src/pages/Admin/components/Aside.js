import React from "react";
import { Link } from "react-router-dom";

function Aside() {
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
          <button className="nav-link collapsed" data-bs-target="#gerir-users" data-bs-toggle="collapse">
            <i className="bi bi-people"/>
            <span>Gerir Utilizadores&nbsp;&nbsp;</span>
            <i className="bi bi-chevron-down ms-auto"/>
          </button>

          <ul id="gerir-users" className="nav-content collapse " data-bs-parent="#sidebar-nav">
            
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
          <button className="nav-link collapsed" data-bs-target="#data-activity" data-bs-toggle="collapse" >
            <i className="bi bi-journal-text"/>
            <span>Obter relatórios&nbsp;&nbsp;</span>
            <i className="bi bi-chevron-down ms-auto"/>
          </button>

          <ul id="data-activity" className="nav-content collapse" data-bs-parent="#sidebar-nav">
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
