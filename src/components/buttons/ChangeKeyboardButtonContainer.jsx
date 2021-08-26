import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { ButtonPresenter } from './ButtonPresenter'
import { useButtonStyles } from '../../hooks/useButtonStyles'

export const ChangeKeyboardButtonContainer = ({action, keyboardObject, target, isPlaying = false}) => {
  const classes = useButtonStyles();

  const handleClick = () => {
    action(target.mode)
  }

  return (
    <ButtonPresenter
      onClick={handleClick}
      disabled={isPlaying}
      optionalClass={clsx(keyboardObject.mode === target.mode ? classes.keyboardOn : classes.keyboardOff)}
    >
      {target.viewName}
    </ButtonPresenter>
  )
}

ChangeKeyboardButtonContainer.propTypes = {
  action: PropTypes.func,
  keyboardObject: PropTypes.object,
  target: PropTypes.object,
  isPlaying: PropTypes.bool
}