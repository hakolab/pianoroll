import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx'
import { Grid } from '@material-ui/core';
import { useSliderStyles } from '../../hooks/useSliderStyles';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { SliderContainer } from './SliderContainer';

export const ChangeBpmSliderContainer = ({value, onChange, showLabel, disabled = false, isInfo = false}) => {
  const classes = useSliderStyles()

  return (
    <Grid container spacing={2} alignItems="center" className={classes.root}>
      <Grid item>
        <DirectionsWalkIcon
          className={clsx(classes.icon, disabled ? classes.disabled : '')}
        />
      </Grid>
      <Grid item xs>
        <SliderContainer
          value={value}
          onChange={onChange}
          min={40}
          max={200}
          disabled={disabled}
          showLabel={showLabel}
          optionalClass={clsx(isInfo && classes.noSelect)}
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
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool,
  isInfo: PropTypes.bool
}