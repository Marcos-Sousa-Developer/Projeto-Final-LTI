import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { FiUser} from 'react-icons/fi';
import { useCookies } from 'react-cookie';

import getClientType from "../../hooks/getClientType";
import getAllFromDB from '../../hooks/getAllFromDB';

import SnackBar from '../SnackBarNotification/SnackBar';

import images from '../../assets/images.js';
import './styles/Navbar.css';

const SnackbarType = {
    success: "success",
    fail: "fail",
};

const NavbarSupplier = () => {
    const [cookies] = useCookies();

    const [supplierAddressProdUnit, setSupplierAddressProdUnit] = useState(false)
    const snackbarRef = useRef(null);

    async function getSupplierAddressAndProdUnit(){
        let supplier = await getAllFromDB('/suppliers', {uid:true})
        let productionUnits = await getAllFromDB('/productionUnits', {uid_supplier:supplier[0].uid})

        if(supplier[0].postal_code != null && productionUnits != "There is no production unit in the database"){
            setSupplierAddressProdUnit(true)
        }
    }

    useEffect(() => {
        getSupplierAddressAndProdUnit()
    },[])

    function handleAnunciar(){
        snackbarRef.current.show();
    }

    return (
    <>
        <div className='app__navbarSupplier main__container'>
            <Link to='/supplier'><img src={images.logo} alt="" className="app__logo"/></Link>

            <div className='app__navbarSupplier_profile'>

                {
                    [undefined,null].includes(cookies.identification) ? (
                        <Link to="/signin" className="flex app__pointer app__navbar_links">
                            <FiUser fontSize={28} color="black" className='profile_icon'></FiUser>
        
                            <div className="app__navbarSupplier_profile_account" style={{margin: '0 .75rem'}}>
                                <span className="profile_link">Conta</span>
                                <p style={{fontSize: '12px', opacity: '80%'}}>Iniciar sessão</p>
                            </div>
                        </Link>
                    ) 
                    :
                    (
                        <Link to="/supplier/profile" className="flex app__pointer app__navbar_links">
                            <FiUser fontSize={28} color="black" className='profile_icon'></FiUser>
        
                            <div className="app__navbarSupplier_profile_account" style={{margin: '0 .75rem'}}>
                                <span className="profile_link">Conta</span>
                                <p style={{fontSize: '12px', opacity: '80%'}}>Olá {cookies.identification}</p>
                            </div>
                        </Link>
                    )
                }
                {supplierAddressProdUnit ? 
                    <Link to="/supplier/anunciar" className="flex app__pointer app__navbar_links app__navbarSupplier_btn"  style={{marginRight:'0'}}>
                        Anunciar
                    </Link>
                :
                    <>
                        <button onClick={handleAnunciar} className="flex app__pointer app__navbar_links app__navbarSupplier_btn" style={{ marginRight: '0' }}>Anunciar</button>
                        <SnackBar
                        ref={snackbarRef}
                        message="Deve definir a morada e/ou criar uma unidade de produção primeiro!"
                        type={SnackbarType.fail} />
                    </>
                }

            </div>
        </div>
    </>
    )
}

export default NavbarSupplier