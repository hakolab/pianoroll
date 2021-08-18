import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx'
import { TonePresenter } from './TonePresenter';
import { NoteContainer } from '../note/NoteContainer';

export const ToneContainer = ({octaveObj, toneObj, octaveIndex, toneIndex, notes, currentStep, controller}) => {

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
        controller={controller}
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
  notes: PropTypes.array,
  currentStep: PropTypes.number,
  controller: PropTypes.object,
}