import React from 'react'
import PropTypes from 'prop-types'
import { ButtonPresenter } from './ButtonPresenter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export const PlayButtonContainer = ({action, isPlaying = false}) => {
  return (
    <ButtonPresenter
      onClick={action}
      disabled={isPlaying}
    >
        <FontAwesomeIcon icon={faPlay}/>
    </ButtonPresenter>
  )
}

PlayButtonContainer.propTypes = {
  action: PropTypes.func,
  isPlaying: PropTypes.bool
}