import React, {useState, useEffect} from 'react';

import {Navbar, NavbarSupplier, Footer} from '../../../components/index';
import images from '../../../assets/images';
import './NotFound.css';
import getClientType from "../../../hooks/getClientType";
import LoadingPage from '../../LoadingPage';

import { useNavigate } from 'react-router-dom';

const NotFound = () => {

  const [userType, setUserType] = useState(false)
  const [didMount, setDidMount] = useState(false)
  
  const getUserType = async () => {
    let response = await getClientType()   
    if(response) {
      let type = response[0]
      setUserType(type)
    }
  }
  
  useEffect(() => {
    getUserType()
    setDidMount(true)
  },[])

  function redirectToSupplier() {
    window.location.href = '/supplier';
  }

  function redirectToConsumer() {
    window.location.href = '/';
  }

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
      {userType == 'supplier' ? 
        <>
        <NavbarSupplier></NavbarSupplier>
        <div className='app__notfound main__container flex'>
          <div className='app__notfound_content'>
            <img className='app__notfound_img' src={images.notfound}></img>
            <div className='app__notfound_bottom'>
              <p>Oops! Parece que a página que procuras não existe...</p>
              <button className='main__action_btn' onClick={redirectToSupplier}>Home</button>
            </div>
          </div>
        </div>
        </>
      :
        <>
        <Navbar></Navbar>
        <div className='app__notfound main__container flex'>
          <div className='app__notfound_content'>
            <img className='app__notfound_img' src={images.notfound}></img>
            <div className='app__notfound_bottom'>
              <p>Oops! Parece que a página que procuras não existe...</p>
              <button className='main__action_btn' onClick={redirectToConsumer}>Home</button>
            </div>
          </div>
        </div>
        </>
      } 
      <Footer></Footer>
      </>
      )
    }
    </>
  );
}

export default NotFound