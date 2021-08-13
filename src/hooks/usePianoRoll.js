import { useEffect, useReducer, useRef } from 'react'
import * as Tone from 'tone'
import * as AppData from '../AppData'
import { clone, copyArray, copy } from '../utils/recursiveCopy';
import { useSequence } from './useSequence';
import { useCssVariable } from './useCssVariable';
import { useToggle } from './useToggle'

const initialState = {
  numberOfBars: 4,
  beat: clone(AppData.fourFour),
  noteCount: 32,
  keyboard: clone(AppData.oneOctave),
  notes: AppData.oneOctave.data.map(octaveObj => octaveObj.tones.map(() =>  new Array(32).fill(false))),
  keyNotes: AppData.oneOctave.data.map(octaveObj => octaveObj.tones.map(() => false)),
  bpm: 120,
  steps: new Array(32).fill(null).map((_, i) => i),
  currentStep: null,
  zoom: 3,
  scrollMode: false
}

function reducer(state, action){
  switch(action.type){
    case "changeNumberOfBars": {
      const newNoteCount = state.beat.numberOfNotesInBar * action.payload;
      const newSteps = new Array(newNoteCount).fill(null).map((_, i) => i);
      const newNotes = copyArray(state.notes, state.keyboard.data.map(octaveObj => octaveObj.tones.map(() =>  new Array(newNoteCount).fill(false))));
      return {
        ...state,
        numberOfBars: action.payload,
        noteCount: newNoteCount,
        notes: newNotes,
        steps: newSteps
      }
    }
    case "changeBeat": {
      const newBeat = AppData.getBeat(action.payload);
      const newNoteCount = newBeat.numberOfNotesInBar * state.numberOfBars;
      const newSteps = new Array(newNoteCount).fill(null).map((_, i) => i);
      const newNotes = copyArray(state.notes, state.keyboard.data.map(octaveObj => octaveObj.tones.map(() =>  new Array(newNoteCount).fill(false))));
      return {
        ...state,
        beat: newBeat,
        noteCount: newNoteCount,
        notes: newNotes,
        steps: newSteps
      }
    }
    case "changeKeyboard": {
      const newKeyboard = AppData.getKeyboard(action.payload);
      const newNotes = copy(
        state.notes,
        newKeyboard.data.map(octaveObj => octaveObj.tones.map(() =>  new Array(state.noteCount).fill(false))),
        state.keyboard.data,
        newKeyboard.data)
      return {
        ...state,
        keyboard: newKeyboard,
        notes: newNotes,
        keyNotes: newKeyboard.data.map(octaveObj => octaveObj.tones.map(() => false))
      }
    }
    case "toggleActivationOfNote": {
      const newNotes = clone(state.notes);
      const current = newNotes[action.payload.octave][action.payload.row][action.payload.col];
      newNotes[action.payload.octave][action.payload.row][action.payload.col] = !current;
      return {...state, notes: newNotes}
    }
    case "clearAll": {
      return {...initialState}
    }
    case "clearNotes": {
      return {...state, notes: state.keyboard.data.map(octaveObj => octaveObj.tones.map(() =>  new Array(state.noteCount).fill(false)))}
    }
    case "toggleIsPress": {
      const newKeyNotes = state.keyboard.data.map(octaveObj => octaveObj.tones.map(() => false));
      newKeyNotes[action.payload.octave][action.payload.tone] = action.payload.isPress
      return {...state, keyNotes: newKeyNotes}
    }
    case "toggleAllIsPress": {
      return {...state, keyNotes: state.keyboard.data.map(octaveObj => octaveObj.tones.map(() => false))}
    }
    case "changeBpm": {
      return {...state, bpm: action.payload}
    }
    case "setCurrentStep": {
      return {...state, currentStep: action.payload}
    }
    /* case "toggleIsPlaying": {
      return {...state, isPlaying: action.payload}
    } */
    case "setScrollMode": {
      return {...state, scrollMode: action.payload}
    }
    default:

  }
}

