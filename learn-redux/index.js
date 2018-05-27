/**
 * create by:   huangjian
 * create date: 2018-05-26 21:30
 * description: ##
 */

import * as Redux from "redux";

const ActionTypes = {
  ALL: Symbol("ALL")
};

const defaultState = {
  users: []
}

// 制定规则
function getUsers(state, action) {
  state = state || defaultState;

  switch (action.type) {
    case ActionTypes.ALL:
      return Object.assign({}, state, {
        users: [1, 2, 3]
      });
    default:
      return state;
  }
}

// 创建容器 (调用rule，即先初始化store)
const store = Redux.createStore(getUsers);

// 添加监听 (store中的state发生改变后，监听接收)
store.subscribe(function(){
  console.log('PREV: ', store.getState());

  let currentState = store.getState();
  currentState.users.push(4, 5, 6);

  console.log('NEXT: ', store.getState());
});

// 触发事件
store.dispatch({
  type: ActionTypes.ALL
})

store.dispatch({
  type: ActionTypes.ALL
})
