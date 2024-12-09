import React from "react";
import Button from "react-bootstrap/Button";
import { LuUsers } from "react-icons/lu";
import { BiShield } from "react-icons/bi";
import { useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import UserManagement from "./UserManagement/UserManagement";
import RoleManagement from "./RoleManagement/RoleManagement";
import "./Dashboard.css";
import { FaBell } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

function Dashboard() {
  const [isUserManagement, setisUserManagement] = useState(true);
  const RenderButton = ({ onClick, title, Icon, isActive }) => (
    <Button
      variant={isActive ? "dark" : "white"}
      onClick={onClick}
      className="border"
    >
      <Icon />
      {title}
    </Button>
  );
  return (
    <>
      <div className="dashboard">
        <nav className="navbar navbar-expand-lg shadow-sm p-3 mb-5  rounded">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Logo
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " aria-current="page" href="#">
                    Disabled
                  </a>
                </li>
              </ul>
              <form
                className="d-flex me-1"
                role="search"
                style={{ marginRight: "150px" }}
              >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-dark" type="submit">
                  Search
                </button>
              </form>
              <IoIosSettings size={20} color="#6e6e6e" />

              <FaBell size={20} color="#6e6e6e" />
              <IoPersonCircle size={40} />
            </div>
          </div>
        </nav>

        <div className="d-flex justify-content-between  mt-n1">
          <div className="d-flex justify-content-between gap-2 ms-4">
            <RenderButton
              title="Users"
              Icon={LuUsers}
              isActive={isUserManagement}
              onClick={() => setisUserManagement(true)}
            />
            <RenderButton
              title="Roles"
              Icon={BiShield}
              isActive={!isUserManagement}
              onClick={() => setisUserManagement(false)}
            />
          </div>
        </div>
        <div>{isUserManagement ? <UserManagement /> : <RoleManagement />};</div>
      </div>
    </>
  );
}

export default Dashboard;
