import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx'
import { NotePresenter } from './NotePresenter';

export const NoteContainer = React.memo(({
  octave,
  octaveIndex,
  toneIndex,
  noteIndex,
  pitchName,
  active,
  current
}) => {

  return (
    <NotePresenter
        id={`note[${pitchName}${octave}]:${noteIndex}`}
        className={clsx(
          'note',
          active && 'active',
          current && 'now'
        )}
        octaveIndex={octaveIndex}
        toneIndex={toneIndex}
        noteIndex={noteIndex}
        pitchName={pitchName}
    />
  )
})

NoteContainer.propTypes = {
  octave: PropTypes.number,
  octaveIndex: PropTypes.number,
  toneIndex: PropTypes.number,
  noteIndex: PropTypes.number,
  pitchName: PropTypes.string,
  active: PropTypes.bool,
  current: PropTypes.bool
}

NoteContainer.displayName = "NoteContainer"