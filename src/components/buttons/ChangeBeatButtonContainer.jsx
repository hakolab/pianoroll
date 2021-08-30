import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { ButtonContainer } from './ButtonContainer'
import { useButtonStyles } from '../../hooks/useButtonStyles'

export const ChangeBeatButtonContainer = ({action, beatObject, target, isPlaying = false, isInfo = false}) => {
  const classes = useButtonStyles();

  const handleClick = () => {
    action && action(target.mode)
  }

  return (
    <ButtonContainer
      onClick={handleClick}
      disabled={isPlaying}
      optionalClass={clsx(classes.textButton, beatObject.mode === target.mode ? classes.beatOn : classes.beatOff, isInfo && classes.noSelect)}
    >
      {target.viewName}
    </ButtonContainer>
  )
}

ChangeBeatButtonContainer.propTypes = {
  action: PropTypes.func,
  beatObject: PropTypes.object,
  target: PropTypes.object,
  isPlaying: PropTypes.bool,
  isInfo: PropTypes.bool
}