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

    function verifyEAN(EAN){
      //Retorna OK se estiver tudo bem, se não, retorna o erro 
      //Não é null
      //Tem 8 ou 13 algarismos e são todos numéricos

      if(EAN == "" || EAN == null) {
        // O EAN não pode ser nulo
        return "Deve de inserir um EAN válido";
      }

      if (EAN.length !== 8 && EAN.length !== 13) {
        // O EAN deve ter 8 ou 13 dígitos
        return "O EAN deve ter 8 ou 13 dígitos";
      }
      
      var checksum = 0;
      for (var i = 0; i < EAN.length - 1; i++) {
        var digit = parseInt(EAN[i], 10);
        if (isNaN(digit)) {
          // O EAN deve conter apenas dígitos numéricos
          return "O EAN deve conter apenas dígitos numéricos";
        }
        checksum += (i % 2 === 0) ? digit * 3 : digit;
      }
      
      var lastDigit = parseInt(EAN[EAN.length - 1], 10);
      if (isNaN(lastDigit)) {
        // O EAN deve conter apenas dígitos numéricos
        return "O EAN deve conter apenas dígitos numéricos";
      } else {
        return "OK";
      }

      //if(((10 - (checksum % 10)) === lastDigit) == true){
      //  return "OK" ;
      //} else{
      //  return "EAN inválido";
      //}
    }

    function verifyName(name){
      //retornar OK se estiver tudo bem e se não, o erro 
      //não é null
    }

    function verifyProductionDate(dateString){
      //Retorna OK se estiver tudo bem, se não, retorna o erro 
      //Não é null
      //a data tem de ser mais antiga que a data atual

      if(dateString == "" || dateString == null) {
        // A data de produção não pode ser nula
        return "Deve de inserir uma data de produção válida";
      }

      var date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // A data de produção tem de ser válida
        return "Deve de inserir uma data de produção válida";
      }

      var today = new Date();
      if((date < today) == false){
        //"A data de produção deve de ser anterior à data de hoje"
        return "A data de produção deve de ser anterior ou igual à data de hoje";
      } else {
        return "OK";
      }
    }

    function verifyDescription(description){
      //retornar OK se estiver tudo bem e se não, o erro
      //não é null
    }

    const submit = async () => {

      let validEAN = verifyEAN(EAN);
      //let validName = verifyName(name)
      let validProductionDate = verifyProductionDate(data_producao)
      //let validDescription = verifyDescription(descricao)

      let product;
      
      // Se todos os verifys forem OK, entra 
      if(validEAN == "OK" && validProductionDate == "OK"){
        product = await postToDB("/products",{
          EAN: EAN,
          name: name,
          production_date: data_producao,
          description: descricao,
        })
      }

      //No futuro é suposto mostrar o erro por baixo de cada input no form
      if(product == true){
        alert("Produto criado")
      } else if(validEAN == "OK" && validProductionDate != "OK") { //consoante os OK, dá as diferentes mensagens de erro
        alert("Não foi possivel criar o produto")
        alert(validProductionDate)
      } else if(validEAN != "OK" && validProductionDate == "OK") { //consoante os OK, dá as diferentes mensagens de erro
        alert("Não foi possivel criar o produto")
        alert(validEAN)
      } else if(validEAN != "OK" && validProductionDate != "OK") { //consoante os OK, dá as diferentes mensagens de erro
        alert("Não foi possivel criar o produto")
        alert(validEAN)
        alert(validProductionDate)
      }  else{
        alert("Não foi possivel criar o produto, tente novamente")
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
