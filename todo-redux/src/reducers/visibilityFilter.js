/**
 * @Author: huangjian
 * @Date: 2018-06-01T13:27:16+08:00
 * @Desc: [Reducer] visibilityFilter
          设置过滤器
 */

import { VisibilityFiltersType } from '../actions'

const visibilityFilter = (state = VisibilityFiltersType.SHOW_ALL, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter
