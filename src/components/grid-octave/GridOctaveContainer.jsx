import React from 'react'
import PropTypes from 'prop-types';
import * as AppData from '../../AppData'
import clsx from 'clsx'
import { GridOctavePresenter } from './GridOctavePresenter';
import { ToneContainer } from '../tone/ToneContainer';

export const GridOctaveContainer = ({octaveObj, octaveIndex, notes, currentStep, controller}) => {

  var toneList = octaveObj.tones.map((toneObj, toneIndex) => {
    return (
      <ToneContainer
        id={`tone:${toneObj.pitchName}`}
        key={`tone:${toneObj.pitchName}`}
        octaveObj={octaveObj}
        toneObj={toneObj}
        octaveIndex={octaveIndex}
        toneIndex={toneIndex}
        notes={notes}
        currentStep={currentStep}
        controller={controller}
      >
      </ToneContainer>
    )
  })

  return (
    <GridOctavePresenter
      id={`octave:${octaveObj.octave}`}
      className={clsx("octave", AppData.getOctaveClassName(octaveObj.tones.length))}
    >
      {toneList}
    </GridOctavePresenter>
  )
}

GridOctaveContainer.propTypes = {
  octaveObj: PropTypes.object,
  octaveIndex: PropTypes.number,
  notes: PropTypes.array,
  currentStep: PropTypes.number,
  controller: PropTypes.object
}