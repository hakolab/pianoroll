import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { ButtonPresenter } from './ButtonPresenter'
import { useButtonStyles } from '../../hooks/useButtonStyles'

export const ChangeBeatButtonContainer = ({action, beatObject, target, isPlaying = false}) => {
  const classes = useButtonStyles();

  const handleClick = () => {
    action(target.mode)
  }

  return (
    <ButtonPresenter
      onClick={handleClick}
      disabled={isPlaying}
      optionalClass={clsx(beatObject.mode === target.mode ? classes.beatOn : classes.beatOff)}
    >
      {target.viewName}
    </ButtonPresenter>
  )
}

ChangeBeatButtonContainer.propTypes = {
  action: PropTypes.func,
  beatObject: PropTypes.object,
  target: PropTypes.object,
  isPlaying: PropTypes.bool
}