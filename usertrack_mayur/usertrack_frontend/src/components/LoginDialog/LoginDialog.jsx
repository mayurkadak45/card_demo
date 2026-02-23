import React from "react";
import "./LoginDialog.css";
import { useNavigate } from "react-router-dom";

const LoginDialog = () => {

  const navigate=useNavigate();
  

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <button className="dialog-close" onClick={()=>{
            navigate('/');
        }}>✕</button>
        <h2>Login as</h2>
        <button className="dialog-button" onClick={()=>{
            navigate('/login-as-admin');
        }}>Admin</button>
        <button className="dialog-button" onClick={()=>{
            navigate('/login-as-user');
        }}>User</button>
      </div>
    </div>
  );
};

export default LoginDialog;