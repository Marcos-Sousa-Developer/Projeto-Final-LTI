import React from 'react';

import {Navbar, Footer} from '../../../components/index';
import images from '../../../assets/images';
import './NotFound.css';

const NotFound = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className='app__notfound main__container flex'>
        <div className='app__notfound_content'>
          <img className='app__notfound_img' src={images.notfound}></img>
          <div className='app__notfound_bottom'>
            <p>Oops! Parece que a página que procuras não existe...</p>
            <button className='main__action_btn'>Home</button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>

  )
}

export default NotFound