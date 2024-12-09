import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";

function CreateUser({ handleClose, show }) {
  const [formData, setformData] = useState({});
  const [roles, setRoles] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3002/users", formData).then((res) => {
      handleClose();
      window.location.reload();
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3002/roles")
      .then((res) => setRoles(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="d-flex justify-content-center align-items-center"
    >
      <Modal.Header closeButton className="fs-6">
        <Modal.Title className="fs-4">Create New user</Modal.Title>
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
                    placeholder="Enter Name"
                    onChange={(e) =>
                      setformData({ ...formData, name: e.target.value })
                    }
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
                    placeholder="Enter Email"
                    onChange={(e) =>
                      setformData({ ...formData, email: e.target.value })
                    }
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
                        {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
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
                    value="active"
                    onChange={(e) =>
                      setformData({ ...formData, status: e.target.value })
                    }
                  />
                  <Form.Check
                    type="radio"
                    id="default-radio-2"
                    label="inactive"
                    name="radio"
                    value="inactive"
                    onChange={(e) =>
                      setformData({ ...formData, status: e.target.value })
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
  );
}

export default CreateUser;
