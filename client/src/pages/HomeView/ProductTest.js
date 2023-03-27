import React, { useState } from 'react';
import postToDB from '../../hooks/postToDB';

function ProductTest() {

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

    function erros(){
    }

    const submit = async () => {

      //tratamento de erros
        erro()

       let product = await postToDB("/products",{
            EAN: EAN,
            name: name,
            production_date: data_producao,
            description: descricao,
        })
        if(product == true){
          alert("Product created")
        } else {
          alert("Product not created, try again")
        }
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

export default ProductTest
