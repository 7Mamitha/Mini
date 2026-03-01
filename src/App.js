import React, { useEffect, useState } from "react";
import Home from "./Pages/Home";
import Create from "./Pages/Create";
import Deposit from "./Pages/Deposit";
import Withdraw from "./Pages/Withdraw";
import AllData from "./Pages/Alldata";
import Login from "./Pages/login";

import { getUsers, saveUsers } from "./utils/localdb";

function App() {
  const [page, setPage] = useState("home");
  const [users, setUsers] = useState([]);

  // 🔹 Load users from localStorage and normalize old users
  useEffect(() => {
    const storedUsers = getUsers() || [];
    const normalizedUsers = storedUsers.map(u => ({
      ...u,
      isLoggedIn: u.isLoggedIn ?? false,
      transactions: u.transactions ?? [],
      balance: u.balance ?? 0,
    }));
    setUsers(normalizedUsers);
    saveUsers(normalizedUsers);
  }, []);

  // 🔹 Add new user
  const addUser = (newUser) => {
    const userWithDefaults = {
      ...newUser,
      isLoggedIn: false,
      balance: 0,
      transactions: [],
    };
    const updatedUsers = [...users, userWithDefaults];
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
  };

  // 🔹 Login user
  const loginUser = (accountNumber, pin) => {
    const foundUser = users.find(u => u.accountNumber === accountNumber && u.pin === pin);
    if (!foundUser) return false;

    const updatedUsers = users.map(u =>
      u.accountNumber === accountNumber ? { ...u, isLoggedIn: true } : u
    );

    setUsers(updatedUsers);
    saveUsers(updatedUsers);
    return true;
  };

  // 🔹 Logout specific user
  const logoutUser = (accountNumber) => {
    const updatedUsers = users.map(u =>
      u.accountNumber === accountNumber ? { ...u, isLoggedIn: false } : u
    );
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
  };

  // 🔹 Update balance + add transaction
  const updateBalance = (accountNumber, amount, type) => {
    const updatedUsers = users.map(u => {
      if (u.accountNumber === accountNumber) {
        const newTransaction = {
          type: type.charAt(0).toUpperCase() + type.slice(1),
          amount,
          date: new Date().toLocaleString(),
        };
        return {
          ...u,
          balance: type === "deposit" ? u.balance + amount : u.balance - amount,
          transactions: [...(u.transactions || []), newTransaction],
        };
      }
      return u;
    });
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
  };

  const goToPage = (p) => setPage(p);

  // 🔹 Routing
  if (page === "home") return <Home goToPage={goToPage} />;
  if (page === "create") return <Create goToPage={goToPage} addUser={addUser} users={users} />;
  if (page === "login")
    return <Login goToPage={goToPage} users={users} loginUser={loginUser} logoutUser={logoutUser} />;
  if (page === "deposit") return <Deposit goToPage={goToPage} users={users} updateBalance={updateBalance} />;
  if (page === "withdraw") return <Withdraw goToPage={goToPage} users={users} updateBalance={updateBalance} />;
  if (page === "alldata") return <AllData goToPage={goToPage} users={users} logoutUser={logoutUser} />;

  return null;
}

export default App;