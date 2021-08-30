import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import * as AppData from '../../AppData'
import { ButtonContainer } from './ButtonContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchMinus } from "@fortawesome/free-solid-svg-icons";
import { useButtonStyles } from '../../hooks/useButtonStyles';

export const ZoomOutButtonContainer = ({action, zoom, isInfo = false}) => {
  const classes = useButtonStyles();

  return (
    <ButtonContainer
      onClick={action}
      disabled={zoom === AppData.zoomMin}
      optionalClass={clsx(classes.iconButton, classes.normalHover, isInfo && classes.noSelect)}
    >
      <FontAwesomeIcon icon={faSearchMinus}/>
    </ButtonContainer>
  )
}

ZoomOutButtonContainer.propTypes = {
  action: PropTypes.func,
  zoom: PropTypes.number,
  isInfo: PropTypes.bool
}