import React from "react";

function StatsConsumer() {
  return (
    <div className="col-xxl-4 col-md-4">
      <div className="card info-card sales-card">
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
                Este mês
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
            + Consumidores <span>| Hoje</span>
          </h5>
          <div className="d-flex align-items-center">
            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i className="bi bi-people" />
            </div>
            <div className="ps-3">
              <h6>145</h6>
              <span className="text-success small pt-1 fw-bold">12%</span>{" "}
              <span className="text-muted small pt-2 ps-1">increase</span>
            </div>
          </div>
        </div>
      </div>

      

    </div>
  );
}

export default StatsConsumer;
