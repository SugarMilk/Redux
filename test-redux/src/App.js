import React, { Component } from 'react'

class App extends Component {
  render(){
    return (
    <div>
      <p>{this.props.name}</p>
      <p>{this.props.number}</p>
      <input onChange={e => this.props.changeName(e.target.value)} />
      <button onClick={e => this.props.access()}>access</button>
    </div>)
  }
}

export default App;
