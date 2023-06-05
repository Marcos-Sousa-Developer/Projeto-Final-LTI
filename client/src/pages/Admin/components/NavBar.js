import React from 'react'
import { useCookies } from 'react-cookie';
import logOut from '../../../hooks/logOut';

function NavBar() {

    const [cookies] = useCookies();

  return (
    <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">


            <li className="nav-item dropdown pe-3">

                {/* Profile Image Icon */}
                <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown" id="dropdownMenuLink">
                    <span className="d-none d-md-block ps-2">{cookies.identification}</span>
                </a>
                <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown" id="dropdownMenuLink">
                <button onClick={async () => await logOut()}>Sign Out</button>
                </a>
                {/* End Profile Imge Icon */}
    
                </li>
        </ul>
    </nav>
          
  )
}

export default NavBar
