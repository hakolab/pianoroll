import React from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        color: null,
        fontSize: null,
        width: "100%",
        height: "40px",
        borderRadius: "0",
        padding: "0",
        minWidth: "0"
      }
    }
  }
})

export const ThemeProvider = ({children}) => {
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node
}