import React, { useEffect, useState, useRef } from 'react';
import {FiUser, FiMail, FiLock, FiSmartphone, FiMapPin, FiCheck, FiX} from 'react-icons/fi';
import { BiIdCard } from 'react-icons/bi';

import getFromDB from '../../../hooks/getFromDB';
import putToDB from '../../../hooks/putToDB';

import {Navbar, Footer, SubHeading, SnackBar, Modal} from '../../../components/index';
import './ConsumerProfile.css';
import LoadingPage from '../../LoadingPage';

const SnackbarType = {
  success: "success",
  fail: "fail",
};

function ConsumerProfile() {
  //---------------------Modal---------------
  const [isOpen, setIsOpen] = useState(false);

  //-------------------SnackBar--------------
  const snackbarRef = useRef(null);
  const [snackbarType, setSnackbarType] = useState(SnackbarType.success);

  //-----------------------------------------

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

      //let text = "Não foi possivel alterar os dados\n";
      if(consumerUpdated == true){
          /*text = "Dados alterados"
          location.reload();
          alert(text)*/


          //console.log("sucesso");
          setSnackbarType(SnackbarType.success);
          snackbarRef.current.show();
          //location.reload();
      } else if(validName != "OK" || validEmail != "OK" || validNif != "OK" || validMobileNumber != "OK" || validAddress != "OK"){
          /*if(validName != "OK" ){
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
          alert(text) */


          //console.log("insucesso");
          setSnackbarType(SnackbarType.fail);
          snackbarRef.current.show();
          //location.reload();
      } 
    }
  }
  //-------------------Password Checker------------------------
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isEightCharLong, setIsEightCharLong] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  const handlePasswordChange = (event) => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
    setIsEightCharLong(inputPassword.length >= 8);
    setHasNumber(/\d/.test(inputPassword));
    setHasLowerCase(/[a-z]/.test(inputPassword));
    setHasUpperCase(/[A-Z]/.test(inputPassword));
    setHasSpecialChar(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(inputPassword));
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const passwordMatch = password === confirmPassword;

  //-------------------------------------------------------------------------
  return (
    <>
    {
      didMount == false ? (
        <>
          <LoadingPage></LoadingPage>
        </>
      )
      :
      (
      <>
      <Navbar></Navbar>
          <SnackBar
            ref={snackbarRef}
            message={
              snackbarType === SnackbarType.success
                ? "Alterações guardadas"
                : "Dados incorretos"
            }
            type={snackbarType}
          />
      <div className='app__ConsumerProfile main__container'>   {/*este div tem de ser um form secalhar*/}
        <SubHeading title="Conta"/>
        <div className='app__ConsumerProfile_options'>
          <ul>
            <li><span></span><a className='option active app__text_effect' href="#">Dados Pessoais</a></li>
            <li><a className='app__text_effect' href="#">Encomendas</a></li>
          </ul>
        </div>
        <div className='app__ConsumerProfile_border'>
          <p>Dados da Minha Conta</p>
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
          <p>Alterar Password</p>
          <div className='app__ConsumerProfile_box'>
            <div className='app__ConsumerProfile_box_div'>
              <div className='app__ConsumerProfile_box_div_row'>
                Password
                <div className='app__ConsumerProfile_box_div_row_input'>
                  <FiLock></FiLock>
                  <input
                    id="password-input"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <ul className='app__ConsumerProfile_password-checks'>
                  <li>
                    {isEightCharLong ? 
                        ''
                      : 
                      <>
                        <div>Mínimo de 8 caracteres de comprimento: <span className='app__ConsumerProfile_password-checks_symbol-fail'><FiX fontSize={20}></FiX></span></div>
                      </>
                    }
                  </li>
                  <li>
                    {hasNumber ? 
                        ''
                      : 
                      <>
                        <div>Contém pelo menos 1 número: <span className='app__ConsumerProfile_password-checks_symbol-fail'><FiX fontSize={20}></FiX></span></div>
                      </>
                    }
                  </li>
                  <li>
                    {hasLowerCase ? 
                        ''
                      : 
                      <>
                        <div>Contém pelo menos 1 letra minúscula: <span className='app__ConsumerProfile_password-checks_symbol-fail'><FiX fontSize={20}></FiX></span></div>
                      </>
                    }
                  </li>
                  <li>
                    {hasUpperCase ? 
                      ''
                    : 
                      <>
                        <div>Contém pelo menos 1 letra maiúscula: <span className='app__ConsumerProfile_password-checks_symbol-fail'><FiX fontSize={20}></FiX></span></div>
                      </>
                    }
                  </li>
                  <li>
                    {hasSpecialChar ? 
                      ''
                    : 
                      <>
                        <div>Contém pelo menos 1 caractere especial: <span className='app__ConsumerProfile_password-checks_symbol-fail'><FiX fontSize={20}></FiX></span></div>
                      </>
                    }
                  </li>
                </ul>
              </div>
            </div>
            <div className='app__ConsumerProfile_box_div'>
              <div className='app__ConsumerProfile_box_div_row'>
                  Confirmar Password
                  <div className='app__ConsumerProfile_box_div_row_input'>
                    <FiLock></FiLock>
                    <input
                      id="confirm-password-input"
                      type="password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                  </div>
                  {passwordMatch ? (
                    <div className='app__ConsumerProfile_password-checks'>
                      <span className='app__ConsumerProfile_password-checks_symbol-success'>Passwords correspondem: <FiCheck fontSize={20}></FiCheck></span>
                    </div>
                  ) : (
                    <div className='app__ConsumerProfile_password-checks'>
                      <span className='app__ConsumerProfile_password-checks_symbol-fail'>Passwords não correspondem: <FiX fontSize={20}></FiX></span>
                    </div>
                  )}
              </div>
            </div>  
          </div>
        </div>
        <div className="app__ConsumerProfile_button">
          <button type="submit" onClick={() => setIsOpen(true)} className='main__action_btn'>Guardar</button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <p>Tem a certeza que deseja alterar os dados da sua conta?</p>
            <button onClick={() => setIsOpen(false)}>Cancelar</button>
            <button onClick={() => { submit(); setIsOpen(false); }}>Guardar</button>
          </Modal>
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