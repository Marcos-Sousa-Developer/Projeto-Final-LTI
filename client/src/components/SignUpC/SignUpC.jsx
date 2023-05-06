import React, { useState,useEffect } from 'react';
import { FiMail, FiLock, FiArrowLeft, FiUser, FiHome } from 'react-icons/fi';
import { BsTwitter, BsFacebook, BsGoogle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import getClientType from '../../hooks/getClientType';
import { authentication as auth}  from '../../authentication'
import images from '../../assets/images';
import './SignUp.css';

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

    const getUserType = async () => {
        let response = await getClientType()
        if(response) {
            navigate('/');
        }
    }

    useEffect(() => {
        getUserType()
    },[])

    return (
    <>
        <img className='app__SignUp_rectangle1' src={images.Rectangle1} alt="" />
        <div className='app__SignUp main__container'>
            <Link to='/signin'><FiArrowLeft></FiArrowLeft></Link><Link style={{marginLeft:'1rem'}} to='/'><FiHome></FiHome></Link>
            <h3 className=''>Criar Conta</h3>
                <div className={`app__SignUp_content ${showExtraInputs ? 'app__SignUp_content_shadow' : ''}`}>
                    <div>
                        {!showExtraInputs && (
                            <p style={{textAlign:'center'}}>Que utilizador vais ser?</p>
                        )}
                    </div>
                    <div className='app__SignUp_userType'>
                        <input 
                            type="radio" 
                            id="Consumer_optionId"                                             
                            checked={selectedOption === "consumer"}
                            onChange={() => handleOptionChange("consumer")}
                        ></input>
                        <input 
                            type="radio" 
                            id="Supplier_optionId"                                             
                            checked={selectedOption === "supplier"}
                            onChange={() => handleOptionChange("supplier")}
                        ></input>
                        <label for="Consumer_optionId" class="SignUp_option Consumer_option">
                            <div class="dot"></div>
                            <span>Consumidor</span>
                        </label>
                        <label for="Supplier_optionId" class="SignUp_option Supplier_option">
                            <div class="dot"></div>
                            <span>Fornecedor</span>
                        </label>
                    </div>
                    {showExtraInputs && (
                    <>
                    <div className='app__SignUp_box'>
                        <div className='app__SignUp_box1'>
                            <form>
                                <div>
                                    <p>Nome</p>
                                    <div className='app__SignUp_box11'>
                                        <FiUser fontSize={22} color='black' aria-hidden="true"></FiUser>
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
                                        <FiMail fontSize={22} color='black' aria-hidden="true"/>
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
                                        <FiLock fontSize={22} color='black' aria-hidden="true"/>
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
                            </form>
                        </div>
                        <div className='app__SignUp_box2'>
                            <p style={{margin: '0'}}>ou</p>    
                        </div>
                        <div className='app__SignUp_box3'>
                            <button className='app__SignUp_box30 ButtonGoogle'><BsGoogle className='singUpOptions' color='white' style={{backgroundColor:'transparent', color: 'white'}}></BsGoogle><p>Google</p></button>
                            <button className='app__SignUp_box30 ButtonFacebook'><BsFacebook className='singUpOptions' style={{backgroundColor:'transparent', color: 'white'}}></BsFacebook><p>Facebook</p></button>
                            <button className='app__SignUp_box30 ButtonTwitter'><BsTwitter className='singUpOptions' style={{backgroundColor:'transparent', color: 'white'}}></BsTwitter><p>Twitter</p></button>
                        </div>      
                    </div>   
                    <div>
                        <Link to="/signin" className='app__SignUp_content_signIn'>Iniciar sessão</Link>
                    </div>
                    </> 
                    )}
                </div>
        </div>
    </>
    )
}
  
export default SignUpC


