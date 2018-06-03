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

const asyncMiddleware = store => dispatch => action => {
  if (typeof action === 'function') {
    if (action.constructor.name === 'GeneratorFunction') {
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
    } else {
      action(dispatch) // thunk
    }
  } else {
    if (action instanceof Promise) {
      action.then((action) => {
        dispatch(action)
      })
    } else {
      dispatch(action)
    }
  }
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

function promiseAction(name) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve({
        type: 'changeName',
        name: name
      })
    }, 3000)
  });
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

const store = createStore(reducer, applyMiddleware(asyncMiddleware, logger))

store.subscribe(() => {
  console.log(store.getState());
})

store.dispatch(promiseAction('william'))
console.log('Run..');
