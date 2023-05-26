import React, { useEffect, useState, useRef } from 'react';
import {FiUser, FiMail, FiLock, FiSmartphone, FiMapPin, FiCheck, FiX} from 'react-icons/fi';
import { BiIdCard } from 'react-icons/bi';

import getFromDB from '../../../hooks/getFromDB';
import putToDB from '../../../hooks/putToDB';

import {NavbarSupplier, Footer, SubHeading, SnackBar, Modal} from '../../../components/index';
import './SupplierProfile.css';
import LoadingPage from '../../LoadingPage';
import logOut from '../../../hooks/logOut';
import axios from 'axios';

const SnackbarType = {
  success: "success",
  fail: "fail",
};

function SupplierProfile() {
  //pop-ups
  const [isOpen, setIsOpen] = useState(false);  //modal
  const snackbarRef = useRef(null); //SnackBar
  const [snackbarType, setSnackbarType] = useState(SnackbarType.success); // SnackBar

  //erros
  const [CPerror, setCPError] = useState(false); 
  const [Nameerror, setNameError] = useState(false); 
  const [Emailerror, setEmailError] = useState(false); 
  const [Niferror, setNifError] = useState(false); 
  const [Numbererror, setNumberError] = useState(false); 
  const [overallError, setOverallError] = useState(false);

  //info
  const [id, setID] = useState(null)       
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [nif, setNif] = useState(null)
  const [mobile_number, setMobileNumber] = useState(null)
  const [city, setCity] = useState(null)
  const [address, setAddress] = useState(null)
  const [postalCode, setPostalCode] = useState(null)

  const [didMount, setDidMount] = useState(false)

  async function getSupplier(){

    let supplier = await getFromDB("/suppliers", {uid: true})

    setID(supplier[0].id)
    setName(supplier[0].name)
    setEmail(supplier[0].email)
    setNif(supplier[0].nif)
    setMobileNumber(supplier[0].mobile_number)
    setCity(supplier[0].city)
    setAddress(supplier[0].address)
    setPostalCode(supplier[0].postal_code)
    setDidMount(true)
  }

  useEffect(()=>{
    getSupplier()
  }, [])

  const handleSetName = (event) => {
      setName(event.target.value)
  }

  const handleSetEmail = (event) => {
      let email = event.target.value;
      setEmail(email);
      verifyEmail(email);
  }

  const handleSetNif = (event) => {
      let nif = event.target.value;
      setNif(nif);
      verifyNif(nif);
  }

  const handleSetMobileNumber = (event) => {
      let number = event.target.value;
      setMobileNumber(number);
      verifyMobileNumber(number);
  }

  const handleSetCity = (value) => {
      setCity(value)
  }

  const handleSetAddress = (value) => {
      setAddress(value)
  }

  const [sent, setSent] = useState(false)

  const handleSetPostalCode = async (event) => { 
    setPostalCode(event.target.value)
    console.log(event.target.value)
    await axios.get('https://json.geoapi.pt/cp/'+event.target.value) 
    .then((response) => { 
      console.log(response)
      setCPError(false)
      let distrito = response.data.Distrito
      let concelho = response.data.Concelho
      let localidade = response.data.Localidade
      let morada = response.data.partes[0]["Artéria"]
      console.log(morada)
      handleSetCity(concelho)
      handleSetAddress(morada)
      setPostalCode(event.target.value)
    })
    .catch((CPerror) => {
      console.log(CPerror)
      console.log("ok")
      setCPError(true)
    })
    
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
          setEmailError(true);
          return "Deve de inserir um email válido";
        }
        if(email[i+1] == undefined){
          setEmailError(true);
          return "Deve de inserir um email válido";
        }
        setEmailError(false);
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
              setNifError(true);
              return "O NIF deve ter 9 dígitos";
          }
          for (var i = 0; i < nif.length; i++) {
              var digit = parseInt(nif[i], 10);
              if (isNaN(digit)) {
                // O NIF deve conter apenas dígitos numéricos
                setNifError(true);
                return "O NIF deve conter apenas dígitos numéricos";
              }
          }
          setNifError(false);
      }
      return "OK"
  }

  function verifyMobileNumber(mobile_number){
      //Retorna OK se estiver tudo bem, se não, retorna o erro 
      //podem ser null
      //9 algarismos ?? depende do código do pais

      if(mobile_number != null && mobile_number != ""){
        if(mobile_number.length != 9){
          setNumberError(true);
          return "O número de telemóvel deve ter 9 dígitos";
        }
        for (var i = 0; i < mobile_number.length; i++) {
          var digit = parseInt(mobile_number[i], 10);
          if (isNaN(digit)) {
            // O número de telemóvel deve conter apenas dígitos numéricos
            setNumberError(true);
            return "O número de telemóvel deve conter apenas dígitos numéricos";
          }
        }
        if(mobile_number[0] != "9"){
          //O número de telemóvel deve de começar pelo dígito 9
          setNumberError(true);
          return "O número de telemóvel deve de começar pelo dígito 9";
        }
        setNumberError(false);
      }
      return "OK"
  }

  const submit = async () => {

    setSent(true)

    let validName = verifyName(name);
    let validEmail = verifyEmail(email);
    let validNif = verifyNif(nif);
    let validMobileNumber = verifyMobileNumber(mobile_number);
    let supplierUpdated;

    if(!((name == null || name == "") && (email == null || email == "") && (nif == null || nif == "") && (mobile_number == null || mobile_number == "") && (address == null || address == ""))){
      if(!Nameerror && !Emailerror && !Niferror && !Numbererror && !CPerror){
        supplierUpdated = await putToDB("/suppliers/" + id,{
          name: name,
          email: email,
          nif: nif,
          mobile_number: mobile_number,
          city: city,
          address: address,
          postal_code: postalCode,
        })
      }    

      if(supplierUpdated == true){
          setSnackbarType(SnackbarType.success);
          snackbarRef.current.show();
      } else{
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
              ? "Os dados foram guardados"
              : "Não foi possível alterar os dados"
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
                  <div className={!Nameerror ? "app__SupplierProfile_box_div_row_input" : "app__SupplierProfile_box_div_row_error_input"}>
                    <FiUser></FiUser>
                    <input type="text" placeholder="Nome" value = {name ?? ""} name="name" onChange={handleSetName}></input>
                  </div>
                </div>
                <div className='app__SupplierProfile_box_div_row'>
                  Telemóvel
                  <div className={!Numbererror ? "app__SupplierProfile_box_div_row_input" : "app__SupplierProfile_box_div_row_error_input"}>
                    <FiSmartphone></FiSmartphone>
                    <input type="tel" placeholder="Número de telemóvel" value = {mobile_number ?? ""} name="mobile_number" onChange={handleSetMobileNumber}></input>
                  </div>
                  {
                    Numbererror &&
                      <div className='error_msg'>Número com formato errado.</div>
                  }
                </div>
                <div className='app__SupplierProfile_box_div_row'>
                  NIF
                  <div className={!Niferror ? "app__SupplierProfile_box_div_row_input" : "app__SupplierProfile_box_div_row_error_input"}>
                    <BiIdCard></BiIdCard>
                    <input type="text" placeholder="NIF" value = {nif ?? ""} name="nif" onChange={handleSetNif}></input>
                  </div>
                  {
                    Niferror &&
                      <div className='error_msg'>NIF com formato errado.</div>
                  }
                </div>
              </div>
              <div className='app__SupplierProfile_box_div'>
                <div className='app__SupplierProfile_box_div_row'>
                  Email
                  <div className={!Emailerror ? "app__SupplierProfile_box_div_row_input" : "app__SupplierProfile_box_div_row_error_input"}>
                    <FiMail></FiMail>
                    <input type="email" placeholder="Email" value = {email ?? ""} name="email" onChange={handleSetEmail}></input>
                  </div>
                  {
                    Emailerror &&
                      <div className='error_msg'>Email com formato errado.</div>
                  }
                </div>
                <div className='app__SupplierProfile_box_div_row'>
                  Morada
                  <div className='app__SupplierProfile_box_div_row_input'>
                    <FiMapPin style={{opacity: "0.4"}}></FiMapPin>
                    <input style={{opacity: "0.4"}} type="text" placeholder="Morada" value = {address ?? ""} name="address" disabled></input>
                  </div>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}} className='app__SupplierProfile_box_div_row'>
                  <div>
                    Cidade
                    <div className='app__SupplierProfile_box_div_row_input'>
                      <FiMapPin style={{opacity: "0.4"}}></FiMapPin>
                      <input style={{opacity: "0.4"}} type="text" placeholder="Cidade" value = {city ?? ""} name="city" disabled></input>
                    </div>
                  </div>
                  <div>
                    Cód. Postal
                    <div className={!CPerror ? "app__SupplierProfile_box_div_row_input" : "app__SupplierProfile_box_div_row_error_input"}>
                      <FiMapPin></FiMapPin>
                      <input type="text" placeholder="Cód. Postal" value = {postalCode ?? ""} name="postalCode" onChange={handleSetPostalCode}></input>
                    </div>
                    {
                      CPerror &&
                        <div className='error_msg'>Código postal não encontrado.</div>
                    }
                  </div>
                </div>
              </div>
            </div>
            <p>Alterar Password</p>
            <div className='app__SupplierProfile_box'>
              <div className='app__SupplierProfile_box_div'>
                <div className='app__SupplierProfile_box_div_row'>
                  Nova Password
                  <div className='app__SupplierProfile_box_div_row_input'>
                    <FiLock></FiLock>
                    <input
                      id="password-input"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  { password && (
                      <ul className='app__SupplierProfile_password-checks'>
                        <li>
                          {isEightCharLong ? 
                              ''
                            : 
                              <div>Mínimo de 8 caracteres de comprimento: <span className='app__SupplierProfile_password-checks_symbol-fail'><FiX fontSize={20}></FiX></span></div>
                          }
                        </li>
                        <li>
                          {hasNumber ? 
                              ''
                            : 
                              <div>Contém pelo menos 1 número: <span className='app__SupplierProfile_password-checks_symbol-fail'><FiX fontSize={20}></FiX></span></div>
                          }
                        </li>
                        <li>
                          {hasLowerCase ? 
                              ''
                            : 
                              <div>Contém pelo menos 1 letra minúscula: <span className='app__SupplierProfile_password-checks_symbol-fail'><FiX fontSize={20}></FiX></span></div>
                          }
                        </li>
                        <li>
                          {hasUpperCase ? 
                            ''
                          : 
                            <div>Contém pelo menos 1 letra maiúscula: <span className='app__SupplierProfile_password-checks_symbol-fail'><FiX fontSize={20}></FiX></span></div>
                          }
                        </li>
                        <li>
                          {hasSpecialChar ? 
                            ''
                          : 
                            <div>Contém pelo menos 1 caractere especial: <span className='app__SupplierProfile_password-checks_symbol-fail'><FiX fontSize={20}></FiX></span></div>
                          }
                        </li>
                      </ul>
                  )}
                </div>
              </div>
              <div className='app__SupplierProfile_box_div'>
                <div className='app__SupplierProfile_box_div_row'>
                    Confirmar Nova Password
                    <div className='app__SupplierProfile_box_div_row_input'>
                      <FiLock></FiLock>
                      <input
                        id="confirm-password-input"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                    </div>
                    {(password !== "" || confirmPassword !== "") && (passwordMatch ? (
                      ""
                    ) : (
                      <div className='app__SupplierProfile_password-checks'>
                        <span className='app__SupplierProfile_password-checks_symbol-fail'>Passwords não correspondem: <FiX fontSize={20}></FiX></span>
                      </div>
                    ))}
                </div>
              </div>  
            </div>
          </div>
          <div className="app__SupplierProfile_button">
          <button type="submit" onClick={() => setIsOpen(true)} className='main__action_btn'>Guardar</button>             
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
              <p style={{fontSize:'18px'}}>Tem a certeza que deseja alterar os seus dados?</p>
              <div className='inputField' style={{marginTop:'1.5rem'}}>
                <p style={{marginTop: '0'}}>Password</p>
                <input style={{width:'80%'}} type="password" name="" placeholder='Introduza a sua password'></input>
              </div> 
              <div style={{display: 'flex', justifyContent:'space-evenly', gap:'1.5rem', marginTop: '2rem'}}>
                <button className='main__action_btn' onClick={() => setIsOpen(false)}>Cancelar</button>
                <button className='main__negative_action_btn' onClick={() => { submit(); setIsOpen(false)}}>Guardar</button>
              </div>
            </Modal>
            <button type="button" className='main__negative_action_btn' onClick={async () => await logOut()}>Log Out</button>
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