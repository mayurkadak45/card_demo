import React from "react";
import "./UserCard.css";

const UserCard = ({ photo, fullName, empId, designation, onClick  }) => {
  return (
    <div className="user-card" onClick={() => onClick(empId)}>
      <h2 className="card-heading">UserTrack</h2>
      <img src={photo} alt={fullName} className="card-photo" />
      <p className="card-name">Full Name: {fullName}</p>
      <p className="card-empid">Employee ID: {empId}</p>
      <p className="card-designation">Designation: {designation}</p>
    </div>
  );
};

export default UserCard;