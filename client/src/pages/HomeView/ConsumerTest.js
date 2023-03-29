import React, { useState } from 'react';
import putToDB from '../../hooks/putToDB';

function ConsumerTest() {

    /*
    name
    email
    nif
    mobile_number
    address
    account_status
    */
    
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [nif, setNif] = useState(null)
    const [mobile_number, setMobileNumber] = useState(null)
    const [address, setAddress] = useState(null)

    const handleSetName = (event) => {
      setName(event.target.value)
    }

    const handleSetEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleSetNif = (event) => {
        setNif(event.target.value)
    }

    const handleSetMobileNumber = (event) => {
        setMobileNumber(event.target.value)
    }

    const handleSetAddress = (event) => {
        setAddress(event.target.value)
    }

    const submit = async () => {

        //Verificar dados antes de inseri-los
        //podem ser null
        //pelo menos um tem de estar inserido ou então nem envia o update




        /*let validEAN = await verifyEAN(EAN);
        let validName = await verifyName(name);
        let validProductionDate = await verifyProductionDate(data_producao);
        let validDescription = await verifyDescription(descricao);*/

        //get the id consumer
        let id = 2;
  
        let consumerUpdated = await putToDB("/consumers/" + id,{
            name: name,
            email: email,
            nif: nif,
            mobile_number: mobile_number,
            address: address,
          })

        console.log(consumerUpdated)

        let text = "Não foi possivel alterar os dados\n";
        if(consumerUpdated == true){
            text = "Dados alterados"
        } 
        alert(text)
    }

        /*
        
        // Se todos os verifys forem OK, entra 
        if(validEAN == "OK" && validName == "OK" && validProductionDate == "OK"  && validDescription == "OK"){
          product = await putToDB("/products",{
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
      }*/

  return (
    <div>
        <h3>Consumidor - Inserir os campos que pretende alterar</h3><br></br>
        <form action="" method="put">
            <input type="text" placeholder="Nome" value = {name ?? ""} name="name" onChange={handleSetName}></input><br></br>
            <input type="email" placeholder="Email" value = {email ?? ""} name="email" onChange={handleSetEmail}></input><br></br>
            <input type="text" placeholder="Nif" value = {nif ?? ""} name="nif" onChange={handleSetNif}></input><br></br>
            <input type="tel" placeholder="Número de telemóvel" value = {mobile_number ?? ""} name="mobile_number" onChange={handleSetMobileNumber}></input><br></br>
            <input type="text" placeholder="Morada" value = {address ?? ""} name="address" onChange={handleSetAddress}></input><br></br>
        </form>
        <button type="submit" onClick={() => submit()}>Alterar</button>
    </div>
  )
}

export default ConsumerTest