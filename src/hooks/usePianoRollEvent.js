import { useEffect, useState } from 'react'
import * as Tone from 'tone'
import { useToggle } from './useToggle';
import { isMobile } from 'react-device-detect';
import { usePianoRollTouch } from './usePianoRollTouch';
import { usePianoRollMouse } from './usePianoRollMouse';

const getElementFromPoint = (event) => {
  if (event.touches) {
    return document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY)
  } else {
    return document.elementFromPoint(event.clientX, event.clientY)    
  }
}

export function usePianoRollEvent({toggleActivationOfNote, toggleIsPress, toggleAllIsPress}){
  // タッチモード（スマホ用）
  const [touchMode, touchModeDispatcher] = useToggle(isMobile);
  // スクロールモード（スマホ用）
  const [scrollMode, scrollModeDispatcher] = useToggle(false);

  const [touchTargetId, setTouchTargetId] = useState(null);

  const start = (event) => {
    // タッチ座標の要素を取得
    const element = getElementFromPoint(event)
    // セルまたは鍵盤をタッチしたとき、touchTargetId を設定
    if(element && (element.dataset.elementType === 'note' || element.dataset.elementType === 'key')){
      setTouchTargetId(element.id)
      event.preventDefault()
    }
  }

  const end = () => {
    setTouchTargetId(null)
  }

  const move = (event) => {
    // タッチ座標から要素を取得
    const element = getElementFromPoint(event)
    // セルまたは鍵盤をタッチしたとき、touchTargetId を設定
    // それ以外は null
    if(element && (element.dataset.elementType === 'note' || element.dataset.elementType === 'key')){
      setTouchTargetId(element.id);
    } else {
      setTouchTargetId(null);
    }
  }

  usePianoRollTouch(touchMode, scrollMode, {start, end, move});
  usePianoRollMouse(touchMode, scrollMode, {start, end, move});

  useEffect(() => {
    const element = document.getElementById(touchTargetId);
    if (element && element.dataset.elementType === 'note') {
      toggleActivationOfNote(element.dataset.octaveIndex, element.dataset.toneIndex, element.dataset.noteIndex);
    }
  }, [touchTargetId, toggleActivationOfNote])

  useEffect(() => {
    const element = document.getElementById(touchTargetId);
    let _synth;

    Tone.context.resume().then(() => {
      _synth = new Tone.Synth().toDestination();

      if (element && element.dataset.elementType === 'key') {
        toggleIsPress(element.dataset.octaveIndex, element.dataset.toneIndex, true)
        _synth.triggerAttack(element.dataset.toneName);
      } else if(!element) {
        toggleAllIsPress();
      }
    })
    
    return () => {
      Tone.context.resume().then(() => {
        _synth.triggerRelease();
        setTimeout(() => {
          _synth.dispose();
          _synth = null;
        }, _synth.get().envelope.sustain * 1000)
      })
    }
  }, [touchTargetId, toggleIsPress, toggleAllIsPress])

  return [{touchMode, scrollMode}, {touch: touchModeDispatcher, scroll: scrollModeDispatcher}]
}