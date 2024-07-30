import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import royal from "../../assets/royal.png";
import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <img src={royal} alt="royal logo" className="royal-logo"></img>
        <Container>
          {/* <Navbar.Brand>Welcome to Re-visit</Navbar.Brand> */}
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/about"}>
              About us
            </Nav.Link>
            <Nav.Link as={Link} to={"/contact"}>
              Contact us
            </Nav.Link>
            <Nav.Link as={Link} to={"/signin"}>
              Sign in
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
