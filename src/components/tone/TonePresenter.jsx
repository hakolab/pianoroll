import React from 'react'
import PropTypes from 'prop-types';

export const TonePresenter = ({id, className, children}) => {
  return (
    <div
      id={id}
      className={className}
    >
      {children}
    </div>
  )
}

TonePresenter.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.array
}