import React, { useState, useEffect } from "react";
import "./form.css";
import ChatBox from "./chatbox.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Create({ goToPage, addUser, users }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accType, setAccType] = useState("Saving");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [error, setError] = useState("");
  const [createdUser, setCreatedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Generate unique numbers
  const generateAccountNumber = () =>
    Math.floor(1000000000 + Math.random() * 9000000000);
  const generateATMNumber = () =>
    Math.floor(1000000000000000 + Math.random() * 9000000000000000);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // ✅ Required fields
    if (!name || !email || !dob || !gender || !pin || !confirmPin) {
      setError("All fields are required");
      return;
    }

    // ✅ Prevent duplicate name or email
    if (users.some((u) => u.email === email || u.name === name)) {
      setError("User with this name or email already exists");
      return;
    }

    // ✅ Age check
    if (calculateAge(dob) < 18) {
      setError("You must be at least 18 years old");
      return;
    }

    // ✅ PIN validation
    if (!/^\d{4}$/.test(pin) || !/^\d{4}$/.test(confirmPin)) {
      setError("PIN must be exactly 4 digits");
      return;
    }

    if (pin !== confirmPin) {
      setError("PIN and Confirm PIN do not match");
      return;
    }

    // ✅ Confirmation checkbox
    if (!confirmChecked) {
      setError("Please confirm the details");
      return;
    }

    // ✅ Generate unique account and ATM numbers
    let accountNumber, atmNumber;

    do {
      accountNumber = generateAccountNumber();
    } while (users.some((u) => u.accountNumber === accountNumber));

    do {
      atmNumber = generateATMNumber();
    } while (users.some((u) => u.atmNumber === atmNumber));

    // ✅ New user object
    const newUser = {
      name,
      email,
      accType,
      accountNumber,
      atmNumber,
      pin,
      balance: 0,
      transactions: [],
    };

    addUser(newUser); // Add user to parent state
    setCreatedUser(newUser);
    setShowModal(true);

    // ✅ Reset form
    setName("");
    setEmail("");
    setAccType("Saving");
    setDob("");
    setGender("");
    setPin("");
    setConfirmPin("");
    setConfirmChecked(false);
  };

  return (
    <>
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

        <div className="form-card fade-in">
          <h2>Create Bank Account</h2>
          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />

            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <select value={accType} onChange={(e) => setAccType(e.target.value)}>
              <option value="Saving">Saving Account</option>
              <option value="Current">Current Account</option>
            </select>

            <div className="pin-wrapper">
              <input
                type={showPin ? "text" : "password"}
                placeholder="4-digit PIN"
                value={pin}
                maxLength={4}
                onChange={(e) => setPin(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowPin(!showPin)}>
                {showPin ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="pin-wrapper">
              <input
                type={showConfirmPin ? "text" : "password"}
                placeholder="Confirm PIN"
                value={confirmPin}
                maxLength={4}
                onChange={(e) => setConfirmPin(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => setShowConfirmPin(!showConfirmPin)}
              >
                {showConfirmPin ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <label className="confirm-check">
              <input
                type="checkbox"
                checked={confirmChecked}
                onChange={(e) => setConfirmChecked(e.target.checked)}
              />
              I confirm the above details are correct
            </label>

            <button type="submit" disabled={!confirmChecked}>
              Create Account
            </button>

            <button
              type="button"
              className="create-login-btn"
              onClick={() => goToPage("login")}
            >
              Login
            </button>
          </form>
        </div>

        {showModal && createdUser && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Account Created Successfully</h3>
              <p><b>Name:</b> {createdUser.name}</p>
              <p><b>Account No:</b> {createdUser.accountNumber}</p>
              <p><b>ATM Card No:</b> {createdUser.atmNumber}</p>
              <p><b>Balance:</b> ₹0</p>
              <button
                onClick={() => {
                  setShowModal(false);
                  goToPage("alldata");
                }}
              >
                Go to All Data
              </button>
            </div>
          </div>
        )}
      </div>

      <ChatBox />
    </>
  );
}

export default Create;