import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { ButtonContainer } from './ButtonContainer'
import { useButtonStyles } from '../../hooks/useButtonStyles'

export const ChangeKeyboardButtonContainer = ({action, keyboardObject, target, isPlaying = false, isInfo = false}) => {
  const classes = useButtonStyles();

  const handleClick = () => {
    // action が渡されていれば実行
    action && action(target.mode)
  }

  return (
    <ButtonContainer
      onClick={handleClick}
      disabled={isPlaying}
      optionalClass={clsx(classes.textButton, keyboardObject.mode === target.mode ? classes.keyboardOn : classes.keyboardOff, isInfo && classes.noSelect)}
    >
      {target.viewName}
    </ButtonContainer>
  )
}

ChangeKeyboardButtonContainer.propTypes = {
  action: PropTypes.func,
  keyboardObject: PropTypes.object,
  target: PropTypes.object,
  isPlaying: PropTypes.bool,
  isInfo: PropTypes.bool
}