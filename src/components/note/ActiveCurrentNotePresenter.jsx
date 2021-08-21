import React from 'react'
import PropTypes from 'prop-types';
import { NotePresenter } from './NotePresenter';

export const ActiveCurrentNotePresenter = ({id, octaveIndex, toneIndex, noteIndex, onMouseDown, onMouseEnter}) => {
  return (
    <NotePresenter
        id={id}
        className="active now"
        octaveIndex={octaveIndex}
        toneIndex={toneIndex}
        noteIndex={noteIndex}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
    ></NotePresenter>
  )
}

ActiveCurrentNotePresenter.propTypes = {
  id: PropTypes.string,
  octaveIndex: PropTypes.number,
  toneIndex: PropTypes.number,
  noteIndex: PropTypes.number,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func
}