import React, { useEffect, useState, useRef } from 'react';
import {FiUser, FiMail, FiLock, FiSmartphone, FiMapPin, FiCheck, FiX} from 'react-icons/fi';
import { BiIdCard } from 'react-icons/bi';

import getFromDB from '../../../hooks/getFromDB';
import putToDB from '../../../hooks/putToDB';

import {NavbarSupplier, Footer, SubHeading, SnackBar, Modal} from '../../../components/index';
import './SupplierProfile.css';
import LoadingPage from '../../LoadingPage';

const SnackbarType = {
  success: "success",
  fail: "fail",
};

function SupplierProfile() {
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

  async function getSupplier(){

    let supplier = await getFromDB("/suppliers", {uid: true})

    console.log(supplier)

    setID(supplier[0].id)
    setName(supplier[0].name)
    setEmail(supplier[0].email)
    setNif(supplier[0].nif)
    setMobileNumber(supplier[0].mobile_number)
    setAddress(supplier[0].address)
    setDidMount(true)
  }

  useEffect(()=>{
    getSupplier()
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
        let i = email.indexOf("@")
        if(i == -1 || i == 0){
          return "Deve de inserir um email válido";
        }
        if(email[i+1] == undefined){
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

      if(mobile_number != null && mobile_number != ""){
        if(mobile_number.length != 9){
          return "O número de telemóvel deve ter 9 dígitos";
        }
        for (var i = 0; i < mobile_number.length; i++) {
          var digit = parseInt(mobile_number[i], 10);
          if (isNaN(digit)) {
            // O número de telemóvel deve conter apenas dígitos numéricos
            return "O número de telemóvel deve conter apenas dígitos numéricos";
          }
        }
        if(mobile_number[0] != "9"){
          //O número de telemóvel deve de começar pelo dígito 9
          return "O número de telemóvel deve de começar pelo dígito 9";
        }
      }
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

    let supplierUpdated;

    if(!((name == null || name == "") && (email == null || email == "") && (nif == null || nif == "") && (mobile_number == null || mobile_number == "") && (address == null || address == ""))){
      if(validName == "OK" && validEmail == "OK" && validNif == "OK" && validMobileNumber == "OK" && validAddress == "OK" ){
        supplierUpdated = await putToDB("/api/suppliers/" + id,{
          name: name,
          email: email,
          nif: nif,
          mobile_number: mobile_number,
          address: address,
        })
      }    

      //let text = "Não foi possivel alterar os dados\n";
      if(supplierUpdated == true){
          setSnackbarType(SnackbarType.success);
          snackbarRef.current.show();
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
          setSnackbarType(SnackbarType.fail);
          snackbarRef.current.show();
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
        <NavbarSupplier></NavbarSupplier>
        <SnackBar
          ref={snackbarRef}
          message={
            snackbarType === SnackbarType.success
              ? "Alterações guardadas"
              : "Dados incorretos"
          }
          type={snackbarType}
        />
        <div className='app__SupplierProfile main__container'>   {/*este div tem de ser um form secalhar*/}
          <SubHeading title="Conta"/>
          <div className='app__SupplierProfile_content'>
            <p>Dados da Minha Conta</p>
            <div className='app__SupplierProfile_box'>
              <div className='app__SupplierProfile_box_div'>
                <div className='app__SupplierProfile_box_div_row'>
                  Nome
                  <div className='app__SupplierProfile_box_div_row_input'>
                    <FiUser></FiUser>
                    <input type="text" placeholder="Nome" value = {name ?? ""} name="name" onChange={handleSetName}></input>
                  </div>
                </div>
                <div className='app__SupplierProfile_box_div_row'>
                  Telemóvel
                  <div className='app__SupplierProfile_box_div_row_input'>
                    <FiSmartphone></FiSmartphone>
                    <input type="tel" placeholder="Número de telemóvel" value = {mobile_number ?? ""} name="mobile_number" onChange={handleSetMobileNumber}></input>
                  </div>
                </div>
                <div className='app__SupplierProfile_box_div_row'>
                  Morada
                  <div className='app__SupplierProfile_box_div_row_input'>
                    <FiMapPin></FiMapPin>
                    <input type="text" placeholder="Morada" value = {address ?? ""} name="address" onChange={handleSetAddress}></input>
                  </div>
                </div>
              </div>
              <div className='app__SupplierProfile_box_div'>
                <div className='app__SupplierProfile_box_div_row'>
                  Email
                  <div className='app__SupplierProfile_box_div_row_input'>
                    <FiMail></FiMail>
                    <input type="email" placeholder="Email" value = {email ?? ""} name="email" onChange={handleSetEmail}></input>
                  </div>
                </div>
                <div className='app__SupplierProfile_box_div_row'>
                  NIF
                  <div className='app__SupplierProfile_box_div_row_input'>
                    <BiIdCard></BiIdCard>
                    <input type="text" placeholder="NIF" value = {nif ?? ""} name="nif" onChange={handleSetNif}></input>
                  </div>
                </div>
              </div>
            </div>
            <p>Alterar Password</p>
            <div className='app__SupplierProfile_box'>
              <div className='app__SupplierProfile_box_div'>
                <div className='app__SupplierProfile_box_div_row'>
                  Password
                  <div className='app__SupplierProfile_box_div_row_input'>
                    <FiLock></FiLock>
                    <input
                      id="password-input"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <ul className='app__SupplierProfile_password-checks'>
                    <li>
                      {isEightCharLong ? 
                          ''
                        : 
                        <>
                          <div>Mínimo de 8 caracteres de comprimento: <span className='app__SupplierProfile_password-checks_symbol-fail'><FiX fontSize={20}></FiX></span></div>
                        </>
                      }
                    </li>
                    <li>
                      {hasNumber ? 
                          ''
                        : 
                        <>
                          <div>Contém pelo menos 1 número: <span className='app__SupplierProfile_password-checks_symbol-fail'><FiX fontSize={20}></FiX></span></div>
                        </>
                      }
                    </li>
                    <li>
                      {hasLowerCase ? 
                          ''
                        : 
                        <>
                          <div>Contém pelo menos 1 letra minúscula: <span className='app__SupplierProfile_password-checks_symbol-fail'><FiX fontSize={20}></FiX></span></div>
                        </>
                      }
                    </li>
                    <li>
                      {hasUpperCase ? 
                        ''
                      : 
                        <>
                          <div>Contém pelo menos 1 letra maiúscula: <span className='app__SupplierProfile_password-checks_symbol-fail'><FiX fontSize={20}></FiX></span></div>
                        </>
                      }
                    </li>
                    <li>
                      {hasSpecialChar ? 
                        ''
                      : 
                        <>
                          <div>Contém pelo menos 1 caractere especial: <span className='app__SupplierProfile_password-checks_symbol-fail'><FiX fontSize={20}></FiX></span></div>
                        </>
                      }
                    </li>
                  </ul>
                </div>
              </div>
              <div className='app__SupplierProfile_box_div'>
                <div className='app__SupplierProfile_box_div_row'>
                    Confirmar Password
                    <div className='app__SupplierProfile_box_div_row_input'>
                      <FiLock></FiLock>
                      <input
                        id="confirm-password-input"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                    </div>
                    {passwordMatch ? (
                      <div className='app__SupplierProfile_password-checks'>
                        <span className='app__SupplierProfile_password-checks_symbol-success'>Passwords correspondem: <FiCheck fontSize={20}></FiCheck></span>
                      </div>
                    ) : (
                      <div className='app__SupplierProfile_password-checks'>
                        <span className='app__SupplierProfile_password-checks_symbol-fail'>Passwords não correspondem: <FiX fontSize={20}></FiX></span>
                      </div>
                    )}
                </div>
              </div>  
            </div>
          </div>
          <div className="app__SupplierProfile_button">
            <button type="submit" onClick={() => setIsOpen(true)} className='main__action_btn'>Guardar</button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
              <p>Tem a certeza que deseja alterar os dados da sua conta?</p>
              <button onClick={() => setIsOpen(false)}>Cancelar</button>
              <button onClick={() => { submit(); setIsOpen(false); }}>Guardar</button>
            </Modal>
            <button type="button" className='main__negative_action_btn'>Log Out</button>
          </div>
        </div>
        <Footer></Footer>
        </>
        )
      }
    </>
  );
}

export default SupplierProfile;