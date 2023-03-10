import React from 'react'

function Profile() {
  return (
    <div className="col-xxl-4">
      <h5 className="card-title"><i class="bi bi-person-circle"></i> Perfil Público </h5>
      <div className="card" style={{ textAlign: "center" }}>
          <br></br>
          <img
          className="card-img-top rounded mx-auto d-block"
          src="https://img.freepik.com/premium-photo/3d-render-image-smirking-cool-yellow-emoticon-emoji_477250-7.jpg?w=2000"
          alt="Card image cap"
          style={{ width: "45%" }}
          ></img>
          <div className="card-body">
          <h5 className="card-title"><strong>Anderson Bandera</strong></h5>
          <label><strong>Função</strong></label>
          <p className="card-text">GreaterGoods Admin</p>
          <label><strong>Sede</strong></label>
          <p className="card-text">Faculdade de Ciências da UL</p>
          <label><strong>Email</strong></label>
          <p className="card-text"> supportXXXXX@greatergoods.fcul</p>
          </div>
      </div>
    </div>
  );
}

export default Profile
