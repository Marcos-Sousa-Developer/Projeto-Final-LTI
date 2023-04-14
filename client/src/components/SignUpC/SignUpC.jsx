import React, { useState } from 'react';
import { FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { authentication as auth}  from '../../authentication'


import './SignUp.css';
import images from '../../assets/images';

const SignUpC = () => {

    const [name, setName] = useState(null) 
    const [email, setEmail] = useState(null) 
    const [password, setPassword] = useState(null) 
    const [showExtraInputs, setShowExtraInputs] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [error, setError] = useState(false) 
    const [loading, setLoading] = useState(false) 

    const navigate = useNavigate()
  
    const handleOptionChange = (value) => {
      setSelectedOption(value);
      setShowExtraInputs(true);
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        let isActive = await auth.signUp(email,password,selectedOption,name)
        if(isActive) {
            setError(false)
            navigate('/signin')
            
        }
        else{
            setError(true)
        }
        setLoading(false)
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
                                        checked={selectedOption === "consumer"}
                                        onChange={() => handleOptionChange("consumer")}
                                    />
                                    Comprador
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        checked={selectedOption === "supplier"}
                                        onChange={() => handleOptionChange("supplier")}
                                    />
                                    Fornecedor
                                </label>
                            </div>
                            {showExtraInputs && (
                                <>
                                    <div>
                                        <p>Name</p>
                                        <div className='app__SignUp_box11'>
                                            <input
                                                type="text"
                                                required
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p>E-mail</p>
                                        <div className='app__SignUp_box11'>
                                            <FiMail fontSize={22} color='black'  aria-hidden="true"/>
                                            <input
                                                type="text"
                                                required
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p>Password</p>
                                        <div className='app__SignUp_box11'>
                                            <FiLock fontSize={22} color='black'  aria-hidden="true"/>
                                            <input
                                                type="password"
                                                required
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {
                                        error && ( <small style={{color:"red"}}>Falha ao registar, tente novo</small>)
                                    }
                                    {
                                        loading ? 
                                        (
                                            <div className='app__SignUp_box13'>
                                                <button className='main__action_btn'>Loading</button>
                                            </div>       
                                        )
                                        :
                                        (
                                            <div className='app__SignUp_box13'>
                                                <button className='main__action_btn' type='submit' onClick={handleSubmit}>Registar</button>
                                            </div>                                        
                                        )
                                    }

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


