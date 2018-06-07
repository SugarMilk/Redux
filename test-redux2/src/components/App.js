import React, { Component } from 'react';
import Editor from './Editor';
import List from './List';
import NavBar from './NavBar';
import Login from './Login';
import {Grid,Row,Col} from 'react-bootstrap';

export default class App extends Component {
  render(){
    return <div>
      {NavBar}
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <List list={this.props.list}/>
          </Col>
          <Col xs={6} md={4}>
            <Login/>
          </Col>
        </Row>
      </Grid>
      <Editor onSubmit={this.props.onSubmit}/>
    </div>
  }
}
