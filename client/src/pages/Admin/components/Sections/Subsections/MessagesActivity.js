import React from "react";

function RecentActivity() {
  return (
    <div className="col-xxl-6 col-md-6">
      {/* Recent Activity */}
      <div className="card">
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
            Mensagens <span> | Hoje</span>
          </h5>
          <div className="activity">
            <div className="activity-item d-flex">
              <div className="activite-label">32 min</div>
              <i className="bi bi-circle-fill activity-badge text-success align-self-start" />
              <div className="activity-content">
                Olá tenho uma{" "}
                <a href="#" className="fw-bold text-dark">
                  proposta{" "}
                </a>
                parceria.
              </div>
            </div>
            {/* End activity item*/}
            <div className="activity-item d-flex">
              <div className="activite-label">56 min</div>
              <i className="bi bi-circle-fill activity-badge text-danger align-self-start" />
              <div className="activity-content">
                Olá Admin 1, temos tarefas.
              </div>
            </div>
            {/* End activity item*/}
            <div className="activity-item d-flex">
              <div className="activite-label">2 hrs</div>
              <i className="bi bi-circle-fill activity-badge text-primary align-self-start" />
              <div className="activity-content">
                Temos de verficar o tráfico do sistema.
              </div>
            </div>
            {/* End activity item*/}
            <div className="activity-item d-flex">
              <div className="activite-label">1 day</div>
              <i className="bi bi-circle-fill activity-badge text-info align-self-start" />
              <div className="activity-content">
                Preparação da{" "}
                <a href="#" className="fw-bold text-dark">
                  versão
                </a>{" "}
                2.
              </div>
            </div>
            {/* End activity item*/}
            <div className="activity-item d-flex">
              <div className="activite-label">2 days</div>
              <i className="bi bi-circle-fill activity-badge text-warning align-self-start" />
              <div className="activity-content">Finalizei a task.</div>
            </div>
            {/* End activity item*/}
            <div className="activity-item d-flex">
              <div className="activite-label">4 weeks</div>
              <i className="bi bi-circle-fill activity-badge text-muted align-self-start" />
              <div className="activity-content">
                Admin 1, completaste a tua tarefa?
              </div>
            </div>
            {/* End activity item*/}
          </div>
        </div>
      </div>
      {/* End Recent Activity */}
    </div>
  );
}

export default RecentActivity;
