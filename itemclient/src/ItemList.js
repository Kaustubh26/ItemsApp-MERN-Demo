//Main Component that controls Item Logic
import React from 'react';
import './App.css';
import { Alert, Col, Row, Table } from 'react-bootstrap';
const config = require("./config");


class ItemList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      //Define state variables
      itemList: []
    }
  };

  componentDidMount(){
  	//Get Items on Compoenent Mount
  	this.getItems();
  }

  getItems(){
  	//Fetch all the items through REST API
  	let responseStatus;
  	fetch(config.API_URL + '/item', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then((response) => {
      responseStatus = response.status;
      return response.json();
    })
    .then((responseData) => {
      if (responseStatus !== 200){
      	//Basic error handling, if response is not successful
        alert('Could not fetch the Item list.');
        return;
      }
      let itemArr = responseData.items;
      this.setState({itemList: []}, async() => {
      	for (var i = 0; i < itemArr.length; i++){
      	  await this.setStateAsync({itemList:  [...this.state.itemList, itemArr[i]] });
      	}
      });
    })
    .catch((error) =>{
      alert('An error occured, try again.');
    });
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  render(){
    return(
	  <Table striped bordered hover>
	    <thead>
	      <tr>
	      <th>Item Name</th>
	      <th>Item Description</th>
	      <th>State</th>
	      </tr>
	    </thead>
	    {this.state.itemList.map((item, i)=>(
	      <tbody>
	      <td>{item.name}</td>
	      <td>{item.description}</td>
	      <td>{item.status}</td>
	      </tbody>
	    ))
		}
	  </Table>
    );
  }
}

export default ItemList;
