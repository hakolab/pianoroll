import React from 'react'
import PropTypes from 'prop-types';
import { Grid, makeStyles, Slider } from '@material-ui/core'
import { IOSSlider } from './IOSSlider'
import { isIOS } from 'react-device-detect'

const useSliderStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      height: "50px"
    },
    [theme.breakpoints.up('sm')]: {
      height: "60px"
    },
  },
  icon: {
    color: theme.palette.text.primary,
    height: "40px",
    lineHeight: "40px"
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
}))

ControlSlider.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  iconRotate: PropTypes.bool,
  IconLeft: PropTypes.object,
  IconRight: PropTypes.object
}

export default function ControlSlider({value, onChange, min, max, disabled, iconRotate, IconLeft, IconRight}){
  const classes = useSliderStyles()
  return (
    <Grid container spacing={1} alignItems="center" className={classes.root}>
      <Grid item>
        <IconLeft
          className={classes.icon, disabled ? classes.disabled : ''}
          style={iconRotate ? {transform: "rotate(90deg)"} : {}}
        />
      </Grid>
      <Grid item xs>
        {
          isIOS
          ? <IOSSlider
              value={value}
              onChange={onChange}
              min={min}
              max={max}
              disabled={disabled}
              valueLabelDisplay="auto"
            />
          : <Slider
              value={value}
              onChange={onChange}
              min={min}
              max={max}
              disabled={disabled}
              valueLabelDisplay="auto"
            />
        }
      </Grid>
      <Grid item>
        <IconRight
          className={classes.icon, disabled ? classes.disabled : ''}
          style={iconRotate ? {transform: "rotate(90deg)"} : {}}
          />
      </Grid>
    </Grid>
  )
}