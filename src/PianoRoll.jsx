import React, { useState, useReducer, useEffect, useRef } from "react";
import * as Tone from "tone";
import { Grid, Box, Button, Drawer, IconButton } from "@material-ui/core";
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ReorderIcon from '@material-ui/icons/Reorder';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import * as AppData from "./AppData";
import './styles.scss'
import { copy, copyArray, clone } from './utils/recursiveCopy'
import ControlSlider from "./components/ControlSlider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlay, faStop, faEraser, faTrashAlt, faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import { useButtonStyles } from "./hooks/useButtonStyles";
import AlertDialog from "./components/AlertDialog";
import ConfirmDialog from "./components/ConfirmDialog";
import clsx from 'clsx'
import Key from './components/Key'
import { useCssVariable } from "./hooks/useCssVariable";

import { isMobile } from 'react-device-detect'
import { useToggle } from "./hooks/useToggle";
//import { useConfirmDialogState } from "./hooks/useConfirmDialogState";
import { useDialogState } from "./hooks/useDialogState";

const initialState = {
  numberOfBars: 4,
  beat: clone(AppData.fourFour),
  noteCount: 32,
  keyboard: clone(AppData.oneOctave),
  notes: AppData.oneOctave.data.map(octaveObj => octaveObj.tones.map(() =>  new Array(32).fill(false))),
  keyNotes: AppData.oneOctave.data.map(octaveObj => octaveObj.tones.map(() => false)),
  steps: new Array(32).fill(null).map((_, i) => i),
  bpm: 120
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
    case "clearConfig": {
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
    default:

  }
}

