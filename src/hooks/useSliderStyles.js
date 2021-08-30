import { makeStyles } from "@material-ui/core"

export const useSliderStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.primary.dark,
    lineHeight: "40px"
  },
  iconRotate: {
    transform: "rotate(90deg)"
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
  noSelect: {
    pointerEvents: 'none'
  }
}))