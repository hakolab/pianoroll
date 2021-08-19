import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx'
import { NotePresenter } from './NotePresenter';
import { useContext } from 'react';
import { GridControllerContext } from '../../PianoRollApp';

export const NoteContainer = ({octaveObj, toneObj, octaveIndex, toneIndex, noteIndex, note, currentStep}) => {

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
        id={`note[${toneObj.pitchName}${octaveObj.octave}]:${noteIndex}`}
        key={`note[${toneObj.pitchName}${octaveObj.octave}]:${noteIndex}`}
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
  octaveObj: PropTypes.object,
  toneObj: PropTypes.object,
  octaveIndex: PropTypes.number,
  toneIndex: PropTypes.number,
  noteIndex: PropTypes.number,
  note: PropTypes.bool,
  currentStep: PropTypes.number,
  controller: PropTypes.object
}