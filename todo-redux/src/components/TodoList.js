import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({todos, toggleTodoItemAction}) => (
  <ul>
    {todos.map(item =>
      <Todo {...item} key={item.id} onClick={() => toggleTodoItemAction(item.id)} />
    )}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  toggleTodoItemAction: PropTypes.func.isRequired
}

export default TodoList
