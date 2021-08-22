import React from 'react'
import PropTypes from 'prop-types';
import { GridControllerContext, CurrentStepContext, NotesContext } from '../../contexts/contexts';

export const GridContextProvider = ({controller, currentStep, notes, children}) => {
  return (
    <GridControllerContext.Provider value={controller}>
      <CurrentStepContext.Provider value={currentStep}>
        <NotesContext.Provider value={notes}>
          {children}
        </NotesContext.Provider>
      </CurrentStepContext.Provider>
    </GridControllerContext.Provider>
  )
}

GridContextProvider.propTypes = {
  controller: PropTypes.func,
  currentStep: PropTypes.number,
  notes: PropTypes.array,
  children: PropTypes.node
}