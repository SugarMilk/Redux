import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="jumbotron-heading text-center">{this.props.value}</h1>
        <p className="text-center">
          <button className="btn btn-primary mr-2" onClick={this.props.onIncrease}>increase</button>
          <button className="btn btn-danger mr-2" onClick={this.props.onDecrease}>decrease</button>
        </p>
      </div>
    );
  }
}

App.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired
}

export default App;
