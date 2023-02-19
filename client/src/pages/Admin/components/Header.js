import React from 'react'
import NavBar from './NavBar'
import { Link } from "react-router-dom";

function Header() {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
        
        {/* Logo */}
        <div className="d-flex align-items-center justify-content-between">
            <Link to="/admin" className="logo d-flex align-items-center">
                <img src={require("../assets/images/admin_logo.png")} alt="" />
                <span className="d-none d-lg-block">GreaterGoods</span>
            </Link>
            <i className="bi bi-list toggle-sidebar-btn" />
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
