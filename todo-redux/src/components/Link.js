import React from 'react';
import PropTypes from 'prop-types';

/*
 Link 组件中的属性 active, children, onClick，将从父组件 FilterLink 中获取
 */
const Link = ({active, children, onClick}) => (
  <button disabled={active} onClick={onClick} style={{marginLeft:'4px'}}>{children}</button>
)

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link
