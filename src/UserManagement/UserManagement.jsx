import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { AiOutlineUserAdd } from "react-icons/ai";
import { LuUsers } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import { useNavigate } from "react-router-dom";
function UserManagement() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const fetchData = () => {
    axios
      .get("http://localhost:3002/users")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [show, setShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setEditModalShow(false);
  };
  const handleShow = () => setShow(true);
  const handleEdit = (id) => {
    setEditModalShow(true);
    setCurrentId(id);
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3002/users/${id}`)
      .then((res) => console.log("deleted successfully"));
    window.location.reload();
  };
  const handleRead = (id) => {
    navigate(`/readusers/${id}`);
  };

  return (
    <>
      <div className="m-4">
        <Table
          hover
          responsive="sm"
          className="border"
          style={{ borderLeft: "1px solid white" }}
        >
          <thead>
            <tr>
              <th colSpan={5}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2">
                    <div>
                      {" "}
                      <LuUsers size={25} />
                    </div>

                    <span className="mt-1 fs-6">User Management</span>
                  </div>
                  <Button
                    style={{
                      background:
                        "linear-gradient(to right, #434343 0%, black 100%)",
                      border: "none",
                    }}
                    onClick={handleShow}
                  >
                    <AiOutlineUserAdd />
                    Add New User
                  </Button>
                  {show && <CreateUser handleClose={handleClose} show={show} />}
                </div>
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td
                  className="p-3 link-underline-dark"
                  onClick={() => handleRead(item.id)}
                >
                  <a className="link-underline-dark text-dark">{item.name}</a>
                </td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.role}</td>
                <td className="p-3">
                  <Badge bg="secondary rounded-pill"> {item.status}</Badge>
                </td>
                <td>
                  <div className="d-flex">
                    <MdEdit
                      className="text-secondary"
                      onClick={() => handleEdit(item.id)}
                    />

                    <MdDelete
                      className="text-secondary"
                      onClick={() => handleDelete(item.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <div>
            {editModalShow && (
              <EditUser
                handleClose={handleClose}
                show={editModalShow}
                currentId={currentId}
              />
            )}
          </div>
        </Table>
      </div>
    </>
  );
}

export default UserManagement;
