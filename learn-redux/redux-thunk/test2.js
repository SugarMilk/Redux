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
  return (dispatch, getState, extra) => {
    console.log(getState());
    console.log(extra);

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
