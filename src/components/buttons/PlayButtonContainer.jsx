import React from 'react'
import PropTypes from 'prop-types'
import { ButtonPresenter } from './ButtonPresenter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useButtonStyles } from '../../hooks/useButtonStyles';

export const PlayButtonContainer = ({action, isPlaying = false}) => {
  const classes = useButtonStyles();

  return (
    <ButtonPresenter
      onClick={action}
      disabled={isPlaying}
      optionalClass={classes.normalHover}
    >
        <FontAwesomeIcon icon={faPlay}/>
    </ButtonPresenter>
  )
}

PlayButtonContainer.propTypes = {
  action: PropTypes.func,
  isPlaying: PropTypes.bool
}