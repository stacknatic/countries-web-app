import { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../auth/firebase";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Add confirmation password state
    const [name, setName] = useState('');
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if (!name) {
            alert("Please enter name");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        registerWithEmailAndPassword(name, email, password);
    }

    useEffect(() => {
        if (loading) return;
        if (user) navigate('/countries');
    }, [user, loading, navigate]);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={6}>
                    <Form className="mt-5" style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "10px" }}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                            />
                        </Form.Group>
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
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                            />
                        </Form.Group>
                        <Button onClick={register} className="mt-2">Register</Button>
                        <div className="text-white m-2">
                            Already have an account?&nbsp;
                            <Link to="/login" className="link-primary">Login</Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
