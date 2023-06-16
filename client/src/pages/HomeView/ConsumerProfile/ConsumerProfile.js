import React, { useEffect, useState, useRef } from 'react';
import {FiUser, FiMail, FiLock, FiSmartphone, FiMapPin, FiCheck, FiX, FiTrash2} from 'react-icons/fi';
import { BiIdCard } from 'react-icons/bi';

import getFromDB from '../../../hooks/getFromDB';
import putToDB from '../../../hooks/putToDB';

import {Navbar, Footer, SubHeading, SnackBar, Modal} from '../../../components/index';
import './ConsumerProfile.css';
import LoadingPage from '../../LoadingPage';
import logOut from '../../../hooks/logOut';
import ConsumerBar from '../../../components/ConsumerBar/ConsumerBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SnackbarType = {
  success: "success",
  fail: "fail",
};

function ConsumerProfile() {

  const [notSubmit, setNotSubmit] = useState(false)
  const [passwordToVerify, setPasswordToVerify] = useState("")
  const [inProcess, setInProcess] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false); //modal
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);  //modal
  const snackbarRef = useRef(null); //SnackBar
  const [snackbarType, setSnackbarType] = useState(SnackbarType.success); //SnackBar

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

  async function getConsumer(){

    let consumer = await getFromDB("/consumers", {uid: true})
    
    setID(consumer[0].id)
    setName(consumer[0].name)
    setEmail(consumer[0].email)
    setNif(consumer[0].nif)
    setMobileNumber(consumer[0].mobile_number)
    setCity(consumer[0].city)
    setAddress(consumer[0].address)
    setPostalCode(consumer[0].postal_code)
    setDidMount(true)
  }

  useEffect(()=>{
    getConsumer()
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
      setCity(value);
  }

  const handleSetAddress = (value) => {
      setAddress(value);
  }

  const handleSetPostalCode = async (event) => { 
    setPostalCode(event.target.value)
    await axios.get('https://json.geoapi.pt/cp/'+event.target.value) 
    .then((response) => { 
      setCPError(false)
      let distrito = response.data.Distrito
      let concelho = response.data.Concelho
      let localidade = response.data.Localidade
      let morada = response.data.partes[0]["Artéria"]
      handleSetCity(concelho)
      handleSetAddress(morada)
      setPostalCode(event.target.value)
    })
    .catch((CPerror) => {
      setCPError(true)
    })
    
  }

  function verifyName(name){
    //Retorna OK se estiver tudo bem, se não, retorna o erro 
    //podem ser null
    return "OK"
  }
/*
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
*/
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

    let consumerUpdated;

    if(!((name == null || name == "") && (email == null || email == "") && (nif == null || nif == "") && (mobile_number == null || mobile_number == "") && (address == null || address == ""))){
      if(!Nameerror && !Emailerror && !Niferror && !Numbererror && !CPerror){
        consumerUpdated = await putToDB("/consumers/" + id,{
          name: name,
          email: email,
          nif: nif,
          mobile_number: mobile_number,
          city: city,
          address: address,
          postal_code: postalCode,
        })
      }    

      if(consumerUpdated === "Consumer has been updated"){
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

  const verifyPassword = async () => { 
    try {

      setInProcess(true)

      let params = {"token": passwordToVerify}
  
      const result = await axios.post('/verifyPassword', null, {params, withCredentials:true})
  
      setNotSubmit(false)
  
      if(result.data) {
        setNotSubmit(false)
        await submit()
        setIsOpen(false)
        setInProcess(false)
      }
      else {
        setNotSubmit(true)
        setInProcess(false)
      }

    }

  catch {
    setNotSubmit(true)
    setInProcess(false)
  }
  }

  const changePassword = async () => {
    try{

      let params = {"newToken": password}

      const result = await axios.post('/changePassword', null, {params, withCredentials:true})
  
      if(result.data) {
        setSnackbarType(SnackbarType.success);
        snackbarRef.current.show();
      }
      else {
        setSnackbarType(SnackbarType.fail);
        snackbarRef.current.show();
      }

    }    
    catch{ 
      setSnackbarType(SnackbarType.fail);
      snackbarRef.current.show();
    }
  }

  const verifyChangePassword = async () => {

    try {

      setInProcess(true)

      let params = {"token": passwordToVerify}
      const result = await axios.post('/verifyPassword', null, {params, withCredentials:true})
  
      setNotSubmit(false)
  
      if(result.data) {
        setNotSubmit(false)
        await changePassword()
        setIsChangePasswordOpen(false)
        setInProcess(false)
        setConfirmPassword("")
        setPassword("")
      }
      else {
        setNotSubmit(true)
        setInProcess(false)
      }

    }

    catch {
      setNotSubmit(true)
      setInProcess(false)
    }

  }

  const deleteAccount = async () => {

    try{

      let params = {"newToken": passwordToVerify}

      const result = await axios.post('/deleteAccount', null, {params, withCredentials:true})
  
      if(result.data) {
        navigate("/");
        setSnackbarType(SnackbarType.success);
        snackbarRef.current.show();
      }
      else {
        setSnackbarType(SnackbarType.fail);
        snackbarRef.current.show();
      }

    }    
    catch{ 
      setSnackbarType(SnackbarType.fail);
      snackbarRef.current.show();
    }

  }

  const verifyDeleteAccount = async () => {

    try {

      setInProcess(true)

      let params = {"token": passwordToVerify}
      const result = await axios.post('/verifyPassword', null, {params, withCredentials:true})

      setNotSubmit(false)

      if(result.data) {
        setNotSubmit(false)
        await deleteAccount()
        setIsDeleteOpen(false)
        setInProcess(false)
        setConfirmPassword("")
        setPassword("")
      }
      else {
        setNotSubmit(true)
        setInProcess(false)
      }

    }
    catch {

    }

  }



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
            ? "Os dados foram guardados"
            : "Não foi possível alterar os dados"
        }
        type={snackbarType}
      />
      <div className='app__ConsumerProfile main__container'>   {/*este div tem de ser um form secalhar*/}
        <SubHeading title="Conta"/>
        <ConsumerBar active1='active'></ConsumerBar>
        <div className='app__ConsumerProfile_border'>
          <p>Dados da Minha Conta</p>
          <div className='app__ConsumerProfile_box'>
            <div className='app__ConsumerProfile_box_div'>
              <div className='app__ConsumerProfile_box_div_row'>
                Nome
                <div className={!Nameerror ? "app__SupplierProfile_box_div_row_input" : "app__SupplierProfile_box_div_row_error_input"}>
                  <FiUser></FiUser>
                  <input type="text" placeholder="Nome" value = {name ?? ""} name="name" onChange={handleSetName}></input>
                </div>
              </div>
              <div className='app__ConsumerProfile_box_div_row'>
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
              <div className='app__ConsumerProfile_box_div_row'>
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
            <div className='app__ConsumerProfile_box_div'>
              <div className='app__ConsumerProfile_box_div_row'>
                Email
                <div className={!Emailerror ? "app__SupplierProfile_box_div_row_input" : "app__SupplierProfile_box_div_row_error_input"}>
                  <FiMail style={{opacity: "0.4"}}></FiMail>
                  <input style={{opacity: "0.4"}} type="email" placeholder="Email" value = {email ?? ""} name="email" disabled></input>
                </div>
                {
                  Emailerror &&
                    <div className='error_msg'>Email com formato errado.</div>
                }
              </div>
              <div className='app__ConsumerProfile_box_div_row'>
                Morada
                <div className='app__ConsumerProfile_box_div_row_input'>
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
                { password && (
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
                )}
              </div>
              <Modal open={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)}>
                    <p style={{fontSize:'18px'}}>Tem a certeza que deseja alterar a palavra passe?</p>

                    <div className='inputField' style={{marginTop:'1.5rem'}}>
                      <p style={{marginTop: '0'}}>Password Antiga</p>
                      <input style={{width:'80%'}} type="password" name="" placeholder='Introduza a sua password' onChange={(e) => setPasswordToVerify(e.target.value)}></input>
                    </div>
                    {
                      notSubmit === true ? (
                        <small style={{color: "red"}}>Password Incorreta </small> 
                      )
                      :
                      (
                        <small style={{color: "red"}}></small> 
                      )
                    }
                    <div style={{display: 'flex', justifyContent:'space-evenly', gap:'1.5rem', marginTop: '2rem'}}>
                      <button className='main__action_btn' onClick={() => setIsChangePasswordOpen(false)}>Cancelar</button>
                      {
                        (passwordToVerify === "" || inProcess==true) ? (
                          <button className='main__negative_action_btn' style={{opacity:"0.2"}} disabled>Guardar</button>
                        )
                        :
                        (
                          <button className='main__negative_action_btn' onClick={() => { verifyChangePassword()}}>Guardar</button>
                        )
                      }
                    </div>
                </Modal>
                {
                  (!isEightCharLong || !hasNumber || !hasLowerCase || !hasUpperCase || !hasSpecialChar || password === "" || !passwordMatch) ? (
                    <button className='main__action_btn' style={{opacity: "0.4"}} disabled>Alterar Password</button>
                  )
                  :
                  (
                    <button type="submit" onClick={() => setIsChangePasswordOpen(true)} className='main__action_btn'>Alterar Password</button>
                  )
                }
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
                  {(password !== "" || confirmPassword !== "") && (passwordMatch ? (
                    <div className='app__ConsumerProfile_password-checks'>
                      <span className='app__ConsumerProfile_password-checks_symbol-success'>Passwords correspondem: <FiCheck fontSize={20}></FiCheck></span>
                    </div>
                  ) : (
                    <div className='app__ConsumerProfile_password-checks'>
                      <span className='app__ConsumerProfile_password-checks_symbol-fail'>Passwords não correspondem: <FiX fontSize={20}></FiX></span>
                    </div>
                  ))}
              </div>
            </div>  
          </div>
        </div>
        <div className="app__ConsumerProfile_button">
                    
          {
                  CPerror ? (
                    <button style={{opacity:"0.4"}} className='main__action_btn' disabled>Guardar</button>
                  )
                  : 
                  (
                    <button type="submit" onClick={() => setIsOpen(true)} className='main__action_btn'>Guardar</button>
                  )
          }  
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
              <p style={{fontSize:'18px'}}>Tem a certeza que deseja alterar os seus dados?</p>

              <div className='inputField' style={{marginTop:'1.5rem'}}>
                <p style={{marginTop: '0'}}>Password</p>
                <input style={{width:'80%'}} type="password" name="" placeholder='Introduza a sua password' onChange={(e) => setPasswordToVerify(e.target.value)}></input>
              </div>
              {
                notSubmit === true ? (
                  <small style={{color: "red"}}>Password Incorreta </small> 
                )
                :
                (
                  <small style={{color: "red"}}></small> 
                )
              }
              <div style={{display: 'flex', justifyContent:'space-evenly', gap:'1.5rem', marginTop: '2rem'}}>
                <button className='main__action_btn' onClick={() => setIsOpen(false)}>Cancelar</button>
                {
                  (passwordToVerify === "" || inProcess==true)  ? (
                    <button className='main__negative_action_btn' style={{opacity:"0.2"}} disabled>Guardar</button>
                  )
                  :
                  (
                    <button className='main__negative_action_btn' onClick={() => { verifyPassword()}}>Guardar</button>
                  )
                }
              </div>
              
            </Modal>
            <button type="button" className='main__negative_action_btn' onClick={async () => await logOut()}>Log Out</button>
            <button type='button' onClick={() => setIsDeleteOpen(true)} ><FiTrash2></FiTrash2></button>

            <Modal open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
              <p style={{fontSize:'18px'}}>Tem a certeza que deseja apagar a conta?</p>
              <small>Condições para apagar a conta:</small>
              <ol>
                <li style={{color: "red"}}>Sem nenhuma encomenda pendente!</li>
              </ol>

              <div className='inputField' style={{marginTop:'1.5rem'}}>
                <p style={{marginTop: '0'}}>Password</p>
                <input style={{width:'80%'}} type="password" name="" placeholder='Introduza a sua password' onChange={(e) => setPasswordToVerify(e.target.value)}></input> <br></br>
                <small style={{color: "red"}}>Esta ação não tem retorno!</small>
              </div>
              <br></br>
              {
                notSubmit === true ? (
                  <small style={{color: "red"}}>Password Incorreta </small> 
                )
                :
                (
                  <small style={{color: "red"}}></small> 
                )
              }
              <div style={{display: 'flex', justifyContent:'space-evenly', gap:'1.5rem', marginTop: '2rem'}}>
                <button className='main__action_btn' onClick={() => setIsDeleteOpen(false)}>Cancelar</button>
                {
                  (passwordToVerify === "" || inProcess==true)  ? (
                    <button className='main__negative_action_btn' style={{opacity:"0.2"}} disabled>Apagar</button>
                  )
                  :
                  (
                    <button className='main__negative_action_btn' onClick={() => { verifyDeleteAccount()}}>Apagar</button>
                  )
                }
              </div>
              
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