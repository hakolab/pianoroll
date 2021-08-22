import React from 'react'
import PropTypes from 'prop-types';
import * as AppData from '../../AppData'
import clsx from 'clsx'
import { ToneOctavePresenter } from './ToneOctavePresenter';
import { ToneContainer } from '../tone/ToneContainer';

export const ToneOctaveContainer = ({octave, octaveIndex, tones}) => {

  var toneList = tones.map((toneObject, toneIndex) => {
    return (
      <ToneContainer
        key={toneObject.pitchName}
        octave={octave}
        octaveIndex={octaveIndex}
        toneIndex={toneIndex}
        pitchName={toneObject.pitchName}
        keyType={toneObject.keyType}
      />
    )
  })

  return (
    <ToneOctavePresenter
      id={`tone-octave:${octave}`}
      className={clsx("octave", AppData.getOctaveClassName(tones.length))}
    >
      {toneList}
    </ToneOctavePresenter>
  )
}

ToneOctaveContainer.propTypes = {
  octave: PropTypes.number,
  octaveIndex: PropTypes.number,
  tones: PropTypes.array
}