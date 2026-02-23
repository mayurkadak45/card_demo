import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import LoginDialog from "./components/LoginDialog/LoginDialog";
import AdminLogin from "./components/Login/AdminLogin";
import UserLogin from "./components/Login/UserLogin";
import UserCard from "./components/UserCard/UserCard";
import Dashboard from "./components/Dashboard/Dashboard";
import DataScreen from "./components/DataScreen/DataScreen";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login-dialog" element={<LoginDialog/>} />
      <Route path="/login-as-admin" element={<AdminLogin/>} />
      <Route path="/login-as-user" element={<UserLogin/>} />
      <Route path="/dash" element={<Dashboard/>}>
          <Route path="screen" element={<DataScreen/>}/>
      </Route>
      
      
    </Routes>
  );
}

export default AppRouter;