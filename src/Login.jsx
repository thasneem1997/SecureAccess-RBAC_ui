import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import InputGroup from "react-bootstrap/InputGroup";
import { CiLock } from "react-icons/ci";
import "./Login.css";

function Login() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (name === "admin" && password === "1234") {
      localStorage.setItem("isAuthenticated", true);
      navigate("/dashboard");
    } else if (name === "admin" && password != "1234") {
      setError("invalid password");
    } else if (name != "admin" && password === "1234") {
      setError("invalid username");
    } else {
      setError("invalid password and username");
    }
  };

  return (
    <Container style={{ marginTop: "170px" }}>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Form
            className="shadow p-3 mb-5 bg-body-tertiary rounded "
            onSubmit={handleSubmit}
          >
            <h3 className="text-center mb-4 fs-4 mt-2  ">Admin Login</h3>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Username</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <CiUser />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <CiLock />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
            {error && <p className="error text-danger">{error}</p>}
            <Button
              type="submit"
              className="w-100"
              style={{
                background: "linear-gradient(to right, #434343 0%, black 100%)",
                border: "none",
              }}
            >
              Submit
            </Button>
            <br />
            <br />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
