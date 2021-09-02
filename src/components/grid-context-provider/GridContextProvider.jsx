import React from 'react'
import PropTypes from 'prop-types';
import { CurrentStepContext, NotesContext } from '../../contexts/contexts';

export const GridContextProvider = ({currentStep, notes, children}) => {
  return (
      <CurrentStepContext.Provider value={currentStep}>
        <NotesContext.Provider value={notes}>
          {children}
        </NotesContext.Provider>
      </CurrentStepContext.Provider>
  )
}

GridContextProvider.propTypes = {
  currentStep: PropTypes.number,
  notes: PropTypes.array,
  children: PropTypes.node
}