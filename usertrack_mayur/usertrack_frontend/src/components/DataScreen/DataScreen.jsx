import React, { useState } from "react";
import "./DataScreen.css";
import { useNavigate } from "react-router-dom";
import AuthStore from "../../store/AuthStore";

const DataScreen = () => {
  const navigate = useNavigate();

  const employee = AuthStore((state) => state.screenData);
  const setScreenData=AuthStore((state)=>state.setScreenData);

  if (!employee) return null;


  const handleDelete = async () => {

    try {

      const response = await fetch(`http://localhost:3000/dash/screen/delete/${employee.emp_id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Employee deleted successfully");
        navigate("/dash"); 
      } else {
        alert(data.message || "Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Something went wrong while deleting");
    }
  };

  return (
    <div className="datascreen-overlay">
      <div className="datascreen-box">
        <div className="datascreen-header">
          <h2>UserTrack</h2>
          <button className="datascreen-close" onClick={() => {
                setScreenData(null);
                navigate('/dash');
          }}>
            ✕
          </button>
        </div>

        <div className="datascreen-content">
          <div className="employee-photo">
            <img src={employee.photo} alt={employee.full_name} />
          </div>
          <div className="employee-details">
            <p><strong>Full Name:</strong> {employee.full_name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Employee ID:</strong> {employee.emp_id}</p>
            <p><strong>Joining Date:</strong> {employee.join_date}</p>
            <p><strong>Designation:</strong> {employee.designation}</p>
            <p><strong>Mobile Number:</strong> {employee.mobile}</p>
            <p><strong>Specifications:</strong> {employee.specifications}</p>

            <button
              className="datascreen-delete"
              onClick={handleDelete}
            >
                Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataScreen;