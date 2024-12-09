import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ReadUsers from "./UserManagement/ReadUsers";
import ReadRole from "./RoleManagement/ReadRole";


function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/readusers/:id" element={<ReadUsers />} />
        <Route path="/readrole/:id" element={<ReadRole />} />
      </Routes>
    </Router>
  );
}

export default App;
