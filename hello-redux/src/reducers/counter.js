
/*
  制定一套Redux规则：触发action，操作state
*/

const counter = function (state = 0, action = {}) {
  switch (action.type) {
    case "INCREASE":
      return (state < 10) ? state + 1 : state;
    case "DECREASE":
      return (state > 0) ? state - 1 : state;
    default:
      return state;
  }
}

export default counter;
