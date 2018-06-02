import { createStore, applyMiddleware } from 'redux';

const logger = store => dispatch => action => {
  console.log(`BEGIN: ${action.type}`)
  let result = dispatch(action)
  console.log(`END: ${action.type}`)
  return result
}

const reducer = function(state, action) {
  switch (action.type) {
    case 'changeName':
      return Object.assign({}, state, {name: action.name})
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(logger))

store.subscribe(()=>{
  console.log(store.getState());
})

store.dispatch({
  type: 'changeName',
  name: 'hj'
})
