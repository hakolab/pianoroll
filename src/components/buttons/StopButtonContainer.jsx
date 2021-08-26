import React from 'react'
import PropTypes from 'prop-types'
import { ButtonPresenter } from './ButtonPresenter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop } from "@fortawesome/free-solid-svg-icons";

export const StopButtonContainer = ({action, isPlaying = false}) => {
  return (
    <ButtonPresenter
      onClick={action}
      disabled={!isPlaying}
    >
        <FontAwesomeIcon icon={faStop}/>
    </ButtonPresenter>
  )
}

StopButtonContainer.propTypes = {
  action: PropTypes.func,
  isPlaying: PropTypes.bool
}