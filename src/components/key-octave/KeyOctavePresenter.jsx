import React from 'react'
import PropTypes from 'prop-types';

export const KeyOctavePresenter = ({id, className, children}) => {
  return (
    <div
      id={id}
      className={className}
    >
      {children}
    </div>
  )
}

KeyOctavePresenter.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.array
};