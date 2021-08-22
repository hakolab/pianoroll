import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx'
import { KeyPresenter } from './KeyPresenter';
import { useKeySynth } from '../../hooks/useKeySynth'
import { KeyboardControllerContext } from '../../contexts/contexts';

export function KeyContainer({isPress, octave, octaveIndex, toneIndex, keyType, pitchName}){

  const { toggleIsPress } = useContext(KeyboardControllerContext);

  // マウス用キーボードシンセ（値は使わないので受け取らない）
  const [, setIsPlay] = useKeySynth(pitchName, octave)

  function handleMouseDown(event){
    // 要素をドラッグしようとするのを防ぐ
    event.preventDefault()
    setIsPlay(true)
    toggleIsPress(octaveIndex, toneIndex, true)
  }

  function handleMouseUp(){
    setIsPlay(false)
    toggleIsPress(octaveIndex, toneIndex, false)
  }

  function handleMouseEnter(event){
    // 左クリックされていなければ return
    if (event.buttons !== 1) {
      return;
    }
    setIsPlay(true)
    toggleIsPress(octaveIndex, toneIndex, true)
  }

  function handleMouseOut(event){
    // 左クリックされていなければ return
    if (event.buttons !== 1) {
      return;
    }
    setIsPlay(false)
    toggleIsPress(octaveIndex, toneIndex, false)
  }

  return (
    <KeyPresenter
      id={`key:${pitchName}${octave}`}
      className={clsx(
        'key',
        keyType,
        pitchName,
        isPress && "press")
      }
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseOut={handleMouseOut}
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