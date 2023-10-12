import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap"; // Import Container and Form from react-bootstrap
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, resetPassword } from "../auth/firebase";

const ResetPass = () => {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/countries");
  }, [user, loading, navigate]);

  const handleResetPassword = () => {
    resetPassword(email);
  };

  return (
    <Container className="d-flex justify-content-center">
      <Form className="mt-5">
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </Form.Group>

        <Button variant="primary" onClick={handleResetPassword}>
          Reset Password
        </Button>
        <Link to="/login" className="text-white"><Button className="m-3">Back to login page</Button></Link>
      </Form>
    </Container>
  );
};

export default ResetPass;
