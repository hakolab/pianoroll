import React from 'react'
import PropTypes from 'prop-types';
import { KeyboardPresenter } from './KeyboardPresenter';
import { KeyOctaveContainer } from '../key-octave/KeyOctaveContainer';

export const KeyboardContainer = ({mode, data, keyNotes}) => {

  const keyOctaveList = data.map((octaveObj, octaveIndex) => {
    return (
      <KeyOctaveContainer
        key={octaveObj.octave}
        octaveObject={octaveObj}
        octaveIndex={octaveIndex}
        keyNotes={keyNotes}
      />
    )
  })

  return (
    <KeyboardPresenter className={`keyboard ${mode}`}>
      {keyOctaveList}
    </KeyboardPresenter>
  )
}

KeyboardContainer.propTypes = {
  mode: PropTypes.string,
  data: PropTypes.array,
  keyNotes: PropTypes.array,
  controller: PropTypes.object,
};