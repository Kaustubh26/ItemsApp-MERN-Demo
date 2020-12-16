import './App.css';
import { NavLink } from "react-router-dom";
import { Alert, Col, Row } from 'react-bootstrap';

const Home = () => (
  <Row>
  <Col sm={6}>
    <Alert variant="warning"><NavLink to="/customer">Customer</NavLink></Alert>
  </Col>
  <Col sm={6}>
    <Alert variant="warning"><NavLink to="/seller">Seller</NavLink></Alert>
  </Col>
  </Row>
)

export default Home;