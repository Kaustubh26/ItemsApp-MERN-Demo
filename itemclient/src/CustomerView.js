import './App.css';
import { Alert, Col, Row } from 'react-bootstrap';
import ItemList from "./ItemList";

const CustomerView = () => (
  <div>
  <h3> Hello Customer, </h3>
  <br/>
  <ItemList isSeller={false}  />
  </div>
)

export default CustomerView;