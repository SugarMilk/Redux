/**
 * @Author: huangjian
 * @Date: 2018-05-31T11:10:38+08:00
 * @Desc: 中间件 middleware
 */

const EventEmitter = require('events').EventEmitter

class Store {
  constructor(state) {
    this._state = state || {}
    this._reducers = {}
    this._emitter = new EventEmitter
  }

  getState(){
    return this._state
  }

  setReducers(fn){
    this._reducers = fn
  }

  dispatch(action){
    if (typeof this._reducers === 'function') {
      this._state = this._reducers(this._state, action)
    } else {
      let nextState = {}
      let keys = Object.keys(this._reducers)
      keys.forEach(key => {
        let reducer = this._reducers[key]
        let prevSubState = this._state[key]
        let nextSubState = reducer(prevSubState, action)
        nextState[key] = nextSubState
      })
      this._state = Object.assign({}, this._state, nextState)
    }
    this._emitter.emit('change')
  }

  subscribe(fn){
    this._emitter.on('change', fn)
  }
}

function nameReducer(state, action) {
  switch (action.type) {
    case 'changeName':
      return Object.assign({}, state, {
        name: 'Mr.' + action.name
      })
    default:
      return state
  }
}

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

function createStore(reducers, defaultState) {
  const store = new Store(defaultState)
  store.setReducers(reducers)
  return store;
}

const store = createStore({
  nameReducer,
  numberReducer
}, {
  nameReducer: {name: 'guest'},
  numberReducer: {number: 10}
})

store.subscribe(() => {
  console.log(store.getState());
})

const action = {
  type: 'changeName',
  name: 'Huangjian'
}

// 1. 拦截执行
// console.log('[Action Begin]: ', action.type);
// store.dispatch(action)
// console.log('[Action End]:', action.type);

// 2. 延迟异步执行
function aJaxData(callback) {
  setTimeout(function() {
    callback({name: 'William'})
  }, 1000)
}

aJaxData(function(data) {
  store.dispatch({
    type: 'changeName',
    name: data.name
  })
});
