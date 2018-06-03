import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

// { [Function] withExtraArgument: [Function: createThunkMiddleware] }
console.log(ReduxThunk);

const reducer = function(state, action) {
  switch (action.type) {
    case 'changeName':
      return Object.assign({}, state, {name: action.name})
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(ReduxThunk))

store.subscribe(() => {
  console.log(store.getState());
})

let asyncAction = function(name) {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch({
        type: 'changeName',
        name
      })
    }, 2000)
  }
}

store.dispatch(asyncAction('hj'))
console.log('start..');
