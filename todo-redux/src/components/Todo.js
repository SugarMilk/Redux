/**
 * @Author: huangjian
 * @Date: 2018-06-01T14:26:48+08:00
 * @Desc: ##

  解构赋值，对参数顺序有没有要求
 */

import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({onClick, completed, text}) => (
  <li onClick={onClick} style={{textDecoration: completed ? 'line-through' : 'none'}}>{text}</li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
