import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

const reducer = function(state, action) {
  switch (action.type) {
    case 'changeName':
      return Object.assign({}, state, {name: action.name})
    default:
      return state
  }
}

const extra = {group: 'javascript'}
const store = createStore(reducer, applyMiddleware(ReduxThunk.withExtraArgument(extra)))

store.subscribe(() => {
  console.log(store.getState());
})

let asyncAction = function(name) {
  let action = {
    type: 'changeName',
    name
  }
/*
  return (dispatch, getState, extra) => {
    console.log(getState());
    console.log(extra);

    setTimeout(() => {
      dispatch(action)
    }, 2000)
  }
 */

  return (dispatch, getState, extra) => {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        dispatch(action)
        resolve()
      }, 2000)
    });
  }
}

store.dispatch(asyncAction('hj'))
console.log('start..');
