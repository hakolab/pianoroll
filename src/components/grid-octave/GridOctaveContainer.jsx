import React from 'react'
import PropTypes from 'prop-types';
import * as AppData from '../../AppData'
import clsx from 'clsx'
import { GridOctavePresenter } from './GridOctavePresenter';
import { ToneContainer } from '../tone/ToneContainer';

export const GridOctaveContainer = ({octave, tones, octaveIndex}) => {

  var toneList = tones.map((toneObject, toneIndex) => {
    return (
      <ToneContainer
        key={`tone:${toneObject.pitchName}`}
        octave={octave}
        octaveIndex={octaveIndex}
        toneIndex={toneIndex}
        pitchName={toneObject.pitchName}
        keyType={toneObject.keyType}
      >
      </ToneContainer>
    )
  })

  return (
    <GridOctavePresenter
      id={`octave:${octave}`}
      className={clsx("octave", AppData.getOctaveClassName(tones.length))}
    >
      {toneList}
    </GridOctavePresenter>
  )
}

GridOctaveContainer.propTypes = {
  octave: PropTypes.number,
  octaveIndex: PropTypes.number,
  tones: PropTypes.array
}