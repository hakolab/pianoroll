import React from 'react'
import PropTypes from 'prop-types';
import { KeyboardControllerContext } from '../../contexts/contexts';

export const KeyboardContextProvider = ({controller, children}) => {
  return (
    <KeyboardControllerContext.Provider value={controller}>
        {children}
    </KeyboardControllerContext.Provider>
  )
}

KeyboardContextProvider.propTypes = {
  controller: PropTypes.object,
  children: PropTypes.node
}