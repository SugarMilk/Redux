import { createStore } from 'redux'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'changeName':
      return Object.assign({}, state, {name: action.name})
    default:
      return state
  }
}

const store = createStore(reducer)

store.subscribe(()=>{
  console.log(store.getState());
})

function actionCreators(actions, dispatch) {
  function actionCreator(action, dispatch) {
    return function(operation) {
      action = Object.assign({}, action, operation, {type: action.type})
      dispatch(action)
    }
  }

  if (typeof actions === 'function') {
    return actionCreator(actions, dispatch)
  } else {
    let events = {}
    for (var key in actions) {
      let action = actions[key]
      events[key] = actionCreator(action, dispatch)
    }
    return events
  }
}

let a = {type: 'a'}
let b = {type: 'b'}
let changeName = {type: 'changeName'}

let actions = actionCreators({a, b, changeName}, store.dispatch)

actions.a();
actions.changeName({name: 'hj'})
