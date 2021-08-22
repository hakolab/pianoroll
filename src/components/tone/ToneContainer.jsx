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
        key={`${pitchName}${octave}:${noteIndex}`}
        octave={octave}
        octaveIndex={octaveIndex}
        toneIndex={toneIndex}
        noteIndex={noteIndex}
        pitchName={pitchName}
        active={note}
        current={currentStep === noteIndex}
      />
    )
  })

  return (
    <TonePresenter
      id={`tone:${pitchName}${octave}`}
      className={clsx('tone', keyType, pitchName)}
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