import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { ButtonContainer } from './ButtonContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useButtonStyles } from '../../hooks/useButtonStyles';

export const ClearAllButtonContainer = ({action, isPlaying = false, isInfo = false}) => {
  const classes = useButtonStyles();

  return (
    <Fragment>
      <ButtonContainer
        onClick={action}
        disabled={isPlaying}
        optionalClass={clsx(classes.iconButton, classes.dangerHover, isInfo && classes.noSelect)}
      >
        <FontAwesomeIcon icon={faTrashAlt}/>
      </ButtonContainer>
    </Fragment>
  )
}

ClearAllButtonContainer.propTypes = {
  action: PropTypes.func,
  isPlaying: PropTypes.bool,
  isInfo: PropTypes.bool
}