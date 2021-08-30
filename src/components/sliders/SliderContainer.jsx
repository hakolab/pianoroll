import React from 'react'
import PropTypes from 'prop-types';
import { SliderPresenter } from './SliderPresenter';

export const SliderContainer = ({value, onChange, min, max, disabled, showLabel, optionalClass}) => {
  const handleChange = (event, newValue) => {
    onChange(newValue)
  }

  return (
    <SliderPresenter
      value={value}
      onChange={handleChange}
      min={min}
      max={max}
      disabled={disabled}
      showLabel={showLabel ? 'on' : 'off'}
      optionalClass={optionalClass}
    /> 
  )
}

SliderContainer.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool,
  optionalClass: PropTypes.string
}