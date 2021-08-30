import React from 'react'
import PropTypes from 'prop-types';
import { Slider } from '@material-ui/core'

export const SliderPresenter = ({value, onChange, onChangeCommitted, min, max, showLabel, optionalClass, disabled = false}) => {
  return (
    <Slider
      value={value}
      onChange={onChange}
      onChangeCommitted={onChangeCommitted}
      min={min}
      max={max}
      disabled={disabled}
      valueLabelDisplay={showLabel}
      className={optionalClass}
    />
  )
}

SliderPresenter.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  onChangeCommitted: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  showLabel: PropTypes.string,
  optionalClass: PropTypes.string,
}