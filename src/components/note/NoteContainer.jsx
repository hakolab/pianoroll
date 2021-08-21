import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx'
import { useContext } from 'react';
import { GridControllerContext } from '../../contexts/contexts';
import { ActiveCurrentNotePresenter } from './ActiveCurrentNotePresenter';
import { ActiveNotePresenter } from './ActiveNotePresenter';
import { CurrentNotePresenter } from './CurrentNotePresenter';
import { NotePresenter } from './NotePresenter';

export const NoteContainer = ({octave, octaveIndex, toneIndex, pitchName, noteIndex, note, currentStep}) => {

  const { toggleActivationOfNote } = useContext(GridControllerContext);

  function handleMouseDown(event, octave, row, col) {
    // 要素をドラッグしようとするのを防ぐ
    event.preventDefault();
    toggleActivationOfNote(octave, row, col);
  }

  function handleMouseEnter(event, octave, row, col) {
    // 左クリックされていなければ return
    if (event.buttons !== 1) {
      return;
    }

    event.preventDefault();
    toggleActivationOfNote(octave, row, col);
  }

  const Note = note ? currentStep === noteIndex ? ActiveCurrentNotePresenter
                                                         : ActiveNotePresenter
                             : currentStep === noteIndex ? CurrentNotePresenter
                                                         : NotePresenter

  return (
    <Note
        id={`note[${pitchName}${octave}]:${noteIndex}`}
        className={clsx(
          note && "active",
          currentStep === noteIndex && 'now'
        )}
        octaveIndex={octaveIndex}
        toneIndex={toneIndex}
        noteIndex={noteIndex}
        onMouseDown={(event) =>
          handleMouseDown(event, octaveIndex, toneIndex, noteIndex)
        }
        onMouseEnter={(event) =>
          handleMouseEnter(event, octaveIndex, toneIndex, noteIndex)
        }
    ></Note>
  )
}

NoteContainer.propTypes = {
  octave: PropTypes.number,
  octaveIndex: PropTypes.number,
  toneIndex: PropTypes.number,
  pitchName: PropTypes.string,
  noteIndex: PropTypes.number,
  note: PropTypes.bool,
  currentStep: PropTypes.number,
  controller: PropTypes.object
}