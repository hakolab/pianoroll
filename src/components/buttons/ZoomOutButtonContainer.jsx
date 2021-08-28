import React from 'react'
import PropTypes from 'prop-types'
import * as AppData from '../../AppData'
import { ButtonPresenter } from './ButtonPresenter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchMinus } from "@fortawesome/free-solid-svg-icons";
import { useButtonStyles } from '../../hooks/useButtonStyles';

export const ZoomOutButtonContainer = ({action, zoom}) => {
  const classes = useButtonStyles();

  return (
    <ButtonPresenter
      onClick={action}
      disabled={zoom === AppData.zoomMin}
      optionalClass={classes.normalHover}
    >
      <FontAwesomeIcon icon={faSearchMinus}/>
    </ButtonPresenter>
  )
}

ZoomOutButtonContainer.propTypes = {
  action: PropTypes.func,
  zoom: PropTypes.number
}