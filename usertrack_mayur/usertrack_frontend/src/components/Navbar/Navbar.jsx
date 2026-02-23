import React from 'react'
import './Navbar.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Welcome from '../Welcome/Welcome';
import AuthStore from '../../store/AuthStore';


function Navbar() {

  const location=useLocation();
  const navigate=useNavigate();

  const {logout}=AuthStore((state)=>state);



  return (
     <nav className="navbar">
      <div className="navbar-logo">EmpTrack</div>

      {location.pathname === "/" && (
        <button className="navbar-login" onClick={()=>{
            navigate('/login-dialog');
        }}>Login</button>
      )}

      {location.pathname.startsWith("/dash") && <Welcome/>}

      {location.pathname.startsWith("/dash") && (
        <button className="navbar-logout" onClick={()=>{
            logout();
            navigate('/');
        }}>Logout</button>
      )}
      
    </nav>
  )
}

export default Navbar