
/**
 * Redux 工作机制原理:
 * state 即状态树
 * handlers 即Reducer
 */

let state = {
  a: {name: null},
  b: {group: null},
  c: {leader: null}
}

function updateStateManager(prevState, handlers) {
  let nextState = {}

  let keys = Object.keys(handlers)
  keys.forEach(key => {
    let handler = handlers[key]
    let prevSubState = state[key]
    let nextSubState = handler(prevSubState)
    nextState[key] = nextSubState
  })

  let newState = Object.assign({}, prevState, nextState)
  console.log(newState)
}

function handlerA(state) {
  return {
    name: 'huangjian'
  }
}

function handlerB(state) {
  return {
    group: 'admin'
  }
}

updateStateManager(state, {
  a: handlerA,
  b: handlerB
})
