import { makeStyles } from '@material-ui/core';
import { indigo, deepPurple, red, grey } from "@material-ui/core/colors";

export const useButtonStyles = makeStyles(theme => ({
  // https://material-ui.com/customization/globals/#globals
  common: {
    width: "100%",
    height: "40px",
    color: theme.palette.primary.dark,
  },
  iconButton: {
    fontSize: "16px",
  },
  textButton: {
    [theme.breakpoints.up('xs')]: {
      fontSize: "10px",
    },
    [theme.breakpoints.up('spLandscape')]: {
      fontSize: "12px",
    },
    [theme.breakpoints.up('pc')]: {
      fontSize: "14px",
    },
  },
  scrollOn: {
    backgroundColor: indigo[500],
    color: indigo[50]
  },
  keyboardOn: {
    backgroundColor: indigo[500],
    color: "white",
    '&:hover': {
      backgroundColor: indigo[300],
    }
  },
  keyboardOff: {
    backgroundColor: indigo[100],
    color: indigo[500],
    '&:hover': {
      backgroundColor: indigo[300],
    }
  },
  beatOn: {
    backgroundColor: deepPurple[500],
    color: "white",
    '&:hover': {
      backgroundColor: deepPurple[300],
    }
  },
  beatOff: {
    backgroundColor: deepPurple[100],
    color: deepPurple[500],
    '&:hover': {
      backgroundColor: deepPurple[300],
    }
  },
  dark: {
    color: theme.palette.primary.dark,
  },
  safeColor: {
    color: theme.palette.success.main
  },
  dangerColor: {
    color: theme.palette.error.main,
  },
  confirmButton: {
    width: "70px",
  },
  dangerButton: {
    width: "100px",
    color: theme.palette.error.main,
    border: "1px solid " + theme.palette.error.main, 
  },
  normalHover: {
    '&:hover': {
      backgroundColor: grey[100]
    }
  },
  dangerHover: {
    '&:hover': {
      border: "1px solid " + theme.palette.error.main, 
      color: theme.palette.error.main,
      backgroundColor: red[100],
    },
  }
}));