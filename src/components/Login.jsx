import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap"; // Import Container and Form from react-bootstrap
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/countries");
  }, [user, loading, navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Form style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "10px" }}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group >
        <Button variant="primary" onClick={() => loginWithEmailAndPassword(email, password)}>
          Login
        </Button>
      <div className="mt-3">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
      </Form>
    </Container>
  );
};

export default Login;
