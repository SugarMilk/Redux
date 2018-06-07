import React, { Component } from 'react'
import {ListGroup,ListGroupItem} from 'react-bootstrap';

export default class List extends Component {
  render(){
    let items = this.props.list.map(item=>
      <ListGroupItem key={item}>{item}</ListGroupItem>
    )
    return <ListGroup>{items}</ListGroup>
  }
}
