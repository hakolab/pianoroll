import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import * as Tone from 'tone'
import clsx from 'clsx'

Key.propTypes = {
  className: PropTypes.string,
  pitchName: PropTypes.string,
  onPress: PropTypes.func,
  onRelease: PropTypes.func,
  isPress: PropTypes.bool,
  octaveIndex: PropTypes.number,
  toneIndex: PropTypes.number
};

export default function Key({className, pitchName, onPress, onRelease, isPress, octaveIndex, toneIndex}){

  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    let keySynth = null;
    if (isPlay){
      Tone.context.resume().then(() => {
        keySynth = new Tone.Synth().toDestination();
        keySynth.triggerAttack(pitchName);
      })
    }

    return () => {
      if (keySynth) {
        Tone.context.resume().then(() => {
          keySynth.triggerRelease();
          setTimeout(() => {
            keySynth.dispose();
            keySynth = null;
          }, keySynth.get().envelope.sustain * 1000)
        })
      }
    }
  }, [isPlay, pitchName])

  function handleMouseDown(){
    setIsPlay(true)
    onPress()
  }

  function handleMouseUp(){
    setIsPlay(false)
    onRelease()
  }

  function handleMouseEnter(event){
    // 左クリックされていなければ return
    if (event.buttons !== 1) {
      return;
    }
    setIsPlay(true)
    onPress()
  }

  function handleMouseOut(event){
    // 左クリックされていなければ return
    if (event.buttons !== 1) {
      return;
    }
    setIsPlay(false)
    onRelease()
  }

  return (
    <div
      id={`key:${pitchName}`}
      className={clsx(className, isPress && "press")}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseOut={handleMouseOut}
      data-octave={octaveIndex}
      data-tone={toneIndex}
    >
    </div>
  )
}