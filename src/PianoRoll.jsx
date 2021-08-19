import React from 'react'
import PropTypes from 'prop-types';
import { KeyboardContainer } from './components/keyboard/KeyboardContainer';
import { GridContainer } from './components/grid/GridContainer'
import { createContext } from 'react';


export const CurrentStepContext = createContext();

const PianoRoll = ({state, controller}) => {

  return (
    <div id="piano-roll">
      <KeyboardContainer
        mode={state.keyboard.mode}
        data={state.keyboard.data}
        keyNotes={state.keyNotes}
        controller={{toggleIsPress: controller.toggleIsPress}}
      />
      <GridContainer
        beat={state.beat}
        keyboard={state.keyboard}
        notes={state.notes}
        currentStep={state.currentStep}
        controller={{toggleActivationOfNote: controller.toggleActivationOfNote}}
      />
    </div>
  )
}

PianoRoll.propTypes = {
  state: PropTypes.object,
  controller: PropTypes.object,
}

export default PianoRoll