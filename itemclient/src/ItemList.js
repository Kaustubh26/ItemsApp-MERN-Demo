//Main Component that controls Item Logic
import React from 'react';
import './App.css';
import { Alert, Col, Row, Table, Button } from 'react-bootstrap';
import ItemCreate from "./ItemCreate";
const config = require("./config");


class ItemList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      //Define state variables
      itemList: [],
      displayCreateForm:false,
      createFormTarget: '',

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
      	  await this.setStateAsync({itemList: [...this.state.itemList, itemArr[i]] });
      	}
      });
    })
    .catch((error) =>{
      alert('An error occured, try again.');
    });
  }

  createItem = (itemdata) => {
    //Create a new item
    let responseStatus;
    fetch(config.API_URL + '/item', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemdata),
    })
    .then((response) => {
      responseStatus = response.status;
      return response.json();
    })
    .then((responseData) => {
      if (responseStatus == 200) {
        this.setState({itemList: [...this.state.itemList, responseData.item] });
        alert('Item added');
      }
      else {
        alert('Error in Adding Item');
      }
    })
    .catch((error) =>{
      alert('Error in Adding Item');
    });
    return;
  }

  updateItem = (itemdata) => {
    //Create a new item
    let responseStatus;
    fetch(config.API_URL + '/item', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemdata),
    })
    .then((response) => {
      responseStatus = response.status;
      return response.json();
    })
    .then((responseData) => {
      if (responseStatus == 200) {
        //Update the item in local state
        console.log(responseData);
        for (var i = 0; i < this.state.itemList.length; i++){
          if (this.state.itemList[i]._id === responseData.item._id){
            this.state.itemList[i].status = responseData.item.status;
            this.setState({itemList: this.state.itemList});
          }
        }
      }
      else {
        alert('Error in Updating Item');
      }
    })
    .catch((error) =>{
      alert('Error in Updating Item');
    });
    return;
  }

  itemStatusUpdate(itemId, status){
    let item = {
      _id: itemId,
      status: status
    }
    this.updateItem(item);
  }

  closeCreateForm = () => {
    this.setState({displayCreateForm: false});
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  render(){
    return(
    <div> 
    {this.props.isSeller ? 
      <div>
        <ItemCreate display={this.state.displayCreateForm} target={this.state.createFormTarget} onClose={this.closeCreateForm} onSubmit={this.createItem}/>
        <Button variant="primary" onClick={(e) => this.setState({displayCreateForm: true, createFormTarget: e.target})}>Create Item</Button> 
      </div>
    : <div></div>
    }
	  <Table striped bordered hover>
	    <thead>
	      <tr>
	      <th>Item Name</th>
	      <th>Item Description</th>
	      <th>State</th>
        <th>Action</th>
	      </tr>
	    </thead>
	    {this.state.itemList.map((item, i)=>(
	      <tbody>
	      <td>{item.name}</td>
	      <td>{item.description}</td>
	      <td>{item.status}</td>
        <td>
          {this.props.isSeller ?
          <div>
            {item.status === 'ordered' ?
              <div>
                <Button variant="success" onClick={() => this.itemStatusUpdate(item._id, 'accepted')}>Accept</Button>
                &nbsp;
                <Button variant="danger" onClick={() => this.itemStatusUpdate(item._id, 'rejected')}>Reject</Button>
              </div>
              :
              <div>
              {item.status === 'accepted' ?
                <Button onClick={() => this.itemStatusUpdate(item._id, 'dispatched')}>Dispatch</Button>
              : <div></div>
              }
              </div>
            }
          </div>
          :
          <div>
            {item.status === 'instock' ? 
              <Button onClick={() => this.itemStatusUpdate(item._id, 'ordered')}>Order</Button>
            :
              <div></div>
            }
          </div>
          }
        </td>
	      </tbody>
	    ))
		  }
	  </Table>
    </div>
    );
  }
}

export default ItemList;
