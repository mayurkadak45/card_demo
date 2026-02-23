import React from "react";
import "./Welcome.css";
import AuthStore from "../../store/AuthStore";

function Welcome() {


  let role="";
  let fname="";  
  const isLoggedIn=AuthStore((state)=>{
    return state.isLoggedIn;
  })
  if(isLoggedIn){
    const {full_name,type}=AuthStore((state)=>{
        return state.user;
    })
    role=type;
    fname=full_name;
  }

  return <div className="welcome">Welcome {role} : {fname}</div>;
};

export default Welcome;