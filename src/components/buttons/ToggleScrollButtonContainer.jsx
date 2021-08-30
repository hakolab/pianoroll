import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { ButtonContainer } from './ButtonContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import { useButtonStyles } from '../../hooks/useButtonStyles';

export const ToggleScrollButtonContainer = ({action, isScrollMode = false, isInfo = false}) => {
  const classes = useButtonStyles();
  return (
    <ButtonContainer
      onClick={action}
      optionalClass={clsx(classes.iconButton, isScrollMode === true && classes.scrollOn, isInfo && classes.noSelect)}
    >
      <FontAwesomeIcon icon={faArrowsAlt}/>
    </ButtonContainer>
  )
}

ToggleScrollButtonContainer.propTypes = {
  action: PropTypes.func,
  isScrollMode: PropTypes.bool,
  isInfo: PropTypes.bool
}