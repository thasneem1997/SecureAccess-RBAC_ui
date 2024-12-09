import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { BiShield } from "react-icons/bi";
import { IoCreateOutline } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import CreateRole from "./CreateRole";
import axios from "axios";
import EditRole from "./EditRole";
import { Link } from "react-router-dom";

function RoleManagement() {
  // const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [roles, setRoles] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const handleClose = () => {
    setShow(false);
    setShowEditModal(false);
  };
  const fetchData = () => {
    axios
      .get("http://localhost:3002/roles")
      .then((res) => setRoles(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3002/roles/${id}`)
      .then((res) => {
        console.log("Deleted successfully");
        fetchData();
      })
      .catch((err) => console.error("Error deleting role:", err));
  };
  const handleEdit = (id) => {
    setCurrentId(id);
    setShowEditModal(true);
  };
  return (
    <div className="m-3">
      <Accordion defaultActiveKey="0">
        <Accordion.Item className="mt-3 p-2" eventKey="0">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2">
              <div>
                <BiShield size={25} />
              </div>
              <span className="mt-1 fs-6 fw-bolder">Role Management</span>
            </div>
            <Button
              onClick={handleShow}
              style={{
                background: "linear-gradient(to right, #434343 0%, black 100%)",
                border: "none",
              }}
            >
              <IoCreateOutline size={19} className="mt-n4" />
              Create Role
            </Button>
            {show && (
              <CreateRole
                handleClose={handleClose}
                show={show}
                fetchData={fetchData}
              />
            )}
          </div>
        </Accordion.Item>
        {roles.map((role, i) => (
          <Accordion.Item eventKey={i}>
            <Accordion.Header>
              <Link
                to={`/readrole/${role.id}`}
                className="link-underline-dark text-dark"
              >
                {role.name}
              </Link>
            </Accordion.Header>
            <Accordion.Body>
              <h6>Permissions:</h6>
              {Array.isArray(role.permissions) &&
              role.permissions.length > 0 ? (
                <ul>
                  {role.permissions.map((permission, index) => (
                    <li key={index}>{permission}</li>
                  ))}
                </ul>
              ) : (
                <p>No permissions assigned</p>
              )}
              <hr />
              <div className="d-flex justify-content-between">
                <h6 className="fw-normal" onClick={() => handleEdit(role.id)}>
                  <MdEdit /> Edit Role
                </h6>
                <h6
                  className="fw-normal cursor-pointer"
                  onClick={() => handleDelete(role.id)}
                >
                  <MdDelete />
                  Delete Role
                </h6>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
        <div>
          <div>
            {showEditModal && (
              <EditRole
                handleClose={handleClose}
                show={showEditModal}
                currentId={currentId}
              />
            )}
          </div>
        </div>
      </Accordion>
    </div>
  );
}

export default RoleManagement;
