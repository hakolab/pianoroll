import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { PlayButtonContainer } from './PlayButtonContainer'
import { StopButtonContainer } from './StopButtonContainer'

export const PlayStopButtonContainer = ({start, stop, isPlaying}) => {
  return (
    <Fragment>
      {
        isPlaying
        ? <StopButtonContainer
            isPlaying={isPlaying}
            action={stop}
          />
        : <PlayButtonContainer
            isPlaying={isPlaying}
            action={start}
          />
      }
    </Fragment>
  )
}

PlayStopButtonContainer.propTypes = {
  start: PropTypes.func,
  stop: PropTypes.func,
  isPlaying: PropTypes.bool
}