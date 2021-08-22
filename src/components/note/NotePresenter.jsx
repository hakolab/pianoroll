import React from 'react'
import PropTypes from 'prop-types';

export const NotePresenter = ({id, className, octaveIndex, toneIndex, noteIndex, onMouseDown, onMouseEnter, pitchName}) => {
  return (
    <div
        id={id}
        className={className}
        data-octave-index={octaveIndex}
        data-tone-index={toneIndex}
        data-note-index={noteIndex}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        data-element-type="note"
        data-pitch-name={pitchName}
    />
  )
}

NotePresenter.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  octaveIndex: PropTypes.number,
  toneIndex: PropTypes.number,
  noteIndex: PropTypes.number,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  pitchName: PropTypes.string
}