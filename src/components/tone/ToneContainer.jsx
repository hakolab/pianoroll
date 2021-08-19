import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx'
import { TonePresenter } from './TonePresenter';
import { NoteContainer } from '../note/NoteContainer';
import { useContext } from 'react';
import { CurrentStepContext, NotesContext } from '../../contexts/contexts';

export const ToneContainer = ({octaveObj, toneObj, octaveIndex, toneIndex}) => {

  const notes = useContext(NotesContext);
  const currentStep = useContext(CurrentStepContext);

  const noteList = notes[octaveIndex][toneIndex].map((note, noteIndex) => {
    return (
      <NoteContainer
        //id={`note[${toneObj.pitchName}${octaveObj.octave}]:${noteIndex}`}
        key={`note[${toneObj.pitchName}${octaveObj.octave}]:${noteIndex}`}
        octaveObj={octaveObj}
        toneObj={toneObj}
        octaveIndex={octaveIndex}
        toneIndex={toneIndex}
        noteIndex={noteIndex}
        note={note}
        currentStep={currentStep}
      ></NoteContainer>
    )
  })

  return (
    <TonePresenter
      id={`tone:${toneObj.pitchName}`}
      key={`tone:${toneObj.pitchName}`}
      className={clsx(
        'row',
        octaveObj.bKeyIndex.indexOf(toneIndex) >= 0 ? "b-key" : "w-key",
        toneObj.pitchName
      )}
    >
      {noteList}
    </TonePresenter>
  )
}

ToneContainer.propTypes = {
  octaveObj: PropTypes.object,
  toneObj: PropTypes.object,
  octaveIndex: PropTypes.number,
  toneIndex: PropTypes.number,
}