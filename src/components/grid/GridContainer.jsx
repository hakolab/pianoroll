import React from 'react'
import PropTypes from 'prop-types';
import { GridPresenter } from './GridPresenter';
import { ToneOctaveContainer } from '../tone-octave/ToneOctaveContainer';

export const GridContainer = ({beat, keyboard}) => {

  var toneOctaveList = keyboard.data.map((octaveObject, octaveIndex) => {
    return (
      <ToneOctaveContainer
        key={octaveObject.octave}
        octave ={octaveObject.octave}
        octaveIndex={octaveIndex}
        tones={octaveObject.tones}
      />
    )
  })

  return (
    <GridPresenter className={`grid ${beat.mode}`}>
      {toneOctaveList}
    </GridPresenter>
  )
}

GridContainer.propTypes = {
  beat: PropTypes.object,
  keyboard: PropTypes.object
}