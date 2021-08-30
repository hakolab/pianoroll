import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx'
import { Grid } from '@material-ui/core';
import { useSliderStyles } from '../../hooks/useSliderStyles';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ReorderIcon from '@material-ui/icons/Reorder';
import { SliderContainer } from './SliderContainer';

export const ChangeNumberOfBarsSliderContainer = ({value, onChange, showLabel, disabled = false, isInfo = false}) => {
  const classes = useSliderStyles()

  return (
    <Grid container spacing={2} alignItems="center" className={classes.root}>
      <Grid item>
        <DragHandleIcon
          className={clsx(classes.icon, classes.iconRotate, disabled ? classes.disabled : '')}
        />
      </Grid>
      <Grid item xs>
        <SliderContainer
          value={value}
          onChange={onChange}
          min={2}
          max={16}
          disabled={disabled}
          showLabel={showLabel}
          optionalClass={clsx(isInfo && classes.noSelect)}
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
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool,
  isInfo: PropTypes.bool
}