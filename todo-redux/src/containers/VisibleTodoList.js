import { connect } from 'react-redux';
import { toggleTodoItemAction, VisibilityFiltersType } from '../actions';
import TodoList from '../components/TodoList';

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
