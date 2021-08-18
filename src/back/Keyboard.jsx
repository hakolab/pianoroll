import React from 'react'
import PropTypes from 'prop-types';
import { OctaveContainer } from '../components/keyboard/octave/OctaveContainer';


const Keyboard = ({mode, data, keyNotes, controller}) => {

  const octaveList = data.map((octaveObj, octaveIndex) => {
    return (
      <OctaveContainer
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
    <div className={`keyboard ${mode}`}>
      {octaveList}
    </div>
  )
}

Keyboard.propTypes = {
  mode: PropTypes.string,
  data: PropTypes.array,
  keyNotes: PropTypes.array,
  controller: PropTypes.object,
};