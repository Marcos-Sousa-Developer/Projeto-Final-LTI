import React, { useState } from 'react';

function SupplierTest() {

    //FALTA MUDAR TUDO

    const [EAN, setEAN] = useState(null)
    const [name, setName] = useState(null)
    const [data_producao, setDataProducao] = useState(null)
    const [descricao, setDescricao] = useState(null)

    const handleSetEAN = (event) => {
        setEAN(event.target.value)
    }

    const handleSetName = (event) => {
      setName(event.target.value)
    }

    const handleSetDataProducao = (event) => {
      setDataProducao(event.target.value)
    }

    const handleSetDescricao = (event) => {
      setDescricao(event.target.value)
    }


  return (
    <div>
      <form action="" method="post">
        <input type="text" placeholder="EAN" value = {EAN ?? ""} name="EAN" onChange={handleSetEAN} required></input><br></br>
        <input type="text" placeholder="Nome" value = {name ?? ""} name="name" onChange={handleSetName} required></input><br></br>
        <input type="date" placeholder="Data de Producao" value = {data_producao ?? ""} name="data_producao" onChange={handleSetDataProducao} required></input><br></br>
        <input type="text" placeholder="Descrição" value = {descricao ?? ""} name="descricao" onChange={handleSetDescricao} required></input><br></br>
      </form>
      <button type="submit" onClick={() => submit()}>Create Product</button>
    </div>
  )
}

export default SupplierTest