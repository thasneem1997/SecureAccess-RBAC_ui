import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";

function CreateRole({ handleClose, show, fetchData }) {
  const permissionArray = ["Read", "Write", "Edit", "Manage User"];
  const [formData, setformData] = useState({
    name: "",
    permissions: [],
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3002/roles", formData)
      .then((res) => console.log("Role created:", res))
      .catch((err) => console.error("Failed to create role:", err));
    fetchData();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    onChange={(e) =>
                      setformData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Permission</Form.Label>
                  {permissionArray.map((permission) => (
                    <Form.Check
                      value={permission}
                      key={permission}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        setformData((prevFormData) => {
                          const updatedFormData = checked
                            ? [...prevFormData.permissions, value]
                            : prevFormData.permissions.filter(
                                (perm) => perm !== value
                              );
                          return {
                            ...prevFormData,
                            permissions: updatedFormData,
                          };
                        });
                      }}
                      type="checkbox"
                      id={`checkbox-${permission}`}
                      label={permission}
                    />
                  ))}
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

export default CreateRole;
