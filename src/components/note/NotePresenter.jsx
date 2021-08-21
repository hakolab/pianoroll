import React from 'react'
import PropTypes from 'prop-types';

export const NotePresenter = ({id, className = '', octaveIndex, toneIndex, noteIndex, onMouseDown, onMouseEnter}) => {
  return (
    <div
        id={id}
        className={className}
        data-octave={octaveIndex}
        data-tone={toneIndex}
        data-note={noteIndex}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
    ></div>
  )
}

NotePresenter.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  octaveIndex: PropTypes.number,
  toneIndex: PropTypes.number,
  noteIndex: PropTypes.number,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func
}