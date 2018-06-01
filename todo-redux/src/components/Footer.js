import React from 'react';
import FilterLink from '../containers/FilterLink';
import { VisibilityFiltersType } from '../actions';

const Footer = () => (
  <div>
    <span>Show: </span>
    <FilterLink filter={VisibilityFiltersType.SHOW_ALL}>ALL</FilterLink>
    <FilterLink filter={VisibilityFiltersType.SHOW_ACTIVE}>Active</FilterLink>
    <FilterLink filter={VisibilityFiltersType.SHOW_COMPLETED}>Completed</FilterLink>
  </div>
)

export default Footer
