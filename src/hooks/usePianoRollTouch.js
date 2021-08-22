import { useEffect, useCallback, useState, useReducer } from 'react'
import { useEventListener } from "./useEventListener";
import * as Tone from 'tone'

const initialState = {
  x: null,
  y: null,
  scrollTop: null,
  scrollLeft: null
}

function reducer(state, action){
  switch(action.type){
    case "capture": {
      return {
        ...state,
        x: action.payload.x,
        y: action.payload.y,
        scrollTop: action.payload.scrollTop,
        scrollLeft: action.payload.scrollLeft
      } 
    }
    default: 
  }
}

export function usePianoRollTouch({toggleActivationOfNote, toggleIsPress, toggleAllIsPress}, scrollMode){
  const [touchTargetId, setTouchTargetId] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleTouchStart = useCallback((event) => {
    // タッチ座標、スクロール基準位置を取得
    const pianoRoll = document.getElementById('piano-roll')
    dispatch({type: "capture", payload: {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
      scrollTop: pianoRoll.scrollTop,
      scrollLeft: pianoRoll.scrollLeft
    }})

    // タッチ座標の要素を取得
    const element = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY)
    // 鍵盤をタッチしたとき
    if(!scrollMode && element && element.dataset.elementType === 'key'){
      setTouchTargetId(element.id)
      event.preventDefault()
    }
  }, [scrollMode])

  const handleTouchEnd = useCallback(() => {
    setTouchTargetId(null)
  }, [])
  
  const handleTouchScroll = useCallback((event) => {
    if (!scrollMode) {
      return
    }
    // touchmove はプログラムで制御するので初めにイベント抑制
    event.preventDefault()

    // タッチ座標から要素を取得
    const element = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY)
    // セルまたは鍵盤だったらスクロール
    const pianoRoll = document.getElementById('piano-roll')
    if(element && (element.dataset.elementType === 'note' || element.dataset.elementType === 'key')){
      const newScrollTop = state.scrollTop + state.y - event.touches[0].clientY;
      const newScrollLeft = state.scrollLeft + state.x - event.touches[0].clientX;
      pianoRoll.scrollTop = newScrollTop < 0 ? 0 : newScrollTop;
      pianoRoll.scrollLeft = newScrollLeft < 0 ? 0 : newScrollLeft;
    }
  }, [state, scrollMode])

  const handleTouchMove = useCallback((event) => {
    // touchmove はプログラムで制御するので初めにイベント抑制
    event.preventDefault();
    if (scrollMode) {
      return
    }

    // タッチ座標から要素を取得
    const element = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY)
    // セルまたは鍵盤をタッチしたとき、touchTargetId を設定
    // それ以外は null
    if(element && (element.dataset.elementType === 'note' || element.dataset.elementType === 'key')){
      setTouchTargetId(element.id);
    } else {
      setTouchTargetId(null);
    }
  }, [scrollMode])

  useEventListener("touchstart", handleTouchStart, document, { passive: false });
  useEventListener("touchend", handleTouchEnd, document, { passive: false });
  useEventListener("touchmove", handleTouchScroll, document, { passive: false });
  useEventListener("touchmove", handleTouchMove, document, { passive: false });

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
}