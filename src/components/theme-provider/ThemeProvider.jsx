import React from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        color: null,
        fontSize: null,
        borderRadius: "0",
        padding: "0",
        minWidth: "0",
        '&:hover': {
          backgroundColor: null,
          '@media (hover: none)': {
            backgroundColor: null
          },
        }
      }
    }
  },
  breakpoints: {
    keys: [
      "xs",
      "spPortrait",
      "spLandscape",
      "sm",
      "md",
      "pc",
      "lg",
      "xl",
    ],
    values: {
      xs: 0,
      spPortrait: 320,
      spLandscape: 520,
      sm: 600,
      md: 960,
      pc: 960,
      lg: 1280,
      xl: 1920,
    },
  },
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