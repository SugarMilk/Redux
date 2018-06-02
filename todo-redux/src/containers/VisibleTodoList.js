import { connect } from 'react-redux';
import { toggleTodoItemAction, VisibilityFiltersType } from '../actions';
import TodoList from '../components/TodoList';

/**
 根据 state.visibilityFilter 的值，筛选对应要显示的待办项
 */
const getVisibletTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFiltersType.SHOW_ALL:
      return todos
    case VisibilityFiltersType.SHOW_ACTIVE:
      return todos.filter(item => !item.completed)
    case VisibilityFiltersType.SHOW_COMPLETED:
      return todos.filter(item => item.completed)
    default:
      return new Error(`Unknown filter: ${filter}`)
  }
}

const mapStateToProps = state => ({
  todos: getVisibletTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  toggleTodoItemAction: id => dispatch(toggleTodoItemAction(id))
})

/**
 TodoList 是 UI 组件, VisibleTodoList 就是由React-redux通过connect方法自动生成的容器组件
 todos 和 toggleTodoItemAction 将作为属性传递给 TodoList
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
