import React from "react";
import "./AdminDashboard.css";
import Sidebar from "./Sidebar";
import User from "./User";

function AdminDashboard() {
  return (
    <div className="adminDashboard">
      <Sidebar />
      <User />
    </div>
  );
}

export default AdminDashboard;
