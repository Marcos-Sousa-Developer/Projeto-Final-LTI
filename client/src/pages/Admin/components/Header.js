import React, {useEffect, useState} from 'react'
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
            <Link to="/admin" className="logo d-flex align-items-center">
                <img src={require("../assets/images/admin_logo.png")} alt="" />
                <span className="d-none d-lg-block">GreaterGoods</span>
            </Link>
            <button onClick={() => toggleAside()}><i className="bi bi-list toggle-sidebar-btn" /></button>
        </div>{/* End Logo */}

        {/* Search Bar */}
        <div className="search-bar">
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
