import React from 'react'
import images from '../../../assets/images.js';
import NavBar from './NavBar'
import { Link } from "react-router-dom";

function Header() {  

    const toggleAside = () => {

        let bodyClassName = document.body.className 
        
        if(bodyClassName == "") {
            document.body.classList.add("toggle-sidebar")
        }
        else {
            document.body.classList.remove("toggle-sidebar")

        } 
    }

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
        
        {/* Logo */}
        <div className="d-flex align-items-center justify-content-between">
            <div className="logo d-flex align-items-center">
                <span className="d-none d-lg-block"><img src={require("../assets/images/admin_logo.png")} alt="" /></span>
                <Link  to="/admin" >  
                    <span><img src={images.logo} alt="app_logo"/></span>
                </Link>
                <button style={{margin:0}} onClick={() => toggleAside()}><i className="bi bi-list toggle-sidebar-btn" /></button>
            </div>            
        </div>{/* End Logo */}

        {/* Search Bar */}
        <div className="search-bar mx-auto" >
            <form className="search-form d-flex align-items-center" action="#">
                <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                <button type="submit" title="Search"><i className="bi bi-search" /></button>
            </form>
        </div>
        {/* End Search Bar */} 
        <NavBar></NavBar>
    </header>
  )
}

export default Header
