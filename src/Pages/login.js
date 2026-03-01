import React, { useEffect, useState } from "react";
import "./form.css";

function Login({ goToPage, users, loginUser, logoutUser }) {
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // 🔹 Check if any user is already logged in on mount
  useEffect(() => {
    const activeUser = users.find((u) => u.isLoggedIn);
    if (activeUser) {
      setLoggedInUser(activeUser);
      setSuccessMsg("Logged in successfully ✅");
    }
  }, [users]);

  // 🔹 Auto-fill account number & pin when typing name (case-sensitive)
  const handleNameChange = (e) => {
    setName(e.target.value);
    setError("");
    setSuccessMsg("");
    setShowReceipt(false);

    const foundUser = users.find((u) => u.name === e.target.value);
    if (foundUser) {
      setAccountNumber(foundUser.accountNumber);
      setPin(foundUser.pin);
    } else {
      setAccountNumber("");
      setPin("");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setShowReceipt(false);

    if (!name) {
      setError("Please enter your full name");
      return;
    }

    const foundUser = users.find(
      (u) =>
        u.name === name &&
        u.accountNumber === Number(accountNumber) &&
        u.pin === pin
    );

    if (foundUser) {
      setLoggedInUser(foundUser);
      loginUser(foundUser.accountNumber, pin);
      setSuccessMsg("Logged in successfully ✅");
    } else {
      setError("Invalid Name / Account Number / PIN");
    }
  };

  const handleLogout = () => {
    if (loggedInUser) {
      logoutUser(loggedInUser.accountNumber);
      setLoggedInUser(null);
      setName("");
      setAccountNumber("");
      setPin("");
      setSuccessMsg("");
      setShowReceipt(false);
    }
  };

  const handleViewReceipt = () => setShowReceipt(true);
  const handleBack = () => setShowReceipt(false);

  const handlePrint = () => {
    const printContent = document.getElementById("receipt").innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
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

      {/* LOGIN FORM */}
      {!loggedInUser && (
        <div className="form-card fade-in">
          <h2>Login</h2>
          {error && <p className="error-text">{error}</p>}
          {successMsg && (
            <p style={{ color: "green", textAlign: "center" }}>{successMsg}</p>
          )}
          <form onSubmit={handleLogin}>
            <input
              placeholder="Full Name"
              value={name}
              onChange={handleNameChange}
            />
            <input placeholder="Account Number" value={accountNumber} readOnly />
            <input placeholder="PIN" value={pin} readOnly />
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {/* LOGGED-IN VIEW */}
      {loggedInUser && !showReceipt && (
        <div className="form-card fade-in">
          <h2>Welcome, {loggedInUser.name}</h2>
          <p>
            <strong>Account No:</strong> {loggedInUser.accountNumber}
          </p>
          <p>
            <strong>Balance:</strong> ₹{loggedInUser.balance}
          </p>
          <button className="create-login-btn" onClick={handleViewReceipt}>
            View Transaction History
          </button>
          <button className="button-action" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      {/* TRANSACTION RECEIPT */}
      {loggedInUser && showReceipt && (
        <div
          className="form-card fade-in"
          id="receipt"
          style={{ maxWidth: "500px" }}
        >
          <h2 style={{ textAlign: "center" }}>Bank Receipt</h2>
          <p>
            <strong>Name:</strong> {loggedInUser.name}
          </p>
          <p>
            <strong>Account Number:</strong> {loggedInUser.accountNumber}
          </p>
          <p>
            <strong>Balance:</strong> ₹{loggedInUser.balance}
          </p>
          <hr style={{ margin: "10px 0" }} />
          <h3 style={{ textAlign: "center" }}>Transactions</h3>
          {loggedInUser.transactions && loggedInUser.transactions.length > 0 ? (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "10px",
              }}
            >
              <thead>
                <tr>
                  <th style={{ borderBottom: "1px solid #333", padding: "6px" }}>
                    Type
                  </th>
                  <th style={{ borderBottom: "1px solid #333", padding: "6px" }}>
                    Amount (₹)
                  </th>
                  <th style={{ borderBottom: "1px solid #333", padding: "6px" }}>
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {loggedInUser.transactions.map((t, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: "6px", textAlign: "center" }}>{t.type}</td>
                    <td style={{ padding: "6px", textAlign: "center" }}>{t.amount}</td>
                    <td style={{ padding: "6px", textAlign: "center" }}>{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: "center", marginTop: "10px" }}>No transactions yet.</p>
          )}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "10px",
              flexDirection: "column",
            }}
          >
            <button className="button-action" onClick={handlePrint}>
              Print / Save Receipt
            </button>
            <button className="button-action" onClick={handleBack}>
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;