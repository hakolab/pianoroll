import React from 'react'
import PropTypes from 'prop-types';

export const GridPresenter = ({className, children}) => {
  return (
    <div id="grid-roll" className={className}>
      {children}
    </div>
  )
}

GridPresenter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array
}