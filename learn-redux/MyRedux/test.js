/**
 * @Author: huangjian
 * @Date: 2018-05-31T15:51:19+08:00
 * @Desc: 测试 MyRedux
 */

const {createStore, useMiddleware} = require('./index')

function numberReducer(state, action) {
  switch (action.type) {
    case 'add':
      return Object.assign({}, state, {
        number: state.number + 1
      })
    case 'sub':
      return Object.assign({}, state, {
        number: state.number - 1
      })
    default:
      return state
  }
}

/*[ORIGINAL]
  function logger(store) {
    let dispatch = store.dispatch
    store.dispatch = function(action){
      console.log('[Action Begin]: ', action.type)
      dispatch.call(store, action)
      console.log('[Action End]:', action.type)
    }
    return store
  }
 */

/*
  const logger = store => dispatch => action {
    console.log('[Action Begin]: ', action.type)
    dispatch.call(store, action)
    console.log('[Action End]:', action.type)
  }
  Equal Below Function ↓↓↓↓↓
 */
const logger = function(store) {
  return function(dispatch) {
    return function(action) {
      console.log('[Action Begin]: ', action.type)
      dispatch.call(store, action)
      console.log('[Action End]:', action.type)
    }
  }
}

const store = createStore({
  numberReducer
}, {
  numberReducer: {number: 10}
})

useMiddleware(store, [logger])

store.subscribe(() => {
  console.log(store.getState());
})

store.dispatch({
  type: 'add'
})
