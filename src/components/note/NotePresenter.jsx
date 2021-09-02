import React from 'react'
import PropTypes from 'prop-types';

export const NotePresenter = ({
  id,
  className,
  onMouseDown,
  onMouseEnter,
  octaveIndex,
  toneIndex,
  noteIndex,
  pitchName,
}) => {
  return (
    <div
        id={id}
        className={className}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        data-element-type="note"
        data-octave-index={octaveIndex}
        data-tone-index={toneIndex}
        data-note-index={noteIndex}
        data-pitch-name={pitchName}
    />
  )
}

NotePresenter.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  octaveIndex: PropTypes.number,
  toneIndex: PropTypes.number,
  noteIndex: PropTypes.number,
  pitchName: PropTypes.string
}