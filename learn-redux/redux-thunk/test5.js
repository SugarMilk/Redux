import { createStore, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise'

const reducer = function(state, action) {
  switch (action.type) {
    case 'changeName':
      return Object.assign({}, state, {name: action.name})
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(ReduxPromise))

store.subscribe(() => {
  console.log(store.getState());
})

function action(name) {
  return {
    type: 'changeName',
    name
  }
}

const asyncAction = function(name) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve(action(name))
    }, 2000)
  });
}

store.dispatch(asyncAction('hj'))
console.log('start..');
