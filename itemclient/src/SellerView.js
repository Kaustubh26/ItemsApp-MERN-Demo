import './App.css';
import { Alert, Col, Row } from 'react-bootstrap';
import ItemList from "./ItemList";


const SellerView = () => (
  <div>
  <h3> Hello Seller, </h3>
  <br/>
  <ItemList isSeller={true}  />
  </div>
)

export default SellerView;