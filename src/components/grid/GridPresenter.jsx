import React from 'react'
import PropTypes from 'prop-types';

export const GridPresenter = ({className, children}) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

GridPresenter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array
}