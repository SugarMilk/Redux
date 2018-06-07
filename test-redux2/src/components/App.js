import React, { Component } from 'react';
import Editor from './Editor';
import List from './List';

export default class App extends Component {
  render(){
    return <div>
      <List list={this.props.list}/>
      <Editor onSubmit={this.props.onSubmit}/>
    </div>
  }
}
