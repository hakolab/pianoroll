import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { ButtonPresenter } from './ButtonPresenter'
import { useButtonStyles } from '../../hooks/useButtonStyles'

export const ButtonContainer = ({children, onClick, disabled = false, optionalClass = null}) => {
  const classes = useButtonStyles();

  return (
    <ButtonPresenter
      className={clsx(classes.common, optionalClass)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonPresenter>
  )
}

ButtonContainer.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  optionalClass: PropTypes.string
}