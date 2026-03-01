import React, { useState, useEffect } from "react";
import { FaCopy } from "react-icons/fa";
import "./Alldata.css";
import { getUsers, deleteUser } from "../utils/localdb";

function AllData({ goToPage }) {
  const [users, setUsers] = useState([]);

  // Load users from localStorage on component mount
  useEffect(() => {
    setUsers(getUsers());
  }, []);

  // Logout/delete user
  const logoutUser = (accountNumber) => {
    if (window.confirm("Are you sure you want to logout this user?")) {
      const updatedUsers = deleteUser(accountNumber); // delete from localStorage
      setUsers(updatedUsers); // update UI
      alert("User logged out successfully!");
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <span className="navbar-logo">Eazy Bank</span>
        <div className="nav-links">
          <span onClick={() => goToPage("home")}>Home</span>
          <span onClick={() => goToPage("create")}>Create</span>
          <span onClick={() => goToPage("deposit")}>Deposit</span>
          <span onClick={() => goToPage("withdraw")}>Withdraw</span>
          <span onClick={() => goToPage("alldata")}>All Data</span>
        </div>
      </nav>

      <div className="data-card fade-in">
        <h2>All Users</h2>

        {users.length === 0 ? (
          <p className="no-data">No users found</p>
        ) : (
          <div className="user-card-container">
            {users.map((user) => (
              <div className="user-card" key={user.accountNumber}>
                <h3>{user.name}</h3>
                <p><strong>Account Type:</strong> {user.accType}</p>
                <p>
                  <strong>Account No:</strong> {user.accountNumber}
                  <FaCopy
                    style={{ cursor: "pointer", marginLeft: "8px" }}
                    onClick={() => navigator.clipboard.writeText(user.accountNumber)}
                  />
                </p>
                <p>
                  <strong>ATM No:</strong> **** **** **** {String(user.atmNumber).slice(-4)}
                </p>
                <p><strong>PIN:</strong> {user.pin}</p>
                <p className="balance">Balance: ₹{user.balance}</p>

                <button
                  className="logout-btn"
                  onClick={() => logoutUser(user.accountNumber)}
                >
                  Logout
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllData;