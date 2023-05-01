import React, { useEffect, useState } from 'react';
import getFromDB from '../../../hooks/getFromDB';
import putToDB from '../../../hooks/putToDB';
import {Navbar, Footer, SubHeading} from '../../../components/index';
import {FiUser, FiMail, FiLock, FiSmartphone, FiMapPin} from 'react-icons/fi';
import { BiIdCard } from 'react-icons/bi';
import './ConsumerProfile.css';

function ConsumerProfile() {
  const [id, setID] = useState(null)        
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [nif, setNif] = useState(null)
  const [mobile_number, setMobileNumber] = useState(null)
  const [address, setAddress] = useState(null)

  const [didMount, setDidMount] = useState(false)

  async function getConsumer(){

    let consumer = await getFromDB("/consumers", {uid: true})
    
    setID(consumer[0].id)
    setName(consumer[0].name)
    setEmail(consumer[0].email)
    setNif(consumer[0].nif)
    setMobileNumber(consumer[0].mobile_number)
    setAddress(consumer[0].address)
    setDidMount(true)
  }

  useEffect(()=>{
    getConsumer()
  }, [])

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

    let validName = verifyName(name);
    let validEmail = verifyEmail(email);
    let validNif = verifyNif(nif);
    let validMobileNumber = verifyMobileNumber(mobile_number);
    let validAddress = verifyAddress(address);

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
          location.reload();
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
    <>
    {
      didMount == false ? (
        <>
          Loading
        </>
      )
      :
      (
      <>
      <Navbar></Navbar>
      <div className='app__ConsumerProfile'>   
        <SubHeading title="Conta"/>
        <div className='app__ConsumerProfile_options'>
          <ul>
            <li><span></span><a className='option active app__text_effect' href="#">Dados Pessoais</a></li>
            <li><a className='app__text_effect' href="#">Encomendas</a></li>
          </ul>
        </div>
        <div className='app__ConsumerProfile_border'>
          <div className='app__ConsumerProfile_box'>
            <div className='app__ConsumerProfile_box_div'>
              <div className='app__ConsumerProfile_box_div_row'>
                Nome
                <div className='app__ConsumerProfile_box_div_row_input'>
                  <FiUser></FiUser>
                  <input type="text" placeholder="Nome" value = {name ?? ""} name="name" onChange={handleSetName}></input>
                </div>
              </div>
              <div className='app__ConsumerProfile_box_div_row'>
                Telemóvel
                <div className='app__ConsumerProfile_box_div_row_input'>
                  <FiSmartphone></FiSmartphone>
                  <input type="tel" placeholder="Número de telemóvel" value = {mobile_number ?? ""} name="mobile_number" onChange={handleSetMobileNumber}></input>
                </div>
              </div>
              <div className='app__ConsumerProfile_box_div_row'>
                Morada
                <div className='app__ConsumerProfile_box_div_row_input'>
                  <FiMapPin></FiMapPin>
                  <input type="text" placeholder="Morada" value = {address ?? ""} name="address" onChange={handleSetAddress}></input>
                </div>
              </div>
            </div>
            <div className='app__ConsumerProfile_box_div'>
              <div className='app__ConsumerProfile_box_div_row'>
                Email
                <div className='app__ConsumerProfile_box_div_row_input'>
                  <FiMail></FiMail>
                  <input type="email" placeholder="Email" value = {email ?? ""} name="email" onChange={handleSetEmail}></input>
                </div>
              </div>
              <div className='app__ConsumerProfile_box_div_row'>
                NIF
                <div className='app__ConsumerProfile_box_div_row_input'>
                  <BiIdCard></BiIdCard>
                  <input type="text" placeholder="NIF" value = {nif ?? ""} name="nif" onChange={handleSetNif}></input>
                </div>
              </div>
            </div>
          </div>
          <div className='app__ConsumerProfile_box'>
            <div className='app__ConsumerProfile_box_div'>
              <div className='app__ConsumerProfile_box_div_row'>
                Palavra-passe
                <div className='app__ConsumerProfile_box_div_row_input'>
                  <FiLock></FiLock>
                  <input></input>
                </div>
              </div>
            </div>
            <div className='app__ConsumerProfile_box_div'>
              <div className='app__ConsumerProfile_box_div_row'>
                  Confirmar palavra-passe
                  <div className='app__ConsumerProfile_box_div_row_input'>
                    <FiLock></FiLock>
                    <input></input>
                  </div>
              </div>
            </div>  
          </div>
        </div>
        <div className="app__ConsumerProfile_button">
        <button type="submit" onClick={() => submit()} className='main__action_btn'>Guardar</button>
        </div>
      </div>
      <Footer></Footer>
      </>
      )
    }
    </>
  );
}

export default ConsumerProfile;