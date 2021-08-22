import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx'
import { useContext } from 'react';
import { GridControllerContext } from '../../contexts/contexts';
import { NotePresenter } from './NotePresenter';

export const NoteContainer = React.memo(({octave, octaveIndex, toneIndex, pitchName, noteIndex, active, current}) => {

  const toggleActivationOfNote = useContext(GridControllerContext);

  function handleMouseDown(event){
    // 要素をドラッグしようとするのを防ぐ
    event.preventDefault();
    toggleActivationOfNote(octaveIndex, toneIndex, noteIndex);
  }

  function handleMouseEnter(event){
    // 左クリックされていなければ return
    if (event.buttons !== 1) {
      return;
    }

    event.preventDefault();
    toggleActivationOfNote(octaveIndex, toneIndex, noteIndex);
  }

  return (
    <NotePresenter
        id={`note[${pitchName}${octave}]:${noteIndex}`}
        className={clsx(
          'note',
          active && "active",
          current && 'now'
        )}
        octaveIndex={octaveIndex}
        toneIndex={toneIndex}
        noteIndex={noteIndex}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        pitchName={pitchName}
    />
  )
})

NoteContainer.propTypes = {
  octave: PropTypes.number,
  octaveIndex: PropTypes.number,
  toneIndex: PropTypes.number,
  pitchName: PropTypes.string,
  noteIndex: PropTypes.number,
  active: PropTypes.bool,
  current: PropTypes.bool,
  controller: PropTypes.func
}

NoteContainer.displayName = "NoteContainer"