import React from 'react'

function Profile() {
  return (
    <div className="col-lg-4">
      <h5 className="card-title">
        <i className="bi bi-person-circle"></i> Perfil Público{" "}
      </h5>
      <div className="card mb-4">
        <div className="card-body text-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
            alt="avatar"
            className="rounded-circle img-fluid"
            style={{ width: "150px" }}
          ></img>
          <h5 className="my-3">Anderson Smith</h5>
          <p className="text-muted">GreaterGoods Support</p>
          <p className="text-muted">andersonsupport@greatergoods.com</p>
          <p className="text-muted">Faculdade de Ciências, FCUL</p>
          {/* 
          <div className="d-flex justify-content-center mb-2">
            <button type="button" className="btn btn-primary">
              Follow
            </button>
            <button type="button" className="btn btn-outline-primary ms-1">
              Message
            </button>
          </div>*/}
          </div> 
      </div>

      <div className="card mb-4 mb-lg-0">
        <div className="card-body p-0">
          <h5 className="text-center" style={{paddingTop:"10px"}}>Links Úteis</h5>
          <ul className="list-group list-group-flush rounded-3">
            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
              <i className="bi bi-briefcase-fill"></i>
              <p className="mb-0">Faculdade de ciências da UL</p>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
              <i className="bi bi-envelope-at-fill"></i>
              <p className="mb-0">Suporte de Administradores</p>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
            <i className="bi bi-google-play"></i>
              <p className="mb-0">GreaterGoods Site</p>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
              <i className="bi bi-instagram"></i>
              <p className="mb-0">Fcul Instagram</p>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
              <i className="bi bi-linkedin"></i>
              <p className="mb-0">Fcul Linkedin</p>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
              <i className="bi bi-linkedin"></i>
              <p className="mb-0">Fcul Linkedin</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile
