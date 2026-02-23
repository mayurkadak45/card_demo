import React, { useState } from "react";
import "./LoginBox.css";
import AuthStore from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";



const AdminLogin = () => {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = AuthStore((state) => state.login);
  const navigate=useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          emp_id: empId,
          password: password,
          type: "admin"   
        })
      });

      const data = await response.json();

      if (data.status) {
        login(data.data);
        setMessage("Login Successful");
        setEmpId("");
        setPassword("");
        navigate("/dash");
      } else {
        setMessage("Invalid Credentials");
        setEmpId("");
        setPassword("");
      }

    } catch (error) {
      console.error(error);
      setMessage("Server Error");
    }
  };

  return (
    <div className="login-box">
      <h2>Admin Login</h2>

      <input
        type="text"
        placeholder="Username"
        className="login-input"
        value={empId}
        onChange={(e) => setEmpId(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-submit" onClick={handleLogin}>
        Login
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminLogin;