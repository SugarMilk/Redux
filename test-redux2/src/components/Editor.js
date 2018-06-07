import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {FormGroup,ControlLabel,FormControl,Button} from 'react-bootstrap';

export default class Editor extends Component {
  handleSubmit(){
    let titleNode = ReactDOM.findDOMNode(this.refs.title)
    let contentNode = ReactDOM.findDOMNode(this.refs.content)

    if (titleNode.value.trim() && contentNode.value.trim()) {
      this.props.onSubmit({
        title: titleNode.value,
        content: contentNode.value
      })

      titleNode.value = ''
      contentNode.value = ''
    }
  }

  render(){
    return <form>
      <FormGroup controlId="formControlsText">
        <ControlLabel>标题</ControlLabel>
        <FormControl ref="title" type="text" />
      </FormGroup>
      <FormGroup controlId="formControlsTextarea">
        <ControlLabel>内容</ControlLabel>
        <FormControl ref="content" componentClass="textarea" />
      </FormGroup>
      <Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
    </form>
  }
}
