import React, { useState } from 'react';
import putToDB from '../../hooks/putToDB';

function ConsumerTest() {
    
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

    function verifyName(name){
        //Retorna OK se estiver tudo bem, se não, retorna o erro 
        //podem ser null
        return "OK"
    }

    function verifyEmail(email){
        //Retorna OK se estiver tudo bem, se não, retorna o erro 
        //podem ser null
        //tem de ter um @
        
        if(email != null && email != ""){
          if(!email.includes("@")){
            return "Deve de inserir um email válido";
          }
        }
        return "OK"
    }

    function verifyNif(nif){
        //Retorna OK se estiver tudo bem, se não, retorna o erro 
        //podem ser null
        //9 algarismos

        if(nif != null && nif != ""){
            if(nif.length != 9){
                // O NIF deve ter 9 dígitos
                return "O NIF deve ter 9 dígitos";
            }
            for (var i = 0; i < nif.length; i++) {
                var digit = parseInt(nif[i], 10);
                if (isNaN(digit)) {
                  // O NIF deve conter apenas dígitos numéricos
                  return "O NIF deve conter apenas dígitos numéricos";
                }
            }
        }
        return "OK"
    }

    function verifyMobileNumber(mobile_number){
        //Retorna OK se estiver tudo bem, se não, retorna o erro 
        //podem ser null
        //9 algarismos ?? depende do código do pais 
        return "OK"
    }

    function verifyAddress(address){
        //Retorna OK se estiver tudo bem, se não, retorna o erro 
        //podem ser null
        return "OK"
    }

    
    const submit = async () => {

        //pelo menos um tem de estar inserido ou então nem envia o update

        console.log(name)
        console.log(email)
        console.log(nif)
        console.log(mobile_number)
        console.log(address)

        let validName = verifyName(name);
        let validEmail = verifyEmail(email);
        let validNif = verifyNif(nif);
        let validMobileNumber = verifyMobileNumber(mobile_number);
        let validAddress = verifyAddress(address);

        console.log(validName)
        console.log(validEmail)
        console.log(validNif)
        console.log(validMobileNumber)
        console.log(validAddress)

        //Get the id consumer
        let id = 2;
        
        let consumerUpdated;

        if(!((name == null || name == "") && (email == null || email == "") && (nif == null || nif == "") && (mobile_number == null || mobile_number == "") && (address == null || address == ""))){
            if(validName == "OK" && validEmail == "OK" && validNif == "OK" && validMobileNumber == "OK" && validAddress == "OK" ){
                consumerUpdated = await putToDB("/consumers/" + id,{
                name: name,
                email: email,
                nif: nif,
                mobile_number: mobile_number,
                address: address,
              })
          }    

          let text = "Não foi possivel alterar os dados\n";
          if(consumerUpdated == true){
              text = "Dados alterados"
              alert(text) 
          } else if(validName != "OK" || validEmail != "OK" || validNif != "OK" || validMobileNumber != "OK" || validAddress != "OK"){
              if(validName != "OK" ){
                text += validName + "\n"
              }
              if(validEmail != "OK" ){
                text += validEmail + "\n"
              }
              if (validNif != "OK"){
                text += validNif + "\n"
              }
              if(validMobileNumber != "OK" ){
                text += validMobileNumber + "\n"
              }
              if(validAddress != "OK" ){
                  text += validAddress + "\n"
              }
              alert(text) 
          } 
        }      
    }

  return (
    <div>
        <h3>Consumidor - Inserir os campos que pretende alterar</h3><br></br>
        <form action="" method="put">
            <input type="text" placeholder="Nome" value = {name ?? ""} name="name" onChange={handleSetName}></input><br></br>
            <input type="email" placeholder="Email" value = {email ?? ""} name="email" onChange={handleSetEmail}></input><br></br>
            <input type="text" placeholder="NIF" value = {nif ?? ""} name="nif" onChange={handleSetNif}></input><br></br>
            <input type="tel" placeholder="Número de telemóvel" value = {mobile_number ?? ""} name="mobile_number" onChange={handleSetMobileNumber}></input><br></br>
            <input type="text" placeholder="Morada" value = {address ?? ""} name="address" onChange={handleSetAddress}></input><br></br>
        </form>
        <button type="submit" onClick={() => submit()}>Alterar</button>
    </div>
  )
}

export default ConsumerTest