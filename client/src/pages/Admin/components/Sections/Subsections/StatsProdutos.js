import React from "react";

function StatsProdutos() {
  return (
    <div className="col-xxl-4 col-md-4">
      <div className="card info-card customers-card">
        <div className="filter">
          <a className="icon" href="#" data-bs-toggle="dropdown">
            <i className="bi bi-three-dots" />
          </a>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <li className="dropdown-header text-start">
              <h6>Filter</h6>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Today
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                This Month
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                This Year
              </a>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <h5 className="card-title">
            + Produtos <span>| Este ano</span>
          </h5>
          <div className="d-flex align-items-center">
            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i className="bi bi-cart" />
            </div>
            <div className="ps-3">
              <h6>1244</h6>
              <span className="text-success small pt-1 fw-bold">12%</span>{" "}
              <span className="text-muted small pt-2 ps-1">decrease</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsProdutos;
