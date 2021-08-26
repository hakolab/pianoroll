import React from 'react'
import PropTypes from 'prop-types';
import { Slider as MuiSlider } from '@material-ui/core'
import { isIOS } from 'react-device-detect'
import { IOSSlider } from './IOSSlider';

export const SliderPresenter = ({value, onChange, min, max, disabled = false}) => {
  const Slider = isIOS ? IOSSlider : MuiSlider

  return (
    <Slider
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      disabled={disabled}
      valueLabelDisplay="auto"
    />
  )
}

SliderPresenter.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool
}