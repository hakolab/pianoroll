import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { ButtonContainer } from './ButtonContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useButtonStyles } from '../../hooks/useButtonStyles';

export const OpenInfoButtonContainer = ({action}) => {
  const classes = useButtonStyles();

  return (
    <ButtonContainer
      onClick={action}
      optionalClass={clsx(classes.iconButton, classes.normalHover)}
    >
      <FontAwesomeIcon icon={faQuestion}/>
    </ButtonContainer>
  )
}

OpenInfoButtonContainer.propTypes = {
  action: PropTypes.func
}