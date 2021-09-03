import React from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core'
import { indigo } from '@material-ui/core/colors'

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
    },
    MuiSlider: {
      valueLabel: {
        left: -4,
        top: 6,
        '& *': {
          background: "transparent",
          color: indigo[700],
        },
      },
      thumb: {
        width: "28px",
        height:"28px",
        marginTop: "-14px",
        marginLeft: "-14px",
        backgroundColor: "white",
        border: '2px solid currentColor',
        fontSize: "8px",
      }
    },
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

console.log(theme.typography.body2)
// 新しく作成したブレークポイントでフォントサイズを設定
theme.typography.body2 = {
  ...theme.typography.body2,
  fontSize: '0.8rem',
  [theme.breakpoints.up('pc')]: {
    fontSize: '0.875rem',
  },
};


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