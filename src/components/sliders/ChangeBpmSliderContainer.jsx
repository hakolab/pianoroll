import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx'
import { Grid } from '@material-ui/core';
import { useSliderStyles } from '../../hooks/useSliderStyles';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { SliderPresenter } from './SliderPresenter';

export const ChangeBpmSliderContainer = ({value, onChange, disabled = false}) => {
  const classes = useSliderStyles()

  const handleChange = (event, newValue) => {
    onChange(newValue)
  }
  return (
    <Grid container spacing={1} alignItems="center" className={classes.root}>
      <Grid item>
        <DirectionsWalkIcon
          className={clsx(classes.icon, disabled ? classes.disabled : '')}
        />
      </Grid>
      <Grid item xs>
        <SliderPresenter
          value={value}
          onChange={handleChange}
          min={40}
          max={200}
          disabled={disabled}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item>
        <DirectionsRunIcon
          className={clsx(classes.icon, disabled ? classes.disabled : '')}
        />
      </Grid>
    </Grid>
  )
}

ChangeBpmSliderContainer.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}