import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Button } from '@material-ui/core'
import { useButtonStyles } from '../../hooks/useButtonStyles'

export const ButtonPresenter = ({children, onClick, disabled = false, optionalClass = null}) => {
  const classes = useButtonStyles();

  return (
    <Button
      variant="outlined"
      className={clsx(classes.common, optionalClass)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}

ButtonPresenter.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  optionalClass: PropTypes.string
}