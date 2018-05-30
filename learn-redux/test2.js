/**
 * 自己实现一个Redux
 */

const EventEmitter = require('events').EventEmitter

class Store {
  constructor(state) {
    this._state = state || {}
    this._emitter = new EventEmitter
  }

  getState(){
    return this._state
  }

  setReducers(fn){
    this._reducers = fn
  }

  dispatch(action){
    if (this._reducers) {
        this._state = this._reducers(this._state, action)
    }
    this._emitter.emit('change')
  }

  subscribe(fn){
    this._emitter.on('change', fn)
  }
}

const store = new Store({number: 10})

store.setReducers(function(state, action) {
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
      return prevState
  }
})

store.subscribe(() => {
  console.log(store.getState());
})

store.dispatch({
  type: 'add'
})
