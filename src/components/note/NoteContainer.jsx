import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx'
import { NotePresenter } from './NotePresenter';
import { useContext } from 'react';
import { GridControllerContext } from '../../contexts/contexts';

export const NoteContainer = ({toneName, octaveIndex, toneIndex, noteIndex, note, currentStep}) => {

  const { toggleActivationOfNote } = useContext(GridControllerContext);

  function handleMouseDown(event, octave, row, col) {
    // 要素をドラッグしようとするのを防ぐ
    event.preventDefault();
    //controller.toggleActivationOfNote(octave, row, col);
    toggleActivationOfNote(octave, row, col);
  }

  function handleMouseEnter(event, octave, row, col) {
    // 左クリックされていなければ return
    if (event.buttons !== 1) {
      return;
    }

    event.preventDefault();
    //controller.toggleActivationOfNote(octave, row, col);
    toggleActivationOfNote(octave, row, col);
  }

  return (
    <NotePresenter
        id={`note[${toneName}]:${noteIndex}`}
        key={`note[${toneName}]:${noteIndex}`}
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
    ></NotePresenter>
  )
}

NoteContainer.propTypes = {
  toneName: PropTypes.string,
  octaveIndex: PropTypes.number,
  toneIndex: PropTypes.number,
  noteIndex: PropTypes.number,
  note: PropTypes.bool,
  currentStep: PropTypes.number,
  controller: PropTypes.object
}