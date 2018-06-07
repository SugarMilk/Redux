import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {FormGroup,ControlLabel,FormControl,Button} from 'react-bootstrap';

export default class Editor extends Component {
  handleSubmit(){
    let node = ReactDOM.findDOMNode(this.refs.textarea)
    if (node.value.trim()) {
      this.props.onSubmit(node.value)
      node.value = ''
    }
  }

  render(){
    return <form>
      <FormGroup controlId="formControlsTextarea">
        <ControlLabel>Textarea</ControlLabel>
        <FormControl ref="textarea" componentClass="textarea" placeholder="textarea"/>
      </FormGroup>
      <Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
    </form>
  }
}
