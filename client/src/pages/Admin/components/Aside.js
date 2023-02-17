import React from "react";
import { Link } from "react-router-dom";

function Aside() {
  return (
    <aside id="sidebar" className="sidebar">
      {/* ======= Sidebar ======= */}
      <ul className="sidebar-nav" id="sidebar-nav">
        {/* Dashboard Nav */}
        <li className="nav-item">
          <a className="nav-link " href="#">
            {" "}
            {/* index.html */}
            <i className="bi bi-grid" />
            <span>Painel de Controlo</span>
          </a>
        </li>
        {/* End Dashboard Nav */}
        <li className="nav-heading">Editar Perfil</li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="#">
            <i className="bi bi-person" />
            <span>Meu Perfil</span>
          </a>
        </li>
        <li className="nav-heading">Gestão de utilizadores</li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#gerir-users"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-people" />
            <span>Gerir Utilizadores</span>
            <i className="bi bi-chevron-down ms-auto" />
          </a>
          <ul
            id="gerir-users"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="#">
                <i className="bi bi-circle" />
                <span>Gerir Administradores</span>
              </a>
            </li>
            <li>
              <Link to="/admin/gerir_consumidores">
                <i className="bi bi-circle" />
                <span>Gerir Consumidores</span>
              </Link>
            </li>
            <li>
              <Link to="gerir_fornecedores">
                <i className="bi bi-circle" />
                <span>Gerir Fornecedores</span>
              </Link> 
            </li>
          </ul>
        </li>
        {/* End Forms Nav */}
        <li className="nav-heading">Gestão de Produtos</li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="#">
            <i className="bi bi-cart" />
            <span>Gerir Produtos </span>
          </a>
        </li>
        {/* End Contact Page Nav */}
        <li className="nav-heading">Gestão de Transportes</li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="#">
            <i className="bi bi-car-front" />
            <span>Gerir Transportes</span>
          </a>
        </li>
        {/* End Contact Page Nav */}
        <li className="nav-heading">Relatório de Atividades</li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#data-activity"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-journal-text" />
            <span>Obter relatórios</span>
            <i className="bi bi-chevron-down ms-auto" />
          </a>
          <ul
            id="data-activity"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="#">
                <i className="bi bi-circle" />
                <span>Relatório de Consumidores</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle" />
                <span>Relatório de Encomendas</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle" />
                <span>Relatório de Fornecedores</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle" />
                <span>Relatório de Veiculos</span>
              </a>
            </li>
          </ul>
        </li>
        {/* End Forms Nav */}
        <li className="nav-heading">Ferramentas</li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="#">
            <i className="bi bi-envelope" />
            <span>Enviar Email</span>
          </a>
        </li>
        {/* End Contact Page Nav */}
        <li className="nav-item">
          <a className="nav-link collapsed" href="#">
            <i className="bi bi-chat-left-dots" />
            <span>Mensagens</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="#">
            <i className="bi bi-question-circle" />
            <span>Suporte</span>
          </a>
        </li>
        {/* End F.A.Q Page Nav */}
        <li className="nav-item">
          <a className="nav-link collapsed" href="#">
            <i className="bi bi-gear" />
            <span>Definições</span>
          </a>
        </li>
        {/* End Login Page Nav */}
      </ul>
    </aside>
  );
}

export default Aside;
