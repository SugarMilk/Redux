/**
 * @Author: huangjian
 * @Date: 2018-06-01T16:46:32+08:00
 * @Desc: 页面 待办项 输入框
 */

import React from 'react';
import { connect } from 'react-redux';
import { addTodoItemAction } from '../actions';

const AddTodo = ({dispatch}) => {
  let input

  return (<div>
    <form onSubmit={e => {
      e.preventDefault()

      if (input.value.trim().length > 0) {
        dispatch(addTodoItemAction(input.value))
        input.value = ''
      }
    }}>
      <input ref={node => input = node} />
      <button type='submit'>Add Todo</button>
    </form>
  </div>)
}

/**
 将 Redux 中的 store 中的 dispatch 方法赋值给 AddTodo

 Redux 应用只有一个单一的 store
 https://cn.redux.js.org/docs/basics/Store.html

 container 类似于 UIViewController
 component 类似于 UIView
 */
export default connect()(AddTodo)


/**
 Redux connect() 方法
 https://blog.csdn.net/ZhangYaBo_Code/article/details/73331249
 https://segmentfault.com/a/1190000010416732
 https://www.jianshu.com/p/9873d4ccb891
 */
