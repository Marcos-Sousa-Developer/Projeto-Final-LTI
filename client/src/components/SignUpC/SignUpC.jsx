import React, { useState, useEffect, useRef } from 'react';
import { FiMail, FiLock, FiArrowLeft, FiUser, FiHome, FiX } from 'react-icons/fi';
import { BsTwitter, BsFacebook, BsGoogle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import getClientType from '../../hooks/getClientType';
import { authentication as auth}  from '../../authentication'
import images from '../../assets/images';
import SnackBar from '../SnackBarNotification/SnackBar';
import './SignUp.css';

const SnackbarType = {
    success: "success",
    fail: "fail",
};

const SignUpC = () => {
    const snackbarRef = useRef(null);

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

        try {
            event.preventDefault();
            let isActive = await auth.signUp(email,password,selectedOption,name)
            if(isActive) {
                setError(false)
                setTimeout(() => {
                    navigate('/signin');
                }, 1000);
            }
            else{
                setError(true)
            }
        }
        catch {
            setError(true)
        }
        setLoading(false)
        snackbarRef.current.show()

    };

    const getUserType = async () => {
        let response = await getClientType()
        if(response) {
            navigate('/');
        }
    }

    //Password Checker

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

    useEffect(() => {
        getUserType()
    },[])

    return (
    <>
        <img className='app__SignUp_rectangle1' src={images.Rectangle1} alt="" />
        <div className='app__SignUp main__container'>
            <div style={{width: '100%'}}>
                <Link to='/signin'><FiArrowLeft></FiArrowLeft></Link><Link style={{marginLeft:'1rem'}} to='/'><FiHome></FiHome></Link>
                <h3 className=''>Criar Conta</h3>
                <div className={`app__SignUp_content ${showExtraInputs ? 'app__SignUp_content_shadow' : ''}`}>
                    <div style={{ display: showExtraInputs ? "none" : "block" }}>
                        <p style={{textAlign:'center'}}>Que utilizador vais ser?</p>
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
                    <div style={{ opacity: showExtraInputs ? 1 : 0 }}>
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
                                                onChange={handlePasswordChange}
                                            />
                                        </div>
                                        {/*<p className='termsOfService'>Ao registar-se concorda com os termos e condições</p>*/}
                                    </div>
                                    { password && (
                                        <ul className='app__ConsumerProfile_password-checks'>
                                            <li>
                                            {isEightCharLong ? 
                                                ''
                                                : 
                                                <>
                                                    <div>Mínimo de 8 caracteres de comprimento: <span><FiX fontSize={20}></FiX></span></div>
                                                </>
                                            }
                                            </li>
                                            <li>
                                            {hasNumber ? 
                                                ''
                                                : 
                                                <>
                                                    <div>Contém pelo menos 1 número: <span><FiX fontSize={20}></FiX></span></div>
                                                </>
                                            }
                                            </li>
                                            <li>
                                            {hasLowerCase ? 
                                                ''
                                                : 
                                                <>
                                                    <div>Contém pelo menos 1 letra minúscula: <span><FiX fontSize={20}></FiX></span></div>
                                                </>
                                            }
                                            </li>
                                            <li>
                                            {hasUpperCase ? 
                                                ''
                                            : 
                                                <>
                                                    <div>Contém pelo menos 1 letra maiúscula: <span><FiX fontSize={20}></FiX></span></div>
                                                </>
                                            }
                                            </li>
                                            <li>
                                            {hasSpecialChar ? 
                                                ''
                                            : 
                                                <>
                                                    <div>Contém pelo menos 1 caractere especial: <span><FiX fontSize={20}></FiX></span></div>
                                                </>
                                            }
                                            </li>
                                        </ul>
                                    )}
                                    {
                                        error && ( <small style={{color:"red"}}>Falha ao registar, tente novo! </small> 
                                        
                                        )
                                    }
                                    {
                                        loading ? 
                                        (
                                            <div className='app__SignUp_box13'>
                                                <button className='main__action_btn'>Loading</button>
                                            </div>       
                                        )
                                        :
                                        (!hasSpecialChar || !hasUpperCase || !hasLowerCase || !hasNumber || !isEightCharLong) ?
                                        (
                                            <div className='app__SignUp_box13'>
                                                <button className='main__action_btn' type='submit'  style={{opacity: "0.4"}} disabled>Registar</button>
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
                            <Link to="/signin" className='app__SignUp_content_signIn' style={{fontSize: '14px'}}>Iniciar sessão</Link>
                        </div>
                        <SnackBar
                            ref={snackbarRef}
                            message={error ? 'Algo correu mal!' : 'Conta criada com sucesso!'}
                            type={error ? SnackbarType.fail : SnackbarType.success}
                        />
                    </div> 
                </div>
            </div>
        </div>
    </>
    )
}
  
export default SignUpC


