import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const Navigate = useNavigate()
  const handlelogout = () => {
    localStorage.removeItem('token')
    Navigate('/login')
  }
  const HandleAbout=()=>{
    if (!localStorage.getItem('token')) {
      Navigate('/login');
    }

   
  }
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-1" >
      <div className="container-fluid">
        <Link className="navbar-brand navber-brand-danger" to="#">
          { props.brandName || "INOTEBOOK" }
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className={ `nav-item ${location.pathname === "/home" ? "active" : ""}` }>
              <Link className="nav-link" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className={ `nav-item ${location.pathname === "/about" ? "active" : ""}` }>
              <Link className="nav-link" to="/about" onClick={HandleAbout} >
                About
              </Link>
            </li>
            { !localStorage.getItem('token') ? <form className='d-flex'>
              {/* <ul> */ }
              {/* <li className={`nav-item ${location.pathname === "/login" ? "active" : ""}`}> */ }
              <Link className="nav-link nav-link-primary " aria-current="page" to="/login">
                LOGIN
              </Link>
              {/* </li> */ }
              {/* <li className={`nav-item ${location.pathname === "/singup" ? "active" : ""}`}> */ }
              <Link className="nav-link nav-link-primary" aria-current="page" to="/signup">
                SIGNUP
              </Link>
              {/* </li> */ }
              {/* </ul> */ }
            </form> : <button className=' btn btn-primary' type="button" onClick={ handlelogout }> logout</button> }


            {/* Add more nav items as needed */ }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


