import logo from './logo.svg';
import './App.css';
import { Switch, Route, NavLink } from "react-router-dom";
import { Alert, Container, Button } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CustomerView from "./CustomerView";
import SellerView from "./SellerView";
import Home from "./Home";

// Home Page and React Router
const App = () => (
  <Container>
    <Alert variant="info">
      <center>
      <span id="headerText">
        Item App MERN Demo
      </span>
      </center>
    </Alert>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/customer" component={CustomerView} />
        <Route path="/seller" component={SellerView} />
    </Switch>
  </Container>
)

const Server= () => <h3>What is server side?<li>node.js - JavaScript everywhere!</li></h3>

export default App;
