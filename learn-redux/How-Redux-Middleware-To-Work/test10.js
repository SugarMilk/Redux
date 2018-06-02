import { createStore } from 'redux'

const reducer = (state, action) => {
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

function actionCreator(action, dispatch) {
  return function(operation) {
    action = Object.assign({}, action, operation, {type: action.type})
    dispatch(action)
  }
}

let action = actionCreator({
  type: 'changeName',
  name: 'guest'
}, store.dispatch)

action({name: 'huangjian'})
