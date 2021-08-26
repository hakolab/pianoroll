import React from 'react'
import PropTypes from 'prop-types'
import * as AppData from '../../AppData'
import { ButtonPresenter } from './ButtonPresenter'
import ZoomOutIcon from '@material-ui/icons/ZoomOut';

export const ZoomOutButtonContainer = ({action, zoom}) => {
  return (
    <ButtonPresenter
      onClick={action}
      disabled={zoom === AppData.zoomMin}
    >
      <ZoomOutIcon />
    </ButtonPresenter>
  )
}

ZoomOutButtonContainer.propTypes = {
  action: PropTypes.func,
  zoom: PropTypes.number
}