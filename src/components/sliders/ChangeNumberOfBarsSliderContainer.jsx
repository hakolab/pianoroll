import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx'
import { Grid } from '@material-ui/core';
import { useSliderStyles } from '../../hooks/useSliderStyles';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ReorderIcon from '@material-ui/icons/Reorder';
import { SliderPresenter } from './SliderPresenter';

export const ChangeNumberOfBarsSliderContainer = ({value, onChange, disabled = false}) => {
  const classes = useSliderStyles()

  const handleChange = (event, newValue) => {
    onChange(newValue)
  } 
  return (
    <Grid container spacing={1} alignItems="center" className={classes.root}>
      <Grid item>
        <DragHandleIcon
          className={clsx(classes.icon, classes.iconRotate, disabled ? classes.disabled : '')}
        />
      </Grid>
      <Grid item xs>
        <SliderPresenter
          value={value}
          onChange={handleChange}
          min={2}
          max={16}
          disabled={disabled}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item>
        <ReorderIcon
          className={clsx(classes.icon, classes.iconRotate, disabled ? classes.disabled : '')}
        />
      </Grid>
    </Grid>
  )
}

ChangeNumberOfBarsSliderContainer.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}