import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx'
import { KeyPresenter } from './KeyPresenter';

export function KeyContainer({isPress, octave, octaveIndex, toneIndex, keyType, pitchName}){

  return (
    <KeyPresenter
      id={`key:${pitchName}${octave}`}
      className={clsx(
        'key',
        keyType,
        pitchName,
        isPress && 'press')
      }
      octaveIndex={octaveIndex}
      toneIndex={toneIndex}
      toneName={`${pitchName}${octave}`}
    >
    </KeyPresenter>
  )
}

KeyContainer.propTypes = {
  isPress: PropTypes.bool,
  octave: PropTypes.number,
  octaveIndex: PropTypes.number,
  toneIndex: PropTypes.number,
  keyType: PropTypes.string,
  pitchName: PropTypes.string
};