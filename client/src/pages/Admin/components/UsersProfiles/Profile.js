import React from 'react'

function Profile() {
  return (
    <div className="col-xxl-4">
      <h5 className="card-title">Perfil </h5>
      <div className="card" style={{ textAlign: "center" }}>
          <br></br>
          <img
          className="card-img-top rounded mx-auto d-block "
          src="https://img.freepik.com/premium-photo/3d-render-image-smirking-cool-yellow-emoticon-emoji_477250-7.jpg?w=2000"
          alt="Card image cap"
          style={{ width: "55%" }}
          ></img>
          <div className="card-body">
          <h5 className="card-title">Anderson Bandera</h5>
          <p className="card-text">GreaterGoods Admin</p>
          <p className="card-text">fcXXXXX, Faculdade de Ciências da UL</p>
          <label><strong>Email Público:</strong></label>
          <p className="card-text"> anderson_support@greatergoods.fcul</p>
          </div>
      </div>
    </div>
  );
}

export default Profile
