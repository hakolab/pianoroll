import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { ButtonPresenter } from './ButtonPresenter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import { useButtonStyles } from '../../hooks/useButtonStyles';

export const ToggleScrollButtonContainer = ({action, isScrollMode = false}) => {
  const classes = useButtonStyles();
  return (
    <ButtonPresenter
      onClick={action}
      optionalClass={clsx(isScrollMode === true && classes.scrollOn)}
    >
      <FontAwesomeIcon icon={faArrowsAlt}/>
    </ButtonPresenter>
  )
}

ToggleScrollButtonContainer.propTypes = {
  action: PropTypes.func,
  isScrollMode: PropTypes.bool
}