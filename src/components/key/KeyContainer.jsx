import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx'
import { KeyPresenter } from './KeyPresenter';
import { useKeySynth } from '../../hooks/useKeySynth'
import { KeyboardControllerContext } from '../../PianoRollApp';

export function KeyContainer({className, pitchName, isPress, octaveIndex, toneIndex}){

  const { toggleIsPress } = useContext(KeyboardControllerContext);

  // マウス用キーボードシンセ（値は使わないので受け取らない）
  const [, setIsPlay] = useKeySynth(pitchName)

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
      id={`key:${pitchName}`}
      className={clsx(className, isPress && "press")}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseOut={handleMouseOut}
      octaveIndex={octaveIndex}
      oneIndex={toneIndex}
    >
    </KeyPresenter>
  )
}

KeyContainer.propTypes = {
  className: PropTypes.string,
  pitchName: PropTypes.string,
  controller: PropTypes.object,
  isPress: PropTypes.bool,
  octaveIndex: PropTypes.number,
  toneIndex: PropTypes.number
};