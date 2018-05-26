import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="jumbotron-heading text-center">1</h1>
        <p className="text-center">
          <button className="btn btn-primary mr-2">increase</button>
          <button className="btn btn-danger mr-2">decrease</button>
        </p>
      </div>
    );
  }
}

export default App;
