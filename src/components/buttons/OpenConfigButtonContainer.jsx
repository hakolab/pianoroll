import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { ButtonContainer } from './ButtonContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useButtonStyles } from '../../hooks/useButtonStyles';

export const OpenConfigButtonContainer = ({action, isInfo = false}) => {
  const classes = useButtonStyles();

  return (
    <ButtonContainer
      onClick={action}
      optionalClass={clsx(classes.iconButton, classes.normalHover, isInfo && classes.noSelect)}
    >
      <FontAwesomeIcon icon={faCog}/>
    </ButtonContainer>
  )
}

OpenConfigButtonContainer.propTypes = {
  action: PropTypes.func,
  isInfo: PropTypes.bool
}