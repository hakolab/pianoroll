import { useCallback, useReducer } from 'react'
import * as Tone from 'tone'
import * as AppData from '../AppData'
import { clone, copyArray, copy } from '../utils/recursiveCopy';
import { useSequence } from './useSequence';
import { useCssVariable } from './useCssVariable';
import { useToggle } from './useToggle'
import { useBpm } from './useBpm'
import { useRefWithCapturingCurrent } from './useRefWithCapturingCurrent';
import { usePianoRollTouch } from './usePianoRollTouch';

const initialState = {
  numberOfBars: 4,
  beat: clone(AppData.fourFour),
  noteCount: 32,
  keyboard: clone(AppData.oneOctave),
  notes: AppData.oneOctave.data.map(octaveObj => octaveObj.tones.map(() =>  new Array(32).fill(false))),
  keyNotes: AppData.oneOctave.data.map(octaveObj => octaveObj.tones.map(() => false)),
  steps: new Array(32).fill(null).map((_, i) => i),
  currentStep: null,
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
      const current = newNotes[action.payload.octave][action.payload.tone][action.payload.note];
      newNotes[action.payload.octave][action.payload.tone][action.payload.note] = !current;
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
    case "setCurrentStep": {
      return {...state, currentStep: action.payload}
    }
    default:

  }
}

const action = {
  changeNumberOfBars: (newNumberOfBars) => ({type: "changeNumberOfBars", payload: newNumberOfBars}),
  changeBeat: (newBeat) => ({type: "changeBeat", payload: newBeat}),
  changeKeyboard: (newKeyboard) => ({type: "changeKeyboard", payload: newKeyboard}),
  toggleActivationOfNote: (octave, tone, note) => ({type: "toggleActivationOfNote", payload: {octave, tone, note}}),
  clearAll: () => ({type: "clearAll"}),
  clearNotes: () => ({type: "clearNotes"}),
  toggleIsPress: (octave, tone, isPress) => ({type: "toggleIsPress", payload: {octave, tone, isPress}}),
  toggleAllIsPress: () => ({type: "toggleAllIsPress"}),
  setCurrentStep: (newCurrentStep) => ({type: "setCurrentStep", payload: newCurrentStep}),
}

export function usePianoRoll(){
  const [state, dispatch] = useReducer(reducer, initialState);
  // Sequencer
  const [isPlaying, sequenceDispatcher] = useSequence();
  // CSS変数操作（値は使わないので受け取らない）
  const [, cssVariableDispatcher] = useCssVariable('--base-octave-multiply-times', 3, AppData.zoomMin, AppData.zoomMax)
  // スクロールモード（スマホ用）
  const [scrollMode, toggleDispatcher] = useToggle(false);
  // テンポ
  const [bpm, setBpm] =useBpm();
  // notes の現在値を捕捉
  const refNotes = useRefWithCapturingCurrent(state.notes);

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
    dispatch(action.clearAll());
    cssVariableDispatcher.set(3)
    toggleDispatcher.set(false);
    setBpm(120);
  }

  const zoomIn = () => {
    cssVariableDispatcher.increment();
  }

  const zoomOut = () => {
    cssVariableDispatcher.decrement();
  }

  const toggleActivationOfNote = useCallback((octave, tone, note) => {
    dispatch(action.toggleActivationOfNote(octave, tone, note))
  }, [])

  const toggleIsPress = useCallback((octave, tone, isPress) => {
    dispatch(action.toggleIsPress(octave, tone, isPress))
  }, [])

  const toggleAllIsPress = useCallback(() => {
    dispatch(action.toggleAllIsPress())
  }, [])

  const changeNumberOfBars = (newNumberOfBars) => {
    dispatch(action.changeNumberOfBars(newNumberOfBars))
  }

  const changeBpm = (newBpm) => {
    setBpm(newBpm)
  }

  const changeKeyboard = (newKeyboard) => {
    dispatch(action.changeKeyboard(newKeyboard))
  }

  const changeBeat = (newBeat) => {
    dispatch(action.changeBeat(newBeat))
  }

  // スマホ用タッチイベント
  usePianoRollTouch({toggleActivationOfNote, toggleIsPress, toggleAllIsPress}, scrollMode);

  const getPlayNotes = (step) => {
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
      isPlaying,
      scrollMode,
      bpm
    },
    {
      start,
      stop,
      clearNotes,
      clearAll,
      zoomIn,
      zoomOut,
      toggleDispatcher,
      toggleActivationOfNote,
      toggleIsPress,
      toggleAllIsPress,
      changeNumberOfBars,
      changeBpm,
      changeKeyboard,
      changeBeat,
    }
  ]
}