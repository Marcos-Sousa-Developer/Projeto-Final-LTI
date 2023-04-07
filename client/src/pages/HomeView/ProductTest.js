import React, { useState } from 'react';
import getFromDB from '../../hooks/getFromDB';
import postToDB from '../../hooks/postToDB';

function ProductTest() {

    const [EAN, setEAN] = useState(null)
    const [name, setName] = useState(null)
    const [production_date, setProductionDate] = useState(null)
    const [description, setDescription] = useState(null)
    const [title, setTitle] = useState(null)
    const [price, setPrice] = useState(null)

    const handleSetEAN = (event) => {
        setEAN(event.target.value)
    }

    const handleSetName = (event) => {
      setName(event.target.value)
    }

    const handleSetProductionDate = (event) => {
      setProductionDate(event.target.value)
    }

    const handleSetDescription = (event) => {
      setDescription(event.target.value)
    }

    const handleSetTitle= (event) => {
      setTitle(event.target.value)
    }

    const handleSetPrice= (event) => {
      setPrice(event.target.value)
    }



    async function verifyEAN(EAN){
      //Retorna OK se estiver tudo bem, se não, retorna o erro 
      //Não é null
      //Não pode existir na bd ainda
      //Tem 8 ou 13 algarismos e são todos numéricos

      if(EAN == "" || EAN == null) {
        // O EAN não pode ser nulo
        return "Deve de inserir um EAN válido";
      }

      let product = await getFromDB("/products/" + EAN);
      
      if(product.length == 1){
        return "O produto com o EAN inserido já se encontra criado";
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

    async function verifyName(name){
      //retornar OK se estiver tudo bem e se não, o erro 
      //não é null

      if(name == "" || name == null) {
        // O EAN não pode ser nulo
        return "Deve de inserir um nome válido";
      }
      return "OK"
    }

    async function verifyProductionDate(dateString){
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

    async function verifyDescription(description){
      //retornar OK se estiver tudo bem e se não, o erro
      //não é null

      if(description == "" || description == null) {
        // O EAN não pode ser nulo
        return "Deve de inserir uma descrição válida";
      }
      return "OK"
    }

    async function searchEAN(){
      console.log(EAN)
      let validEAN = await verifyEAN(EAN);
      console.log(validEAN)
      if(validEAN == "OK" || validEAN == "O produto com o EAN inserido já se encontra criado"){
          //get à api
          let getEAN = await getFromDB("/products",{
            EAN: EAN,
          })
          if(getEAN.length == 1){
            //pode continuar com o anuncio e vai para outra página
          }else{
            alert(getEAN)
          }
      }else {
        alert(validEAN)
      }
    }

    const submit = async () => {

      let validEAN = await verifyEAN(EAN);
      let validName = await verifyName(name);
      let validProductionDate = await verifyProductionDate(production_date);
      let validDescription = await verifyDescription(description);
      //title
      //price

      let product;
      
      // Se todos os verifys forem OK, entra 
      if(validEAN == "OK" && validName == "OK" && validProductionDate == "OK"  && validDescription == "OK"){
        product = await postToDB("/products",{
          EAN: EAN,
          name: name,
          production_date: data_producao,
          description: descricao,
        })
      }

      let text = "Não foi possivel criar o produto\n";
      //No futuro é suposto mostrar o erro por baixo de cada input no form
      if(product == true){
        text = "Produto criado"
      } else if(validEAN != "OK" || validName != "OK" || validProductionDate != "OK" || validDescription != "OK"){
        if(validEAN != "OK" ){
          text += validEAN + "\n"
        }
        if(validName != "OK" ){
          text += validName + "\n"
        }
        if (validProductionDate != "OK"){
          text += validProductionDate + "\n"
        }
        if(validDescription != "OK" ){
          text += validDescription + "\n"
        }
      }
      alert(text)
    }

  return (
    <div>

    <input type="search" placeholder="EAN" value = {EAN ?? ""} name="EAN" onChange={handleSetEAN}></input><br></br>
    <button onClick={() => searchEAN()}>Search EAN</button>
    <br></br><br></br>

    <p>Se já existir EAN</p>

    <form action="" method="post">
      <input type="text" placeholder="Titulo" value = {title ?? ""} name="title" onChange={handleSetTitle} required></input><br></br>
      <input type="text" placeholder="Descrição" value = {description ?? ""} name="description" onChange={handleSetDescription} required></input><br></br>
      <input type="text" placeholder="Preço" value = {price ?? ""} name="price" onChange={handleSetPrice} required></input><br></br>
    </form>

    <button type="submit" onClick={() => submit()}>Criar produto</button>

    <br></br><br></br>
    <p>Se não existir EAN</p>

    <form action="" method="post">
      <input type="text" placeholder="Titulo" value = {title ?? ""} name="title" onChange={handleSetTitle} required></input><br></br>
      <input type="text" placeholder="Descrição" value = {description ?? ""} name="description" onChange={handleSetDescription} required></input><br></br>
      <input type="text" placeholder="Preço" value = {price ?? ""} name="price" onChange={handleSetPrice} required></input><br></br>
      <input type="text" placeholder="EAN" value = {EAN ?? ""} name="EAN" onChange={handleSetEAN} required></input><br></br>
    </form>

    <button type="submit" onClick={() => submit()}>Criar produto</button>
    
    </div>
  )
}

export default ProductTest