export default function PianoRoll() {
  const [state, dispatch] = useReducer(reducer, initialState);
  //console.log("state")
  //console.log(state)

  /** state トランスポートの状態 started/stopped */
  const [transportState, toggleTransportState] = useToggle(Tone.Transport.state === "started");
  /** state シーケンサーの現在値 */
  const [currentStep, setCurrentStep] = useState(null);
  // スクロールモード（スマホ用）
  const [scrollMode, toggleScrollMode] = useToggle(false);
  // Resume確認
  const [isOpenConfirmResume, confirmResumeDispatcher] = useDialogState(true);
  // clear確認
  const [isOpenConfirmClear, confirmClearDispatcher] = useDialogState(false);
  // allClear確認
  const [isOpenConfirmAllClear, confirmAllClearDispatcher] = useDialogState(false);
  // 設定ドロワー
  const [isOpenDrawer, drawerDispatcher] = useDialogState(false);

  // CSS変数操作（値は使わないので受け取らない）
  const [, cssVariableDispatcher] = useCssVariable('--base-octave-multiply-times', 3, 2, 10)

  const classes = useButtonStyles();

  function handleMouseDown(event, octave, row, col) {
    // 要素をドラッグしようとするのを防ぐ
    event.preventDefault();
    dispatch({type: "toggleActivationOfNote", payload: {octave, row, col}})
  }

  function handleMouseEnter(event, octave, row, col) {
    // 左クリックされていなければ return
    if (event.buttons !== 1) {
      return;
    }

    event.preventDefault();
    dispatch({type: "toggleActivationOfNote", payload: {octave, row, col}})
  }

  const refNotes = useRef(state.notes);
  useEffect(() => {
    refNotes.current = state.notes
  },[state.notes])

  function start() {
    const synth = new Tone.PolySynth().toDestination()
    const seq = new Tone.Sequence((time, step) => {
      const playNotes = getPlayNotes(step);
      synth.triggerAttackRelease(playNotes, "8t", time);
      setCurrentStep(step);
    }, state.steps).start(0);

    Tone.Transport.start();
    toggleTransportState(Tone.Transport.state === "started");

    function dispose() {
      console.log('dispose')
      seq.dispose();
      Tone.Transport.off('stop', dispose)
    }

    Tone.Transport.on('stop', dispose)
  }

  function stop() {
    Tone.Transport.stop();
    setCurrentStep(null);
    toggleTransportState(Tone.Transport.state === "started");
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

  useEffect(() => {
    Tone.Transport.bpm.value = state.bpm;
  }, [state.bpm])

  function handleChange(event, newValue) {
    dispatch({type: "changeBpm", payload: newValue})
  }

  function handleChangeBars(event, newValue) {
    dispatch({type: "changeNumberOfBars", payload: newValue})
  }

  function clearNotes() {
    stop();
    dispatch({type: "clearNotes"})
  }

  function clearAll() {
    dispatch({type: "clearConfig"})
    clearNotes();
    dispatch({type: "changeBpm", payload: 120})
    cssVariableDispatcher.set(3);
    toggleScrollMode(false);
  }

  function handleClickResumeOk(){
    Tone.context.resume().then(() => {
      confirmResumeDispatcher.close();
    })
  }

  function getOctaveClassName(length){
    switch(length){
      case 1:
        return "key-1"
      case 7:
        return "key-7"
      case 8:
        return "key-8"
      case 12:
        return "key-12"
      default:
        return ""
    }
  }

  const [touchTargetId, setTouchTargetId] = useState(null);

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    if (scrollMode) {
      window.addEventListener('touchmove', handleTouchScroll, { passive: false })
    } else {
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
    }

    const pianoRoll = document.getElementById('piano-roll')
    let x = null;
    let y = null;
    let scrollTop = null;
    let scrollLeft = null;

    function handleTouchStart(event){
      window.addEventListener('touchend', handleTouchEnd, { passive: false })

      // タッチ座標、スクロール基準位置を取得
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
      scrollTop = document.getElementById('piano-roll').scrollTop
      scrollLeft = document.getElementById('piano-roll').scrollLeft

      // 鍵盤をタッチしたとき
      const element = document.elementFromPoint(x,y)
      if(!scrollMode && element && element.id.startsWith('key:')){
        setTouchTargetId(element.id)
        event.preventDefault()
      }
    }

    function handleTouchScroll(event){
      const clientX = event.touches[0].clientX
      const clientY = event.touches[0].clientY
      event.preventDefault()
      // タッチ座標から要素を取得
      const element = document.elementFromPoint(clientX, clientY);
      // セルまたは鍵盤だったらスクロール
      if(element && (element.id.startsWith('note[') === true || element.id.startsWith('key:') === true)){
        pianoRoll.scrollTop = scrollTop + y - clientY
        pianoRoll.scrollLeft = scrollLeft + x - clientX
      }
    }

    function handleTouchMove(event){
      const clientX = event.touches[0].clientX;
      const clientY = event.touches[0].clientY;
      event.preventDefault();
      // タッチ座標から要素を取得
      const element = document.elementFromPoint(clientX, clientY);
      // 要素が取得できなかった、またはセルでも鍵盤でもないとき
      if(element === null || (element.id.startsWith('note[') === false && element.id.startsWith('key:') === false)){
        setTouchTargetId(null);
        return
      }
      setTouchTargetId(element.id);
    }

    function handleTouchEnd(){
      setTouchTargetId(null)
    }

    return () => {
      window.removeEventListener('touchstart', handleTouchStart, { passive: false })
      window.removeEventListener('touchmove', handleTouchMove, { passive: false })
      window.removeEventListener('touchmove', handleTouchScroll, { passive: false })
      window.removeEventListener('touchend', handleTouchEnd, { passive: false })
    }
  },[scrollMode])

  useEffect(() => {
    const element = document.getElementById(touchTargetId);
    if (element && element.id.startsWith("note[")) {
      dispatch({type: "toggleActivationOfNote", payload: {octave: element.dataset.octave, row: element.dataset.tone, col: element.dataset.note}})
    }
  }, [touchTargetId])

  useEffect(() => {
    const element = document.getElementById(touchTargetId);
    let _synth;

    Tone.context.resume().then(() => {
      _synth = new Tone.Synth().toDestination();

      if (element && element.id.startsWith("key:")) {
        dispatch({type: "toggleIsPress", payload: {octave: element.dataset.octave, tone: element.dataset.tone, isPress: true}})
        _synth.triggerAttack(element.id.replace("key:", ""));
        
      } else if(!element) {
        dispatch({type: "toggleAllIsPress"})
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
  }, [touchTargetId])

  return (
    <div id="container">
      <Grid container id="header" className="controller" alignItems="center">
        <Grid item xs>
          <Box display="flex">
            <Box className="six-pieces">
              <Button
                variant="outlined"
                className={classes.common}
                onClick={transportState ? stop : start}>
                {
                  transportState
                    ? <FontAwesomeIcon icon={faStop}/>
                    : <FontAwesomeIcon icon={faPlay}/>
                }
              </Button>
            </Box>
            <Box className="six-pieces">
              <Button
                id="clear"
                variant="outlined"
                className={classes.common}
                onClick={confirmClearDispatcher.open}
                disabled={transportState}
              >
                <FontAwesomeIcon icon={faEraser}/>
              </Button>
            </Box>
            <Box className="six-pieces">
              {
                isMobile &&
                <Button
                  id="scroll"
                  variant="outlined"
                  className={clsx(classes.common, scrollMode === true && classes.scrollOn)}
                  onClick={toggleScrollMode}
                >
                  <FontAwesomeIcon icon={faArrowsAlt}/>
                </Button>
              }
              {
                !isMobile &&
                <Button
                  id="clear-all"
                  variant="outlined"
                  className={clsx(classes.common, classes.dangerHover)}
                  onClick={confirmAllClearDispatcher.open}
                  disabled={transportState}
                >
                  <FontAwesomeIcon icon={faTrashAlt}/>
                </Button>
              }
            </Box>
            <Box className="six-pieces">
              <Button
                variant="outlined"
                className={classes.common}
                onClick={cssVariableDispatcher.decrement}
                disabled={cssVariableDispatcher.isMin()}
              >
                <ZoomOutIcon />
              </Button>
            </Box>
            <Box className="six-pieces">
              <Button
                variant="outlined"
                className={classes.common}
                onClick={cssVariableDispatcher.increment}
                disabled={cssVariableDispatcher.isMax()}
              >
                <ZoomInIcon />
              </Button>
            </Box>
            <Box className="six-pieces">
              <Button
                variant="outlined"
                className={classes.common}
                onClick={drawerDispatcher.open}
              >
                <FontAwesomeIcon icon={faCog}/>
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <div id="piano-roll">
        <div className={`keyboard ${state.keyboard.mode}`}>
          {
            state.keyboard.data.map((octaveObj, octaveIndex) => {
              return (
                <div id={`octave:${octaveObj.octave}`} key={`octave:${octaveObj.octave}`} className={clsx("octave", getOctaveClassName(octaveObj.tones.length))}>
                  {
                    octaveObj.tones.map((tone, toneIndex) => {
                      let rowClassName = octaveObj.bKeyIndex.indexOf(toneIndex) >= 0 ? "black-key" : "white-key";
                      // 最高音域の場合は .top を設定
                      if(octaveIndex === 0){
                        rowClassName += ' top'
                      }
                      // 最低音域の場合は、 .bottom を設定
                      if((state.keyboard.data.length - 1) === octaveIndex){
                        rowClassName += ' bottom'
                      }
                      return (
                        <Key
                          key={`key:${tone.pitchName}${octaveObj.octave}`}
                          className={clsx(rowClassName, tone.pitchName)}
                          pitchName={`${tone.pitchName}${octaveObj.octave}`}
                          isPress={state.keyNotes[octaveIndex][toneIndex]}
                          onPress={() => dispatch({ type: "toggleIsPress", payload: { octave: octaveIndex, tone: toneIndex, isPress: true}})}
                          onRelease={() => dispatch({ type: "toggleIsPress", payload: { octave: octaveIndex, tone: toneIndex, isPress: false}})}
                          octaveIndex={octaveIndex}
                          toneIndex={toneIndex}
                        >
                        </Key>
                      )
                    })
                  }
                </div>
              )
            })
          }

        </div>
        <div id="grid-roll" className={`grid ${state.beat.mode}`}>
          {
            state.keyboard.data.map((octaveObj, octaveIndex) => {
              return (
                <div id={`octave:${octaveObj.octave}`} key={`octave:${octaveObj.octave}`} className={clsx("octave", getOctaveClassName(octaveObj.tones.length))}>
                  {
                    octaveObj.tones.map((tone, toneIndex) => {
                      let rowClassName =octaveObj.bKeyIndex.indexOf(toneIndex) >= 0 ? "b-key" : "w-key";
                      return (
                        <div id={`tone:${tone.pitchName}`} key={`tone:${tone.pitchName}`} className={`row ${rowClassName} ${tone.pitchName}`}>
                          {
                            state.notes[octaveIndex][toneIndex].map((note, noteIndex) => {
                              // 選択されているか
                              let cellClassName = note ? "active" : "";
                              // シーケンサーがいまのステップか
                              if (currentStep === noteIndex) {
                                cellClassName = cellClassName + " now";
                              }
                              return (
                                <div
                                  id={`note[${tone.pitchName}${octaveObj.octave}]:${noteIndex}`}
                                  key={`note[${tone.pitchName}${octaveObj.octave}]:${noteIndex}`}
                                  data-octave={octaveIndex}
                                  data-tone={toneIndex}
                                  data-note={noteIndex}
                                  onMouseDown={(event) =>
                                    handleMouseDown(event, octaveIndex, toneIndex, noteIndex)
                                  }
                                  onMouseEnter={(event) =>
                                    handleMouseEnter(event, octaveIndex, toneIndex, noteIndex)
                                  }
                                  className={cellClassName}
                                ></div>
                              )
                            })
                          }
                        </div>
                      )
                    })
                  }
                </div>  
              )
            })
          }
        </div>
      </div>
      <ConfirmDialog
        open={isOpenConfirmClear}
        title={"CLEAR"}
        text={"入力した音符をすべてクリアします。よろしいですか？"}
        onClose={confirmClearDispatcher.close}
        onClickOk={clearNotes}
      />
      <ConfirmDialog
        open={isOpenConfirmAllClear}
        title={"ALL CLEAR"}
        text={"キーボードモード、拍子、小節数、入力した音符などをすべてクリアします。よろしいですか？"}
        onClose={confirmAllClearDispatcher.close}
        onClickOk={clearAll}
      />
      <Drawer
        anchor="top"
        open={isOpenDrawer}
        onClose={drawerDispatcher.close}
      >
        <Grid container className="controller" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Box display="flex">
              <Box className="thirds">
                <Button
                  variant="outlined"
                  className={clsx(classes.common, state.keyboard.mode === AppData.oneOctave.mode ? classes.keyboardOn : classes.keyboardOff)}
                  onClick={() => dispatch({type: "changeKeyboard", payload: AppData.oneOctave.mode})}
                  disabled={transportState}
                >
                  {AppData.oneOctave.viewName}
                </Button>
              </Box>
              <Box className="thirds">
                <Button
                  variant="outlined"
                  className={clsx(classes.common, state.keyboard.mode === AppData.toyPiano.mode ? classes.keyboardOn : classes.keyboardOff)}
                  onClick={() => dispatch({type: "changeKeyboard", payload: AppData.toyPiano.mode})}
                  disabled={transportState}
                >
                  {AppData.toyPiano.viewName}
                </Button>
              </Box>
              <Box className="thirds">
                <Button variant="outlined"
                  className={clsx(classes.common, state.keyboard.mode === AppData.keyboard76.mode ? classes.keyboardOn : classes.keyboardOff)}
                  onClick={() => dispatch({type: "changeKeyboard", payload: AppData.keyboard76.mode})}
                  disabled={transportState}
                >
                  {AppData.keyboard76.viewName}
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex">
              <Box className="quarters">
                <Button
                  variant="outlined"
                  className={clsx(classes.common, state.beat.mode === AppData.twoFour.mode ? classes.beatOn : classes.beatOff)}
                  onClick={() => dispatch({type: "changeBeat", payload: AppData.twoFour.mode})}
                  disabled={transportState}
                >
                  {AppData.twoFour.viewName}
                </Button>
              </Box>
              <Box className="quarters">
                <Button
                  variant="outlined"
                  className={clsx(classes.common, state.beat.mode === AppData.threeFour.mode ? classes.beatOn : classes.beatOff)}
                  onClick={() => dispatch({type: "changeBeat", payload: AppData.threeFour.mode})}
                  disabled={transportState}
                >
                  {AppData.threeFour.viewName}
                </Button>
              </Box>
              <Box className="quarters">
                <Button
                  variant="outlined"
                  className={clsx(classes.common, state.beat.mode === AppData.fourFour.mode ? classes.beatOn : classes.beatOff)}
                  onClick={() => dispatch({type: "changeBeat", payload: AppData.fourFour.mode})}
                  disabled={transportState}
                >
                  {AppData.fourFour.viewName}
                </Button>
              </Box>
              <Box className="quarters">
                <Button
                  variant="outlined"
                  className={clsx(classes.common, state.beat.mode === AppData.sixEight.mode ? classes.beatOn : classes.beatOff)}
                  onClick={() => dispatch({type: "changeBeat", payload: AppData.sixEight.mode})}
                  disabled={transportState}
                >
                  {AppData.sixEight.viewName}
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlSlider
              value={state.numberOfBars}
              onChange={handleChangeBars}
              min={2}
              max={16}
              disabled={transportState}
              iconRotate={true}
              IconLeft={DragHandleIcon}
              IconRight={ReorderIcon}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlSlider
              value={state.bpm}
              onChange={handleChange}
              min={40}
              max={200}
              disabled={false}
              valueLabelDisplay="auto"
              iconRotate={false}
              IconLeft={DirectionsWalkIcon}
              IconRight={DirectionsRunIcon}
            />
          </Grid>
          {
            isMobile &&
            <Grid item xs={12}>
              <Box m={1} textAlign="center">
                <Button
                  id="clear-all"
                  variant="outlined"
                  className={clsx(classes.common, classes.dangerButton, classes.dangerHover)}
                  onClick={confirmAllClearDispatcher.open}
                  disabled={transportState}
                >
                  <FontAwesomeIcon icon={faTrashAlt}/>
                </Button>
              </Box>
            </Grid>
          }
          <Grid item xs={12}>
            <Box m={1} textAlign="center">
              <IconButton className={classes.dark} onClick={drawerDispatcher.close}>
                <ExpandLessIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Drawer>
      <AlertDialog
        open={isOpenConfirmResume}
        title={"NOTIFICATION"}
        text={"PianoRoll は音が鳴ります！"}
        onClose={handleClickResumeOk}
      />
    </div>
  );
}