import { makeStyles } from '@material-ui/core';
import { indigo, deepPurple, red } from "@material-ui/core/colors";

export const useButtonStyles = makeStyles(theme => ({
  common: {
    [theme.breakpoints.down('xs')]: {
      fontSize: "12px",
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: "14px",
    },
    width: "100%",
    height: "40px",
    color: theme.palette.primary.dark,
    borderRadius: "0",
    padding: "0",
    minWidth: "0"
  },
  scrollOn: {
    backgroundColor: indigo[500] +  " !important",
    color: indigo[50]
  },
  keyboardOn: {
    backgroundColor: indigo[500] +  " !important",
    color: "white",
    '&:hover': {
      backgroundColor: indigo[300],
    }
  },
  keyboardOff: {
    backgroundColor: indigo[100] +  " !important",
    color: indigo[500],
    '&:hover': {
      backgroundColor: indigo[300],
    }
  },
  beatOn: {
    backgroundColor: deepPurple[500] +  " !important",
    color: "white",
    '&:hover': {
      backgroundColor: deepPurple[300],
    }
  },
  beatOff: {
    backgroundColor: deepPurple[100] +  " !important",
    color: deepPurple[500],
    '&:hover': {
      backgroundColor: deepPurple[300],
    }
  },
  dark: {
    color: theme.palette.primary.dark,
  },
  ok: {
    color: theme.palette.success.main
  },
  dangerColor: {
    color: theme.palette.error.main,
  },
  dangerButton: {
    width: "100px",
    color: theme.palette.error.main,
    border: "1px solid " + theme.palette.error.main, 
  },
  dangerHover: {
    transition: theme.transitions.create(['color', 'border'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      border: "1px solid " + theme.palette.error.main, 
      color: theme.palette.error.main,
      backgroundColor: red[100],
    },
  }
}));