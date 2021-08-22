import React from 'react'
import PropTypes from 'prop-types';

export const ToneOctavePresenter = ({id, className, children}) => {
  return (
    <div
      id={id}
      className={className}
    >
      {children}
    </div>
  )
}

ToneOctavePresenter.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.array
}