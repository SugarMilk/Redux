export default function reducers(state, action) {
  switch (action.type) {
    case 'add':
      return Object.assign({}, state, {list: state.list.concat(action.value)})
    default:
      return state
  }
}
