import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";

function EditRole({ show, handleClose, currentId }) {
  const permissionArray = ["Read", "Write", "Edit", "Manage User"];
  const [formData, setformData] = useState([]);
  const fetchData = () => {
    axios
      .get(`http://localhost:3002/roles/${currentId}`)
      .then((res) => setformData(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:3002/roles/${currentId}`, formData);

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Role</Modal.Title>
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
                    value={formData.name}
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
                      checked={
                        Array.isArray(formData.permissions) &&
                        formData.permissions.includes(permission)
                      }
                      key={permission}
                      onChange={(e) => {
                        const { checked, value } = e.target;
                        const updatedPermissions = checked
                          ? [...formData.permissions, value]
                          : formData.permissions.filter(
                              (perm) => perm !== value
                            );

                        setformData({
                          ...formData,
                          permissions: updatedPermissions,
                        });
                      }}
                      type="checkbox"
                      id={`checkbox-${permission}`}
                      label={permission}
                      value={permission}
                    />
                  ))}
                </Form.Group>
                <Button style={{
                      background:
                        "linear-gradient(to right, #434343 0%, black 100%)",
                      border: "none",
                    }} type="submit" className="w-100">
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

export default EditRole;
