import React from 'react'
import PropTypes from 'prop-types';
import * as AppData from '../../AppData'
import clsx from 'clsx';
import { KeyOctavePresenter } from './KeyOctavePresenter'
import { KeyContainer } from '../key/KeyContainer';

export const KeyOctaveContainer = ({octaveObject, octaveIndex, keyNotes}) => {

  const keyList = octaveObject.tones.map((tone, toneIndex) => {
    return (
      <KeyContainer
        key={`key:${tone.pitchName}${octaveObject.octave}`}
        isPress={keyNotes[octaveIndex][toneIndex]}
        octave={octaveObject.octave}
        octaveIndex={octaveIndex}
        toneIndex={toneIndex}
        keyType={tone.keyType}
        pitchName={tone.pitchName}
      >
      </KeyContainer>
    )
  })

  return (
    <KeyOctavePresenter
      id={`key-octave:${octaveObject.octave}`}
      className={clsx("octave", AppData.getOctaveClassName(octaveObject.tones.length))}
    >
      {keyList}
    </KeyOctavePresenter>
  )
}

KeyOctaveContainer.propTypes = {
  octaveObject: PropTypes.object,
  octaveIndex: PropTypes.number,
  keyNotes: PropTypes.array
};