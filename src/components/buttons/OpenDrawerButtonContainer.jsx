import React from 'react'
import PropTypes from 'prop-types'
import { ButtonPresenter } from './ButtonPresenter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useButtonStyles } from '../../hooks/useButtonStyles';

export const OpenDrawerButtonContainer = ({action}) => {
  const classes = useButtonStyles();

  return (
    <ButtonPresenter
      onClick={action}
      optionalClass={classes.normalHover}
    >
      <FontAwesomeIcon icon={faCog}/>
    </ButtonPresenter>
  )
}

OpenDrawerButtonContainer.propTypes = {
  action: PropTypes.func
}