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

function action(name) {
  return {
    type: 'changeName',
    name
  }
}

const asyncAction = function(name) {
  return (dispatch, getState, extra) => {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        dispatch(action('action1'))
        resolve() // 调用 resolve 方法，下个 then 回调才会生效
      }, 2000)
    }).then(function(param) {
      // dispatch(action('action2'))
      return new Promise(function(resolve, reject) {
        setTimeout(() => {
          dispatch(action('action2'))
          // resolve()
        }, 5000)
      });
    }).then(function(param) {
      dispatch(action('action3'))
    })
  }
}

store.dispatch(asyncAction('hj'))
console.log('start..');
