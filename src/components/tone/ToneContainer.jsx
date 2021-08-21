import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx'
import { TonePresenter } from './TonePresenter';
import { NoteContainer } from '../note/NoteContainer';
import { useContext } from 'react';
import { CurrentStepContext, NotesContext } from '../../contexts/contexts';

export const ToneContainer = ({octave, octaveIndex, toneIndex, pitchName, keyType}) => {

  const notes = useContext(NotesContext);
  const currentStep = useContext(CurrentStepContext);

  const noteList = notes[octaveIndex][toneIndex].map((note, noteIndex) => {
    return (
      <NoteContainer
        key={`note[${pitchName}${octave}]:${noteIndex}`}
        octave={octave}
        octaveIndex={octaveIndex}
        pitchName={pitchName}
        toneIndex={toneIndex}
        noteIndex={noteIndex}
        note={note}
        currentStep={currentStep}
      ></NoteContainer>
    )
  })

  return (
    <TonePresenter
      id={`tone:${pitchName}`}
      className={clsx('row', keyType, pitchName)}
    >
      {noteList}
    </TonePresenter>
  )
}

ToneContainer.propTypes = {
  octave: PropTypes.number,
  octaveIndex: PropTypes.number,
  toneIndex: PropTypes.number,
  pitchName: PropTypes.string,
  keyType: PropTypes.string
}