const action = {
  changeNumberOfBars: (newNumberOfBars) => ({type: "changeNumberOfBars", payload: newNumberOfBars}),
  changeBeat: (newBeat) => ({type: "changeBeat", payload: newBeat}),
  changeKeyboard: (newKeyboard) => ({type: "changeKeyboard", payload: newKeyboard}),
  toggleActivationOfNote: (octave, row, col) => ({type: "toggleActivationOfNote", payload: {octave, row, col}}),
  clearAll: () => ({type: "clearAll"}),
  clearNotes: () => ({type: "clearNotes"}),
  toggleIsPress: (octave, tone, isPress) => ({type: "toggleIsPress", payload: {octave, tone, isPress}}),
  toggleAllIsPress: () => ({type: "toggleAllIsPress"}),
  changeBpm: (newBpm) => ({type: "changeBpm", payload: newBpm}),
  setCurrentStep: (newCurrentStep) => ({type: "setCurrentStep", payload: newCurrentStep}),
  //toggleIsPlaying: (newIsPlaying) => ({type: "toggleIsPlaying", payload: newIsPlaying}),
  setScrollMode: (newScrollMode) => ({type: "setScrollMode", payload: newScrollMode})
}

export function usePianoRoll(){
  const [state, dispatch] = useReducer(reducer, initialState);
  // Sequencer
  const [isPlaying, sequenceDispatcher] = useSequence();
  // CSS変数操作（値は使わないので受け取らない）
  const [, cssVariableDispatcher] = useCssVariable('--base-octave-multiply-times', state.zoom, AppData.zoomMin, AppData.zoomMax)
  // スクロールモード（スマホ用）
  const [scrollMode, toggleScrollMode] = useToggle(false);

  // notes の現在値を捕捉
  const refNotes = useRef(state.notes);
  useEffect(() => {
    refNotes.current = state.notes
  },[state.notes])

  // state.bpm の更新を Tone.Transport.bpm に反映
  useEffect(() => {
    Tone.Transport.bpm.value = state.bpm;
  }, [state.bpm])

  // transportState の更新を isPlaying に反映
  /* useEffect(() => {
    dispatch(action.toggleIsPlaying(transportState === "started"))
  }, [transportState]) */

  // ローカル scrollMode の更新を state.scrollMode に反映
  useEffect(() => {
    dispatch(action.setScrollMode(scrollMode));
  }, [scrollMode])

  const start = () => {
    const synth = new Tone.PolySynth().toDestination()
    sequenceDispatcher.start((time, step) => {
      const playNotes = getPlayNotes(step);
      synth.triggerAttackRelease(playNotes, "8t", time);
      dispatch(action.setCurrentStep(step));
    }, state.steps);
  }

  const stop = () => {
    sequenceDispatcher.stop();
    dispatch(action.setCurrentStep(null));
  }

  const clearNotes = () => {
    dispatch(action.clearNotes())
  }

  const clearAll = () => {
    dispatch(action.clearAll())
  }

  const zoomIn = () => {
    cssVariableDispatcher.increment();
  }

  const zoomOut = () => {
    cssVariableDispatcher.decrement();
  }

  const toggleActivationOfNote = (octave, row, col) => {
    dispatch(action.toggleActivationOfNote(octave, row, col))
  }

  const toggleIsPress = (octave, tone, isPress) => {
    dispatch(action.toggleIsPress(octave, tone, isPress))
  }

  const toggleAllIsPress = () => {
    dispatch(action.toggleAllIsPress())
  }

  const changeNumberOfBars = (newNumberOfBars) => {
    dispatch(action.changeNumberOfBars(newNumberOfBars))
  }

  const changeBpm = (newBpm) => {
    dispatch(action.changeBpm(newBpm))
  }

  function getPlayNotes(step) {
    let playNotes = [];
    refNotes.current.forEach((octave, octaveIndex) => {
      octave.forEach((tone, toneIndex) => {
        if(tone[step]){
          playNotes.push(`${state.keyboard.data[octaveIndex].tones[toneIndex].pitchName}${state.keyboard.data[octaveIndex].octave}`);
        }
      })
    });
    return playNotes;
  }
  
  return [
    {
      ...state,
      isPlaying
    },
    dispatch,
    {
      start,
      stop,
      clearNotes,
      clearAll,
      zoomIn,
      zoomOut,
      toggleScrollMode,
      toggleActivationOfNote,
      toggleIsPress,
      toggleAllIsPress,
      changeNumberOfBars,
      changeBpm,
    }
  ]
}