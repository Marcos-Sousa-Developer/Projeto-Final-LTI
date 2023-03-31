import React, { useState } from 'react';
import { FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './SignUp.css';
import images from '../../assets/images';

const SignUpC = () => {

    const [showExtraInputs, setShowExtraInputs] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
  
    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
      setShowExtraInputs(true);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted");
      console.log("Selected option:", selectedOption);
      // Perform form submission logic here
    };

    return (
    <>
        <img className='app__SignUp_rectangle1' src={images.Rectangle1} alt="" />
        <img className='app__SignUp_rectangle2' src={images.Rectangle2} alt="" />
        <div className='app__SignUp main__container'>
            <Link to='/'><FiArrowLeft></FiArrowLeft></Link>
            <h1 className=''>Sign Up</h1>
                <div className='app__SignUp_box'>
                    <div className='app__SignUp_box1'>
                        <form>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="Comprador"
                                        checked={selectedOption === "Comprador"}
                                        onChange={handleOptionChange}
                                    />
                                    Comprador
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="Fornecedor"
                                        checked={selectedOption === "Fornecedor"}
                                        onChange={handleOptionChange}
                                    />
                                    Fornecedor
                                </label>
                            </div>
                            {showExtraInputs && (
                                <>
                                    <div>
                                        <p>E-mail</p>
                                        <div className='app__SignUp_box11'>
                                            <FiMail fontSize={22} color='black'  aria-hidden="true"/>
                                            <input
                                                name=""
                                                id=""
                                                type="text"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p>Password</p>
                                        <div className='app__SignUp_box11'>
                                            <FiLock fontSize={22} color='black'  aria-hidden="true"/>
                                            <input
                                                name=""
                                                id=""
                                                type="password"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='app__SignUp_box13'>
                                        <button className='main__action_btn' type='submit' onClick={handleSubmit}>Registar</button>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                    <div className='app__SignUp_box2'>
                        <p style={{margin: '0'}}>or</p>    
                    </div>
                    <div className='app__SignUp_box3'>
                        <button className='app__SignUp_box30 ButtonGoogle'>Google</button>
                        <button className='app__SignUp_box30 ButtonFacebook'>Facebook</button>
                        <button className='app__SignUp_box30 ButtonTwitter'>Twitter</button>
                    </div>
                </div>    
        </div>
    </>
    )
}
  
export default SignUpC


