import React, { useState } from "react";
import "./Admin.css";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";
import Sidebar from "./Sidebar";
import User from "./User";
import { useStateValue } from "../../DataLayer";
import { useHistory } from "react-router-dom";

function Admin() {
  const [{ user }] = useStateValue();
  const history = useHistory();
  // const [user, setUser] = useState(null);
  // const [error, setError] = useState(false);

  // const handleAdminLogin = (e, user) => {
  //   e.preventDefault();
  //   console.log(user);
  //   if (user.email === "admin@gmail.com" && user.password === "adminpassword") {
  //     setUser(user);
  //   } else {
  //     setError(true);
  //   }
  // };
  if (user.role != "Admin") {
    history.push("/");
  }
  return (
    <div className="admin">
      <Sidebar />
      <User />
      {/* {user ? (
        <AdminDashboard />
      ) : (
        <AdminLogin handleAdminLogin={handleAdminLogin} error={error} />
      )} */}
    </div>
  );
}

export default Admin;
