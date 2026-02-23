import React, { useEffect, useState } from "react";
import UserCard from "../UserCard/UserCard";
import "./Dashboard.css";
import { Outlet, useNavigate } from "react-router-dom";
import AuthStore from "../../store/AuthStore";

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  
  const isLoggedIn = AuthStore((state) => state.isLoggedIn);
  const setScreenData = AuthStore((state) => state.setScreenData);
  const role=AuthStore((state)=>state.role);


  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    
  }, [isLoggedIn, navigate]);

  
  useEffect(() => {
    if (!isLoggedIn) return;
    console.log("rerender");
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:3000/dash");

        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        const data = await response.json();

        if (data.success) {
          setUsers(data.data);
          setCount(users.length);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [isLoggedIn,navigate]);

  
  const handleCardClick = async (empId) => {
    if (role !== "admin") return;
    try {
      const response = await fetch(
        `http://localhost:3000/dash/screen/${empId}`
      );

      const data = await response.json();

      if (data.success) {
        setScreenData(data.data);
        navigate('/dash/screen');   
      }
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Top bar for count */}
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Total Employees: {users.length}</p>
      </div>

      {/* Employee cards */}
      <div className="dashboard-cards">
        {users.map((user, index) => (
          <UserCard
            key={index}
            photo={user.photo}
            fullName={user.full_name}
            empId={user.emp_id}
            designation={user.designation}
            onClick={() => handleCardClick(user.emp_id)}
          />
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export default Dashboard;