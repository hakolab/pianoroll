import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

export const ButtonPresenter = ({children, className, onClick, disabled = false}) => {
  return (
    <Button
      variant="outlined"
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}

ButtonPresenter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}