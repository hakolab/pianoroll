import React from 'react'
import PropTypes from 'prop-types'
import * as AppData from '../../AppData'
import { ButtonPresenter } from './ButtonPresenter'
import ZoomInIcon from '@material-ui/icons/ZoomIn';

export const ZoomInButtonContainer = ({action, zoom}) => {
  return (
    <ButtonPresenter
      onClick={action}
      disabled={zoom === AppData.zoomMin}
    >
      <ZoomInIcon />
    </ButtonPresenter>
  )
}

ZoomInButtonContainer.propTypes = {
  action: PropTypes.func,
  zoom: PropTypes.number
}