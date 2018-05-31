/**
 * @Author: huangjian
 * @Date: 2018-05-31T15:07:00+08:00
 * @Desc: Store
 */

const EventEmitter = require('events').EventEmitter

/**
 * 导出类 export class
 * http://es6.ruanyifeng.com/#docs/module#export-命令
 * https://segmentfault.com/q/1010000008760434/a-1020000008760580
 */
class Store {
  constructor(state) {
    this._state = state || {}
    this._reducers = {}
    this._emitter = new EventEmitter
  }

  getState(){
    return this._state
  }

  setReducers(reducers){
    this._reducers = reducers
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

module.exports = Store
