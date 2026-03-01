import React, { useState } from "react";
import "./form.css";

function Deposit({ goToPage, users, updateBalance }) {
  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const user = users.find(
    (u) => u.accountNumber === Number(accountNumber)
  );

  const handleDeposit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!accountNumber || !pin || !amount) {
      setError("All fields are required");
      return;
    }

    if (!user) {
      setError("Account not found");
      return;
    }

    // 🔹 PIN must be 4 digits
    if (!/^\d{4}$/.test(pin)) {
      setError("Invalid PIN format");
      return;
    }

    if (user.pin !== pin) {
      setError("Incorrect PIN");
      return;
    }

    const depositAmount = Number(amount);

    if (depositAmount <= 0) {
      setError("Enter a valid amount");
      return;
    }

    // 🔹 Update balance using account number
    updateBalance(user.accountNumber, depositAmount, "deposit");

    setMessage(`₹${depositAmount} deposited successfully`);
    setAmount("");
    setPin("");
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

      <div className="form-card fade-in">
        <h2>Deposit</h2>

        {error && <p className="error-text">{error}</p>}
        {message && <p className="success-text">{message}</p>}

        <form onSubmit={handleDeposit}>
          <input
            type="number"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter 4-digit PIN"
            value={pin}
            maxLength={4}
            onChange={(e) => setPin(e.target.value)}
          />

          {user && (
            <p style={{ fontWeight: "bold" }}>
              Current Balance: ₹{user.balance}
            </p>
          )}

          <input
            type="number"
            placeholder="Deposit Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button type="submit">Deposit</button>
        </form>
      </div>
    </div>
  );
}

export default Deposit;
