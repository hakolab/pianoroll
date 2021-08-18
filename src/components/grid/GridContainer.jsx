import React from 'react'
import PropTypes from 'prop-types';
import { GridPresenter } from './GridPresenter';
import { GridOctaveContainer } from '../grid-octave/GridOctaveContainer';

export const GridContainer = ({beat, keyboard, notes, currentStep, controller}) => {

  var octaveList = keyboard.data.map((octaveObj, octaveIndex) => {
    return (
      <GridOctaveContainer
        key={`octave:${octaveObj.octave}`}
        octaveObj ={octaveObj}
        octaveIndex={octaveIndex}
        notes={notes}
        currentStep={currentStep}
        controller={controller}
      />
    )
  })

  return (
    <GridPresenter className={`grid ${beat.mode}`}>
      {octaveList}
    </GridPresenter>
  )
}

GridContainer.propTypes = {
  beat: PropTypes.object,
  keyboard: PropTypes.object,
  notes: PropTypes.array,
  currentStep: PropTypes.number,
  controller: PropTypes.object
}