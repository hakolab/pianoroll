import React from 'react'
import PropTypes from 'prop-types';

export const KeyboardPresenter = ({className, children}) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

KeyboardPresenter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array,
};