import React from 'react'
import PropTypes from 'prop-types'
import * as AppData from '../../AppData'
import { ButtonPresenter } from './ButtonPresenter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { useButtonStyles } from '../../hooks/useButtonStyles';

export const ZoomInButtonContainer = ({action, zoom}) => {
  const classes = useButtonStyles();

  return (
    <ButtonPresenter
      onClick={action}
      disabled={zoom === AppData.zoomMin}
      optionalClass={classes.normalHover}
    >
      <FontAwesomeIcon icon={faSearchPlus}/>
    </ButtonPresenter>
  )
}

ZoomInButtonContainer.propTypes = {
  action: PropTypes.func,
  zoom: PropTypes.number
}