import React from 'react'
import PropTypes from 'prop-types';
import { KeyboardPresenter } from './KeyboardPresenter';
import { KeyOctaveContainer } from '../key-octave/KeyOctaveContainer';

export const KeyboardContainer = ({mode, data, keyNotes, controller}) => {

  const octaveList = data.map((octaveObj, octaveIndex) => {
    return (
      <KeyOctaveContainer
        key={`octave:${octaveObj.octave}`}
        object={octaveObj}
        index={octaveIndex}
        keyNotes={keyNotes}
        controller={controller}
        dataLength={data.length}
      />
    )
  })

  return (
    <KeyboardPresenter className={`keyboard ${mode}`}>
      {octaveList}
    </KeyboardPresenter>
  )
}

KeyboardContainer.propTypes = {
  mode: PropTypes.string,
  data: PropTypes.array,
  keyNotes: PropTypes.array,
  controller: PropTypes.object,
};