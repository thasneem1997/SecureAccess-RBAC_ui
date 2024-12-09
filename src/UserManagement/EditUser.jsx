import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";

function EditUser({ handleClose, show, currentId }) {
  const [formData, setformData] = useState({});
  const [roles, setRoles] = useState([]);
  const fetchData = () => {
    axios
      .get(`http://localhost:3002/users/${currentId}`)
      .then((res) => setformData(res.data))
      .catch((err) => console.error(err));
  };
  const fetchRoles = () => {
    axios
      .get("http://localhost:3002/roles")
      .then((res) => setRoles(res.data))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchData();
    fetchRoles();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3002/users/${currentId}`, formData)
      .then((res) => console.log("updated sucessfully"));
    handleClose();
    window.location.reload();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className="d-flex justify-content-center align-items-center"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update User details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "400px" }}>
          {" "}
          <Container>
            <Row>
              <Col>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>

                    <Form.Control
                      type="text"
                      value={formData.name}
                      onChange={(event) =>
                        setformData({
                          ...formData,
                          name: event.target.value,
                        })
                      }
                      placeholder="Enter Name"
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      onChange={(event) =>
                        setformData({
                          ...formData,
                          email: event.target.value,
                        })
                      }
                      placeholder="Enter Email"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      name="role"
                      value={formData.role}
                      type="text"
                      onChange={(e) =>
                        setformData({ ...formData, role: e.target.value })
                      }
                      required
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name.charAt(0).toUpperCase() +
                            role.name.slice(1)}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Check
                      type="radio"
                      id="default-radio-1"
                      label="active"
                      name="radio"
                      checked={formData.status === "active"}
                      onChange={() =>
                        setformData({
                          ...formData,
                          status: "active",
                        })
                      }
                    />
                    <Form.Check
                      type="radio"
                      id="default-radio-2"
                      label="inactive"
                      name="radio"
                      checked={formData.status === "inactive"}
                      onChange={() =>
                        setformData({
                          ...formData,
                          status: "inactive",
                        })
                      }
                    />
                  </Form.Group>
                  <Button
                    style={{
                      background:
                        "linear-gradient(to right, #434343 0%, black 100%)",
                      border: "none",
                    }}
                    type="submit"
                    className="w-100"
                  >
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditUser;
