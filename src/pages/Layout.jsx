import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom'; // Import useHistory
import { auth, logout } from '../auth/firebase';

const Layout = () => {
  const [user] = useAuthState(auth);
  const history = useNavigate(); // Get the history object

  const handleLogout = async () => {
    history.push('/'); // Redirect to the '/' route after logging out
  };

  return (
    <Container fluid>
      <Row className='mt-5'> 
        <Navbar bg="dark" variant="dark" className='p-3' fixed="top">
          <Container className="justify-content-end">
            <Container>

            <Navbar.Brand className='link-info'>Countries Web App</Navbar.Brand>
            </Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/countries">
                  <Nav.Link>Countries</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/favourites">
                  <Nav.Link>Favourites</Nav.Link>
                </LinkContainer>
                {user ? (
                  <Button variant="primary" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <LinkContainer to="/login">
                      <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/register">
                      <Nav.Link>Register</Nav.Link>
                    </LinkContainer>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>
  );
};

export default Layout;
