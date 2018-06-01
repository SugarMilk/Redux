/**
 * @Author: huangjian
 * @Date: 2018-06-01T13:36:41+08:00
 * @Desc: 由用户触发的操作事件
 */

let nextTodoId = 0

export const addTodoItemAction = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const toggleTodoItemAction = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const setVisibilityFilterAction = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const VisibilityFiltersType = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  SHOW_COMPLETED: 'SHOW_COMPLETED'
}
