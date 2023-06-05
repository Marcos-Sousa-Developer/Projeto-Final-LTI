import React, { useEffect, useState } from "react";
import getAllFromDB from "../../../../hooks/getAllFromDB";
import putToDB from "../../../../hooks/putToDB";

function UserData() {
  const [isread_Only, setisread_Only] = useState(true)
  const [isform_disable, setisform_disable] = useState(true)
  const [adminData, setAdminData] = useState({})

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [country, setCountry] = useState("")
  const [district, setDistrict] = useState("")
  const [city, setCity] = useState("")
  const [town, setTown] = useState("")
  const [address, setAddress] = useState("")
  const [postCode, setPostalCode] = useState("")

  const activeOrDeactivateForm = () => {
    isread_Only ? setisread_Only(false) : setisread_Only(true)
    isform_disable ? setisform_disable(false) : setisform_disable(true)
  }

  const submit = async () => {

    let resp = await putToDB('/admins/'+adminData.id,{
      name: name,
      mobile_number: phone,
      country: country,
      district: district,
      city: city,
      town: town,
      address: address,
      postal_code: postCode
    })

    window.location.reload()

  }

  useEffect(() => {
    async function run() {
      let resp = await getAllFromDB('/admins',{uid:true})  
      setAdminData(resp[0])
      setName(resp[0].name)
      setPhone(resp[0].mobile_number)
      setCountry(resp[0].country)
      setDistrict(resp[0].district)
      setCity(resp[0].city)
      setTown(resp[0].town)
      setAddress(resp[0].address)
      setPostalCode(resp[0].postal_code)
    }
    run()
  },[])

  return (
    <div className="col-xxl-12">
      <h5 className="card-title">
        <i className="bi bi-file-person"></i> Meus Dados Pessoais
      </h5>
      <div className="card">
          <div className="container">
          <br></br>
            <div className="row">
              <div className="form-group col-md-8 mb-3">
                <label htmlFor="name">Nome</label>
                <input
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isform_disable}
                  readOnly={isread_Only}
                ></input>
              </div>
              <div className="form-group col-md-4 mb-3">
                <label htmlFor="mobile">Telemóvel</label>
                <input
                  className="form-control"
                  id="mobile"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isform_disable}
                  readOnly={isread_Only}
                ></input>
              </div>
            </div>
            <div className="form-group col-md-12 mb-3">
              <label htmlFor="email">Email </label>
              <input
                className="form-control"
                id="email"
                value={adminData.email}
                disabled={true}
                readOnly={true}
              ></input>
            </div>
            <div className="row">
              <div className="form-group col-md-2 mb-2">
                <label htmlFor="country">País</label>
                <input
                  className="form-control"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  disabled={isform_disable}
                  readOnly={isread_Only}
                ></input>
              </div>
              <div className="form-group col-md-2 mb-2">
                <label htmlFor="state">Distrito</label>
                <input
                  className="form-control"
                  id="state"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  disabled={isform_disable}
                  readOnly={isread_Only}
                ></input>
              </div>
              <div className="form-group col-md-3 mb-3">
                <label htmlFor="concelho">Concelho</label>
                <input
                  className="form-control"
                  id="concelho"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={isform_disable}
                  readOnly={isread_Only}
                ></input>
              </div>
              <div className="form-group col-md-5 mb-4">
                <label htmlFor="freguesia">Freguesia</label>
                <input
                  className="form-control"
                  id="freguesia"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  disabled={isform_disable}
                  readOnly={isread_Only}
                ></input>
              </div>
          <div className="form-group col-md-9 mb-9">
              <label htmlFor="address">Endereço</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={isform_disable}
                readOnly={isread_Only}
              ></input>              
          </div>
          <div className="form-group col-md-3 mb-3">
                <label htmlFor="postal_code">Código Postal</label>
                <input
                  className="form-control"
                  id="postal_code"
                  value={postCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  disabled={isform_disable}
                  readOnly={isread_Only}
                ></input>
              </div>
          </div>        
            </div>
            
            
          <div className="text-center" style={{paddingBottom: "15px"}}>
            {isread_Only ? (
              <button
                className="btn btn-warning"
                style={{ fontSize: "15px" }}
                onClick={() => activeOrDeactivateForm()}
              >
                Editar
              </button>
            ) : (
              <div>
                <button
                  className="btn btn-secondary"
                  style={{ fontSize: "15px" }}
                  onClick={() => activeOrDeactivateForm()}
                >
                  Fechar
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className="btn btn-success"
                  style={{ fontSize: "15px" }}
                  onClick={() => submit()}
                >
                  Alterar
                </button>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}

export default UserData;
