/**
 * @Author: huangjian
 * @Date: 2018-05-31T10:20:09+08:00
 * @Desc: [改] 实现多个 reducers，初始化参数由 state 改为 reducers
 */

const EventEmitter = require('events').EventEmitter

class CreateStore {
  // reducers: function or object
  constructor(reducers) {
    this._reducers = reducers
    this._emitter = new EventEmitter

    // initialize state
    if (typeof this._reducers === 'function') {
      this._state = this._reducers(undefined, {})
    } else {
      let state = {}
      for (let key in this._reducers) {
        let reducer = this._reducers[key]
        state[key] = reducer(undefined, {})
      }
      this._state = state
    }
  }

  getState(){
    return this._state
  }

  dispatch(action){
    if (typeof this._reducers === 'function') {
      this._state = this._reducers(this._state, action)
    } else {
      /**
       * 遍历 reducers，根据 action.type 派发任务，返回新的子树 state
       */
      let nextState = {}
      let keys = Object.keys(this._reducers)
      keys.forEach(key => {
        let reducer = this._reducers[key]
        let prevSubState = this._state[key]
        let nextSubState = reducer(prevSubState, action)
        nextState[key] = nextSubState
      })
      /**
       * Object.assign(target, ...sources)
       * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
       */
      this._state = Object.assign({}, this._state, nextState)
    }
    this._emitter.emit('change')
  }

  subscribe(fn){
    this._emitter.on('change', fn)
  }
}

function nameReducer(state = {name: 'guest'}, action) {
  switch (action.type) {
    case 'say':
      return Object.assign({}, state, {
        name: 'Mr.' + state.name
      })
    default:
      return state
  }
}

function numberReducer(state = {number: 0}, action) {
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

const store = new CreateStore({
  nameReducer,
  numberReducer
})

store.subscribe(() => {
  console.log(store.getState());
})

store.dispatch({
  type: 'add'
})
