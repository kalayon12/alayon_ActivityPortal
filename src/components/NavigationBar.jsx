import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function NavigationBar() {
  return (
    <Navbar variant="dark" expand="lg" className="at-navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="text-info fw-bold">
          React Activity Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/activity1">Activity 1</Nav.Link>
            <Nav.Link as={NavLink} to="/activity2">Activity 2</Nav.Link>
            <Nav.Link as={NavLink} to="/activity3">Activity 3</Nav.Link>
            <Nav.Link as={NavLink} to="/activity4">Activity 4</Nav.Link>
            <Nav.Link as={NavLink} to="/activity5">Activity 5</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;