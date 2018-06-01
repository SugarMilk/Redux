/**
 * @Author: huangjian
 * @Date: 2018-06-01T16:52:27+08:00
 * @Desc: ##
 */

import { connect } from 'react-redux';
import { setVisibilityFilterAction } from '../actions';
import Link from '../components/Link';

/*
mapStateToProps（state, ownProps）
用于建立组件 props(ownProps) 跟 store 的 state 的映射关系，返回一个 object。
在每次 store 的 state 发生变化的时候，该方法都会被调用，props(ownProps)发生变化，从而引起UI的更新
*/
/*
 由于 Link 组件中的 button 标签，包含属性 disable={active}，是否禁用取决于 state.visibilityFilter 的值，
 所以当 state.visibilityFilter 的值发生变化后(按钮被点击，先mapDispatchToProps再mapStateToProps)，active 的值也发生变化
 state.visibilityFilter 表示筛选器类型的值，而 ownProps.filter 表示本组件<FilterLink>属性filter的值
 */
const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

/*
mapDispatchToProps (dispatch, ownProps)
用于建立组件 props(ownProps) 跟 store.dispatch 的映射关系，返回一个 object。
它定义 UI 组件如何发出 action，实际上就是要调用 dispatch 这个方法
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilterAction(ownProps.filter))
})

/**
 Link 是 UI 组件，FilterLink 就是由React-redux通过connect方法自动生成的容器组件
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

/**
 Redux connect() 方法
 https://blog.csdn.net/ZhangYaBo_Code/article/details/73331249
 https://segmentfault.com/a/1190000010416732
 https://www.jianshu.com/p/9873d4ccb891
 */

/**
 mapStateToProps，mapDispatchToProps
 https://blog.csdn.net/suwu150/article/details/79415085
 http://www.imweb.io/topic/5a426d32a192c3b460fce354
 https://blog.csdn.net/genius_yym/article/details/64130120
 */
