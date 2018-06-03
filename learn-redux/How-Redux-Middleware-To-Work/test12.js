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

/**
 bindActionCreators
 https://blog.csdn.net/juzipchy/article/details/77659019
 https://blog.csdn.net/liwusen/article/details/54138854
 https://www.2cto.com/kf/201805/744222.html
 https://segmentfault.com/a/1190000011883586

 */
