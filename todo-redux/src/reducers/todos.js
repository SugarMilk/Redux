/**
 * @Author: huangjian
 * @Date: 2018-06-01T11:22:43+08:00
 * @Desc: [Reducer] todos
 *        添加待办事项、更改待办事项完成状态
 */

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {id: action.id, text: action.text, completed: false}]
    case 'TOGGLE_TODO':
      return state.map(item => (item.id === action.id) ? {...item, completed: !item.completed} : item)
    default:
      return state
  }
}

export default todos


/**
 数组映射方法 map(), 遍历每个元素时需要映射返回一个新元素, 以此组成并返回一个新数组
 newArray = array.map(element => ...)

 eg:
 let array = [1, 2, 3]
 let newArray = array.map(item => item * 2)    (=>箭头函数默认自动添加return)
 or:
 let newArray = array.map(item => {            (=>{}, {}是个表达式, 如需返回参数需手动添加return)
   return item * 2
 })
 or:
 let newArray = array.map(function(item) {
   return item * 2
 })
 newArray: [2, 4, 6]

 ref:
 http://es6.ruanyifeng.com/#docs/array
 https://blog.csdn.net/huangpb123/article/details/52756303
 http://www.zhangxinxu.com/wordpress/2013/04/es5新增数组方法/#map
 */

/**
 * 关于 ...
 */
