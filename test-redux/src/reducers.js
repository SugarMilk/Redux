export default function reducers(state = {name: 'guest', number: 0}, action) {
  switch (action.type) {
    case 'changeName':
      return Object.assign({}, state, {name: action.name})
    case 'access':
      return Object.assign({}, state, {number: ++state.number})
    default:
      return state
  }
}
