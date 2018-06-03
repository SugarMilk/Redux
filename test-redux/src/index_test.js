import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, bindActionCreators } from 'redux';

function reducer(state = {name: 'guest', number: 0}, action) {
  switch (action.type) {
    case 'changeName':
      return Object.assign({}, state, {name: action.name})
    case 'access':
      return Object.assign({}, state, {number: ++state.number})
    default:
      return state
  }
}

const actionMethods = {
  changeName(name){
    return {
      type: 'changeName',
      name
    }
  },
  access(){
    return {
      type: 'access'
    }
  }
}

const store = createStore(reducer)
const actions = bindActionCreators(actionMethods, store.dispatch)

function render() {
  let state = store.getState()

  ReactDOM.render(<App
    name={state.name}
    number={state.number}
    access={actions.access}
    changeName={actions.changeName}
    />, document.getElementById('root'))
}

store.subscribe(render)
render()

registerServiceWorker();
