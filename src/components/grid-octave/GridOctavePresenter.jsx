import React from 'react'
import PropTypes from 'prop-types';

export const GridOctavePresenter = ({id, className, children}) => {
  return (
    <div
      id={id}
      className={className}>
      {children}
    </div>
  )
}

GridOctavePresenter.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.array
}