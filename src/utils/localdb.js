// src/utils/localdb.js

const KEY = "users";

// Safe read
const safeGetItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.log("localStorage read blocked");
    return null;
  }
};

// Safe write
const safeSetItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.log("localStorage write blocked");
  }
};

// get all users
export const getUsers = () => {
  const data = safeGetItem(KEY);
  return data ? JSON.parse(data) : [];
};

// save all users
export const saveUsers = (users) => {
  safeSetItem(KEY, JSON.stringify(users));
};

// add new user
export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
  return users;
};

// delete user
export const deleteUser = (accountNumber) => {
  const users = getUsers().filter(
    (u) => u.accountNumber !== accountNumber
  );
  saveUsers(users);
  return users;
};
