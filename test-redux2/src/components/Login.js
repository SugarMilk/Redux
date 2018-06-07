import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {FormGroup,ControlLabel,FormControl,Button} from 'react-bootstrap';

export default class Login extends Component {
  handleSubmit(){
    let usernameNode = ReactDOM.findDOMNode(this.refs.username)
    let passwordNode = ReactDOM.findDOMNode(this.refs.password)

    if (usernameNode.value.trim() && passwordNode.value.trim()) {
      this.props.onSubmit({
        username: usernameNode.value,
        password: passwordNode.value
      })

      usernameNode.value = ''
      passwordNode.value = ''
    }
  }

  render(){
    return (
      <form>
        <FormGroup>
          <ControlLabel>用户名</ControlLabel>
          <FormControl ref="username" type="text" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>密码</ControlLabel>
          <FormControl ref="password" type="password" />
        </FormGroup>
        <Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
      </form>
    );
  }
}
