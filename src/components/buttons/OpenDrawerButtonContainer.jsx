import React from 'react'
import PropTypes from 'prop-types'
import { ButtonPresenter } from './ButtonPresenter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from "@fortawesome/free-solid-svg-icons";

export const OpenDrawerButtonContainer = ({action}) => {
  return (
    <ButtonPresenter
      onClick={action}
    >
      <FontAwesomeIcon icon={faCog}/>
    </ButtonPresenter>
  )
}

OpenDrawerButtonContainer.propTypes = {
  action: PropTypes.func
}