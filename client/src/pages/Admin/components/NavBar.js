import React from 'react'

function NavBar() {
  return (
    <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">

            {/* Search Icon*/}
            <li className="nav-item d-block d-lg-none">
                <a className="nav-link nav-icon search-bar-toggle " href="#">
                    <i className="bi bi-search">sads</i>
                </a>
            </li>
            {/* End Search Icon*/}

            <li className="nav-item dropdown">

                {/* Notification Icon */}
                <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-bell" />
                    <span className="badge bg-primary badge-number">4</span>
                </a>
                {/* End Notification Icon */}

                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">

                    <li className="dropdown-header">You have 4 new notifications
                        <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                    </li>

                    <li>
                        <hr className="dropdown-divider" />
                    </li>

                    <li className="notification-item">
                        <i className="bi bi-exclamation-circle text-warning" />
                        <div>
                            <h4>Lorem Ipsum</h4>
                            <p>Quae dolorem earum veritatis oditseno</p>
                            <p>30 min. ago</p>
                        </div>
                    </li>

                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                
                    <li className="notification-item">
                        <i className="bi bi-x-circle text-danger" />
                        <div>
                            <h4>Atque rerum nesciunt</h4>
                            <p>Quae dolorem earum veritatis oditseno</p>
                            <p>1 hr. ago</p>
                        </div>
                    </li>

                    <li>
                        <hr className="dropdown-divider" />
                    </li>

                    <li className="notification-item">
                        <i className="bi bi-check-circle text-success" />
                        <div>
                            <h4>Sit rerum fuga</h4>
                            <p>Quae dolorem earum veritatis oditseno</p>
                            <p>2 hrs. ago</p>
                        </div>
                    </li>

                    <li>
                        <hr className="dropdown-divider" />
                    </li>

                    <li className="notification-item">
                        <i className="bi bi-info-circle text-primary" />
                        <div>
                            <h4>Dicta reprehenderit</h4>
                            <p>Quae dolorem earum veritatis oditseno</p>
                            <p>4 hrs. ago</p>
                        </div>
                    </li>

                    <li>
                        <hr className="dropdown-divider" />
                    </li>

                    <li className="dropdown-footer">
                        <a href="#">Show all notifications</a>
                    </li>
                </ul>
                {/* End Notification Dropdown Items */} 
            </li>{/* End Notification Nav */}

            <li className="nav-item dropdown">

                {/* Messages Icon */}
                    <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                        <i className="bi bi-chat-left-text" />
                    <span className="badge bg-success badge-number">3</span>
                </a>{/* End Messages Icon */}

                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                    <li className="dropdown-header">You have 3 new messages
                        <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                    </li>
                
                    <li>
                        <hr className="dropdown-divider" />
                    </li>

                    <li className="message-item">
                        <a href="#">
                            <img src={require("../assets/images/messages-1.jpg")} alt="" className="rounded-circle" />
                            <div>
                                <h4>Maria Hudson</h4>
                                <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                <p>4 hrs. ago</p>
                            </div>
                        </a>
                    </li>

                    <li>
                        <hr className="dropdown-divider" />
                    </li>

                    <li className="message-item">
                        <a href="#">
                            <img src={require("../assets/images/messages-2.jpg")} alt="" className="rounded-circle" />
                            <div>
                                <h4>Anna Nelson</h4>
                                <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                <p>6 hrs. ago</p>
                            </div>
                        </a>
                    </li>

                    <li>
                        <hr className="dropdown-divider" />
                    </li>

                    <li className="message-item">
                        <a href="#">
                        <img src={require("../assets/images/messages-3.jpg")} alt="" className="rounded-circle" />
                            <div>
                                <h4>David Muldon</h4>
                                <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                <p>8 hrs. ago</p>
                            </div>
                        </a>
                    </li>

                    <li>
                        <hr className="dropdown-divider" />
                    </li>

                    <li className="dropdown-footer">
                        <a href="#">Show all messages</a>
                    </li>
                </ul>
                {/* End Messages Dropdown Items */}
            </li>{/* End Messages Nav */} 

            <li className="nav-item dropdown pe-3">

                {/* Profile Image Icon */}
                <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                    <img src={require("../assets/images/admin_logo.png")} alt="Profile" className="rounded-circle" />
                    <span className="d-none d-md-block dropdown-toggle ps-2">Admin Anderson</span>
                </a>
                {/* End Profile Imge Icon */}
    
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    
                    <li className="dropdown-header">
                        <h6>Admin Anderson</h6>
                        <span>Engenheiro Informático</span>
                    </li>

                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    
                    <li>
                        <a className="dropdown-item d-flex align-items-center" href="#"> {/*users-profile.html*/}
                            <i className="bi bi-person" />
                            <span>My Profile</span>
                        </a>
                    </li>

                    <li>
                        <hr className="dropdown-divider" />
                    </li>
            
                    <li>
                        <a className="dropdown-item d-flex align-items-center" href="#"> {/*users-profile.html*/}
                            <i className="bi bi-gear" />
                            <span>Account Settings</span>
                        </a>
                    </li>
            
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
        
                    <li>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                            <i className="bi bi-box-arrow-right" />
                            <span>Sign Out</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
          
  )
}

export default NavBar
