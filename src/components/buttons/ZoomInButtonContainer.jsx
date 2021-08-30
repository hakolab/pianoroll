import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import * as AppData from '../../AppData'
import { ButtonContainer } from './ButtonContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { useButtonStyles } from '../../hooks/useButtonStyles';

export const ZoomInButtonContainer = ({action, zoom, isInfo = false}) => {
  const classes = useButtonStyles();

  return (
    <ButtonContainer
      onClick={action}
      disabled={zoom === AppData.zoomMin}
      optionalClass={clsx(classes.iconButton, classes.normalHover, isInfo && classes.noSelect)}
    >
      <FontAwesomeIcon icon={faSearchPlus}/>
    </ButtonContainer>
  )
}

ZoomInButtonContainer.propTypes = {
  action: PropTypes.func,
  zoom: PropTypes.number,
  isInfo: PropTypes.bool
}