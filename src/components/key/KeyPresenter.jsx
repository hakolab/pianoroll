import React from 'react'
import PropTypes from 'prop-types';

export function KeyPresenter({
  id,
  className,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  onMouseOut,
  octaveIndex,
  toneIndex,
  pitchName
}){
  return (
    <div
      id={id}
      className={className}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseOut={onMouseOut}
      data-octave-index={octaveIndex}
      data-tone-index={toneIndex}
      data-element-type="key"
      data-pitch-name={pitchName}
    >
    </div>
  )
}

KeyPresenter.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseOut: PropTypes.func,
  octaveIndex: PropTypes.number,
  toneIndex: PropTypes.number,
  pitchName: PropTypes.string
};