/**
 * @Author: huangjian
 * @Date: 2018-05-31T10:20:09+08:00
 * @Desc: 实现多个 reducers
 */

const EventEmitter = require('events').EventEmitter

class CreateStore {
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
    case 'say':
      return Object.assign({}, state, {
        name: 'Mr.' + state.name
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

const store = new CreateStore({
  nameReducer: {name: 'huangjian'},
  numberReducer: {number: 10}
})

store.setReducers({
  nameReducer,
  numberReducer
})

store.subscribe(() => {
  console.log(store.getState());
})

store.dispatch({
  type: 'add'
})

store.dispatch({
  type: 'say'
})
