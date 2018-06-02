import { createStore, bindActionCreators } from 'redux';

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

function changeNameAction(name) {
  return {
    type: 'changeName',
    name
  }
}

function otherAction(other) {
  return {
    type: 'other',
    other
  }
}

let actions = bindActionCreators({
  changeNameAction,
  otherAction
}, store.dispatch)

actions.changeNameAction('hj')
actions.changeNameAction('huangjian')
