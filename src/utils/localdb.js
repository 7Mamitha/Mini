// src/utils/localdb.js

const KEY = "users";

// get all users
export const getUsers = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

// save all users
export const saveUsers = (users) => {
  localStorage.setItem(KEY, JSON.stringify(users));
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
