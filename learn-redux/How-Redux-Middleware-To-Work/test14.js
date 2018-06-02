import { createStore, applyMiddleware } from 'redux';

const reducer = function(state, action) {
  switch (action.type) {
    case 'changeName':
      return Object.assign({}, state, {name: action.name})
    default:
      return state
  }
}

const logger = store => dispatch => action => {
  console.log(`BEGIN: ${action.type}`)
  let result = dispatch(action)
  console.log(`END: ${action.type}`)
  return result
}

const thunk = store => dispatch => action => {
  if (typeof action === 'function') {
    /**
     如何理解：
     action = function(dispatch) {
       setTimeout(() => {
         dispatch({
           type: 'changeName',
           name
         })
       }, 2000)
     }
     */
    action(dispatch)
  } else {
    /**
     如何理解：
     dispatch({
       type: 'changeName',
       name
     })
     */
    dispatch(action)
  }
}

const store = createStore(reducer, applyMiddleware(thunk, logger))

store.subscribe(() => {
  console.log(store.getState());
})

function thunkAction(name) {
  return function(dispatch) {
    setTimeout(() => {
      dispatch({
        type: 'changeName',
        name
      })
    }, 2000)
  }
}

store.dispatch(thunkAction('huangjian'))
console.log('Run..');
