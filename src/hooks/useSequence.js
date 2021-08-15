import { useState } from 'react'
import * as Tone from 'tone'

export function useSequence(){
  const [isPlaying, setIsPlaying] = useState(Tone.Transport.state === "started");

  const start = (callback, steps) => {
    const seq = new Tone.Sequence(callback, steps).start(0);

    Tone.Transport.start();
    setIsPlaying(Tone.Transport.state === "started");

    const dispose = () => {
      seq.dispose();
      Tone.Transport.off('stop', dispose)
    }

    Tone.Transport.on('stop', dispose)
  }

  const stop = () => {
    Tone.Transport.stop();
    setIsPlaying(Tone.Transport.state === "started");
  }

  /* const sequenceDispatcher = () => ({
    start,
    stop
  }) */

  return [
    isPlaying,
    {
      start,
      stop
    }
  ];

}