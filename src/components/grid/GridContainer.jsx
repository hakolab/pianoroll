import React from 'react'
import PropTypes from 'prop-types';
import { GridPresenter } from './GridPresenter';
import { GridOctaveContainer } from '../grid-octave/GridOctaveContainer';

export const GridContainer = ({beat, keyboard}) => {

  var octaveList = keyboard.data.map((octaveObject, octaveIndex) => {
    return (
      <GridOctaveContainer
        key={`octave:${octaveObject.octave}`}
        octave ={octaveObject.octave}
        octaveIndex={octaveIndex}
        tones={octaveObject.tones}
      />
    )
  })

  return (
    <GridPresenter className={`grid ${beat.mode}`}>
      {octaveList}
    </GridPresenter>
  )
}

GridContainer.propTypes = {
  beat: PropTypes.object,
  keyboard: PropTypes.object
}