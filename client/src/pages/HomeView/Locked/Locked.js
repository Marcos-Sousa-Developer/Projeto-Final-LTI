import React, {useState, useEffect} from 'react';

import {Footer} from '../../../components/index';
import './NotFound.css';
import LoadingPage from '../../LoadingPage';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logOut from '../../../hooks/logOut';

const Locked = () => {

  const [didMount, setDidMount] = useState(false)
  const navigate = useNavigate()
  
  const getUserType = async () => {
      let isLocked = await axios.get('/checkUserDeactivated', null, {withCredentials:true}) 
      if(!isLocked.data) {
        navigate("/signin")
      } 
    }
  
  useEffect(() => {
    getUserType()
    setDidMount(true)
  },[])

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
        <div className='app__notfound main__container flex'>
          <div className='app__notfound_content'>
            <img className='app__notfound_img' src="https://images.theconversation.com/files/83455/original/image-20150531-15214-5avvg8.png?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip"></img>
            <div className='app__notfound_bottom'>
              <p>Foste bloqueado pelo adminstrador</p>
            </div>
            <p>Para suporte envie um email para: grupo01.pti.ptr@outlook.com</p>
            <button className='main__action_btn' onClick={() => logOut()}>Logout</button>
          </div>
          
        </div>
      <Footer></Footer>
      </>
      )
    }
    </>
  );
}

export default Locked