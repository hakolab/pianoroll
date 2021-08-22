import { useState, useEffect } from 'react'
import * as Tone from 'tone'

export function useKeySynth(pitchName, octave){
  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    let keySynth = null;
    if (isPlay){
      Tone.context.resume().then(() => {
        keySynth = new Tone.Synth().toDestination();
        keySynth.triggerAttack(pitchName + octave);
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
  }, [isPlay, pitchName, octave])

  return [isPlay, setIsPlay]
}