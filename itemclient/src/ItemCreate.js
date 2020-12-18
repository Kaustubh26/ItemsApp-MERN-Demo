//Main Component that controls Item Logic
import React from 'react';
import './App.css';
import { Button, Form, Overlay, Popover } from 'react-bootstrap';


class ItemCreate extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      itemDescription: ''
    }
  };

  componentDidMount(){
    //load component
  }

  submitCreate = (e) => {
    e.preventDefault();
    let item = {
      name: this.state.itemName,
      description: this.state.itemDescription
    }
    this.props.onSubmit(item);
  }

  render(){
    return(
      <div>
      <Overlay show={this.props.display} containerPadding={10} placement="bottom" target={this.props.target}>
        <Popover id="popover-contained">
          <Popover.Title as="h3">Create Item<a className="close-popover" href="javascript:void(0);" onClick={k => this.props.onClose()} style={{float: "right"}}>X</a></Popover.Title>
          <Popover.Content>
            <Form onSubmit={(e)=> this.submitCreate(e)}>
            <Form.Group controlId="formBasicText">
              <Form.Label>Item name</Form.Label>
              <Form.Control type="text" onChange={(e) => this.setState({itemName: e.target.value})} required/>
            </Form.Group>
            <Form.Group controlId="formBasicTextArea">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={(e) => this.setState({itemDescription: e.target.value})} required/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          </Popover.Content>
        </Popover>
      </Overlay>
      </div>
    );
  }
}

export default ItemCreate;