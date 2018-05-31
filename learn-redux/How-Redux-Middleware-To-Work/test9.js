/**
 * @Author: huangjian
 * @Date: 2018-05-31T11:52:18+08:00
 * @Desc: 中间件 middleware，继续进一步改造，熟知原理
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

// 中间件: 重写 dispatch !!

/**
 * 中间件第一层
 * 不能直接使用 dispatch(action), 因为这样找不到调用对象 this, 需使用 dispatch.call(store, action)
 *
 * call()
 * http://www.w3school.com.cn/js/pro_js_inheritance_implementing.asp
 */
function logger(store) {
  let dispatch = store.dispatch
  store.dispatch = function(action){
    console.log('[Action Begin]: ', action.type)
    dispatch.call(store, action)
    console.log('[Action End]:', action.type)
  }
  return store
}

/**
 * 中间件第二层
 * getAJaxData 中的 dispatch 和 logger 中的 dispatch 等同，都是原始的 dispatch
 */
function getAJaxData(store) {
  let dispatch = store.dispatch
  store.dispatch = function(action) {
    if (action.url) {
      console.log(`request url: ${action.url} ...`);
      setTimeout(function() {
        action.name = 'superMan'
        dispatch.call(store, action)
      }, 1000)
    }
  }
  return store
}

/**
 * 中间件解析器
 * 先执行一次中间件方法，以此获得每个中间件重写后的 dispatch 方法
 */
function useMiddleware(store, middles) {
  middles.reverse()
  middles.forEach(middle => {
    middle(store)
  })
  return store
}

useMiddleware(store, [logger, getAJaxData])

store.dispatch({
  type: 'changeName',
  url: '/login.do'
})

/*
输出

[Action Begin]:  changeName
request url: /login.do ...
[Action End]: changeName
{ nameReducer: { name: 'Mr.superMan' }, numberReducer: { number: 10 } }
*/
