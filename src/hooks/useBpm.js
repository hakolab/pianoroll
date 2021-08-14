import { useState, useEffect } from "react";
import * as Tone from 'tone'

export function useBpm(){
  const [bpm, setBpm] = useState(Tone.Transport.bpm.value);

  // state.bpm の更新を Tone.Transport.bpm に反映
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm])

  return [bpm, setBpm]
}