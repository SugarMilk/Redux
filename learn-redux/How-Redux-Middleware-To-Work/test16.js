import { createStore, applyMiddleware } from 'redux';

const reducer = function(state, action) {
  switch (action.type) {
    case 'changeName':
      return Object.assign({}, state, {name: action.name})
    default:
      return state
  }
}

const logger = store => dispatch => action => {
  console.log(`BEGIN: ${action.type}`)
  let result = dispatch(action)
  console.log(`END: ${action.type}`)
  return result
}

function thunkAction(name) {
  return function(dispatch) {
    setTimeout(() => {
      dispatch({
        type: 'changeName',
        name
      })
    }, 2000)
  }
}

const thunk = store => dispatch => action => {
  if (typeof action === 'function') {
    /**
     如何理解：
     action = function(dispatch) {
       setTimeout(() => {
         dispatch({
           type: 'changeName',
           name
         })
       }, 2000)
     }
     */
    action(dispatch)
  } else {
    /**
     如何理解：
     dispatch({
       type: 'changeName',
       name
     })
     */
    dispatch(action)
  }
}

function promiseAction(name) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve({
        type: 'changeName',
        name: 'william'
      })
    }, 3000)
  });
}

const promise = store => dispatch => action => {
  if (action instanceof Promise) { // action 指 Promise 实例
    action.then((action) => {
      dispatch(action) // action 指 resolve 回调的对象
    })
  } else {
    dispatch(action)
  }
}

function * generatorAction() {
  let name = yield new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve('hj')
    }, 1000)
  });

  return {
    type: 'changeName',
    name
  }
}

const generator = store => dispatch => action => {
  if (typeof action === 'function' && action.constructor.name === 'GeneratorFunction') {
    let g = action()
    let v = g.next()

    function run(v) {
      if (v.done) {
        dispatch(v.value)
      } else {
        if (v.value && v.value instanceof Promise) {
          v.value.then(function(param){
            run(g.next(param))
          })
        } else {
          dispatch(v.value)
        }
      }
    }
    run(v)
  }
}

/**
 applyMiddleware 参数中的中间件顺序很重要，一般让异步中间件放在前面(可以换下顺序试试)
 */
const store = createStore(reducer, applyMiddleware(generator, logger))

store.subscribe(() => {
  console.log(store.getState());
})

store.dispatch(generatorAction)
console.log('Run..');
