/**
 * @Author: huangjian
 * @Date: 2018-06-01T13:32:27+08:00
 * @Desc: 状态树的处理器，reduce 有“分解”的意思
 */

import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

/*
 这里的 combineReducers 作用于根 state,
 即：
 let rootReducer = combineReducers(reducerA, reducerB))
 let store = createStore(rootReducer)

 但 combineReducers 也可作用于子 state,
 如：
 function reducerB(state, action){
   switch(action.type) {
     case 'xxx':
      return combineReducers(reducerC, reducerD)(state, action)  <==
     default:
      return state
   }
 }
 形如：state
 {
   reducerA: ...
   reducerB:
     xxx: {
       reducerC: ...
       reducerD: ...
     }
     ...
 }
 */
export default combineReducers({
  todos,
  visibilityFilter
})

/**
 状态树包括两个子节点：
 todos(所有待办项，无论是否已完成),
 visibilityFilter(当前待办项显示类型，包括显示全部 SHOW_ALL、显示已完成 SHOW_COMPLETED，显示未完成 SHOW_ACTIVE)

 形如：
  {
    visibilityFilter: 'SHOW_ALL',
    todos: [
    {
      text: 'I will do...',
      completed: false
    },
    {
      text: 'I will do...',
      completed: false
    },
    {
      text: 'I did ...',
      completed: true
    }]
  }
 */
