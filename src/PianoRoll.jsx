import React, { useState, useReducer, useEffect } from "react";
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
import './styles.css'
import './styles.scss'
import { copy, copyArray, deepCopy, clone } from './recursiveCopy'
import ControlSlider from "./components/ControlSlider";
import { isMobile } from "react-device-detect";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlay, faStop, faEraser, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useButtonStyles } from "./hooks/useButtonStyles";
import AlertDialog from "./components/AlertDialog";
import clsx from 'clsx'

const initialState = {
  numberOfBars: 4,
  beat: clone(AppData.fourFour),
  noteCount: 32,
  keyboard: clone(AppData.oneOctave),
  notes: AppData.oneOctave.data.map(octaveObj => octaveObj.tones.map(_ =>  new Array(32).fill(false)))
}

function reducer(state, action){
  switch(action.type){
    case "changeNumberOfBars": {
      const newNoteCount = state.beat.numberOfNotesInBar * action.payload
      const newNotes = copyArray(state.notes, state.keyboard.data.map(octaveObj => octaveObj.tones.map(_ =>  new Array(newNoteCount).fill(false))))
      return {...state, numberOfBars: action.payload, noteCount: newNoteCount, notes: newNotes}
    }
    case "changeBeat": {
      const newBeat = AppData.getBeat(action.payload)
      const newNoteCount = newBeat.numberOfNotesInBar * state.numberOfBars
      const newNotes = copyArray(state.notes, state.keyboard.data.map(octaveObj => octaveObj.tones.map(_ =>  new Array(newNoteCount).fill(false))))
      return {...state, beat: newBeat, noteCount: newNoteCount, notes: newNotes}
    }
    case "changeKeyboard": {
      const newKeyboard = AppData.getKeyboard(action.payload);
      const toNotes = copy(
        state.notes,
        newKeyboard.data.map(octaveObj => octaveObj.tones.map(_ =>  new Array(state.noteCount).fill(false))),
        state.keyboard.data,
        newKeyboard.data)

      return {
        ...state,
        keyboard: newKeyboard,
        notes: toNotes
      }
    }
    case "toggleActivationOfNote": {
      const newNotes = deepCopy(state.notes);
      const current = newNotes[action.payload.octave][action.payload.row][action.payload.col];
      newNotes[action.payload.octave][action.payload.row][action.payload.col] = !current;
      return {...state}
    }
    case "clearConfig": {
      return {...initialState}
    }
    case "clearNotes": {
      return {...state, notes: state.keyboard.data.map(octaveObj => octaveObj.tones.map(_ =>  new Array(state.noteCount).fill(false)))}
    }
    default:

  }
}

export default function PianoRoll() {
  const [state, dispatch] = useReducer(reducer, initialState);

  /** state トランスポートの状態 started/stopped */
  const [transportState, setTransportState] = useState(Tone.Transport.state);
  /** state シーケンサーの現在値 */
  const [currentStep, setCurrentStep] = useState();
  /** シーケンサー配列 */
  const steps = new Array(state.noteCount).fill(null).map((_, i) => i);
  /** BPM */
  const [bpm, setBpm] = useState(Tone.Transport.bpm.value);
  /** スライダー操作中フラグ */
  const [isChanging, setIsChanging] = useState(false);
  
  const [baseOctaveMultiplyTimes, setBaseOctaveMultiplyTimes] = useState(3);

  function zoomOut(){
    setBaseOctaveMultiplyTimes(prevValue => {
      if (prevValue > 2) {
        return prevValue - 1
      }
      return prevValue
    })
  }

  function zoomIn(){
    setBaseOctaveMultiplyTimes(prevValue => {
      if (prevValue < 10) {
        return prevValue + 1
      }
      return prevValue
    })
  }

  useEffect(() => {
    document.documentElement.style.setProperty('--base-octave-multiply-times', baseOctaveMultiplyTimes);
  },[baseOctaveMultiplyTimes])

  const classes = useButtonStyles();

  function handleMouseDown(event, octave, row, col) {
    console.log('mouse')
    // 要素をドラッグしようとするのを防ぐ
    event.preventDefault();
    dispatch({type: "toggleActivationOfNote", payload: {octave, row, col}})
  }

  function handleMouseEnter(event, octave, row, col) {
    // 左クリックされていなければ return
    if (event.buttons !== 1) {
      return;
    }
    console.log('enter')
    // テンポ変更中のときは return
    if (isChanging) {
      return;
    }

    event.preventDefault();
    dispatch({type: "toggleActivationOfNote", payload: {octave, row, col}})
  }

  function toggle(){
    if(transportState === "started"){
      stop()
    }else{
      start()
    }
  }

  function start() {
    const synth = new Tone.PolySynth().toDestination()
    const seq = new Tone.Sequence((time, step) => {
      const playNotes = getPlayNotes(step);
      synth.triggerAttackRelease(playNotes, "8t", time);
      setCurrentStep(step);
    }, steps).start(0);

    Tone.Transport.start();
    setTransportState(Tone.Transport.state);

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
    setTransportState(Tone.Transport.state);
  }

  function getPlayNotes(step) {
    let playNotes = [];
    state.notes.forEach((octave, octaveIndex) => {
      octave.forEach((tone, toneIndex) => {
        if(tone[step]){
          playNotes.push(`${state.keyboard.data[octaveIndex].tones[toneIndex].pitchName}${state.keyboard.data[octaveIndex].octave}`);
        }
      })
    });
    return playNotes;
  }

  function handleChange(event, newValue) {
    setBpm(newValue);
    Tone.Transport.bpm.value = newValue;
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
    setBpm(120);
    setBaseOctaveMultiplyTimes(3);
    Tone.Transport.bpm.value = 120;
  }

  const [openDrawer, setOpenDrawer] = useState(false)
  function toggleDrawer(openDrawer){
    setOpenDrawer(openDrawer)
  }

  const [targetNoteId, setTargetNoteId] = useState(null)


  useEffect(() => {
    if(isMobile){
      window.addEventListener('touchstart', handleTouchStart, { passive: false })

      function handleTouchStart(event){
        const pageX = event.touches[0].pageX
        const pageY = event.touches[0].pageY
        const element = document.elementFromPoint(pageX,pageY)

        // 要素が取得できなかったら何もしない
        if(element === null){
          return
        }
        // セルがクリックされていたら音を更新して終了
        if(element.id.startsWith('note[')){
          setTargetNoteId(element.id)
          dispatch({type: "toggleActivationOfNote", payload: {octave: element.dataset.octave, row: element.dataset.tone, col: element.dataset.note}})
          console.log('start')

          function handleTouchMove(e){
            console.log('move')
            const pageX = e.touches[0].pageX
            const pageY = e.touches[0].pageY
            const element = document.elementFromPoint(pageX,pageY)
            if(element === null || element.id.startsWith('note[') === false){
              return
            }
            if(targetNoteId !== element.id){
              setTargetNoteId(element.id)
              dispatch({type: "toggleActivationOfNote", payload: {octave: element.dataset.octave, row: element.dataset.tone, col: element.dataset.note}})
            }
          }
  
          function handleTouchEnd(){
            console.log('end')
            window.removeEventListener('touchmove', handleTouchMove, { passive: false })
            window.removeEventListener('touchend', handleTouchEnd, { passive: false })
          }

          window.addEventListener('touchmove', handleTouchMove, { passive: false })
          window.addEventListener('touchend', handleTouchEnd, { passive: false })

          event.preventDefault()
        }
      }
    }
  },[])

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickNo = () => {
    setOpenDialog(false);
  };

  function handleClickOK(){
    clearAll()
    setOpenDialog(false)
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

  return (
    <div id="container">
      <Grid container id="header" className="controller" alignItems="center">
        <Grid item xs>
          <Box display="flex">
            <Box className="six-pieces">
              <Button variant="outlined" className={classes.common} onClick={toggle}>
                {
                  transportState === "started"
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
                onClick={clearNotes}
                disabled={transportState === "started"}
              >
                <FontAwesomeIcon icon={faEraser}/>
              </Button>
            </Box>
            <Box className="six-pieces">
              <Button
                id="clear-all"
                variant="outlined"
                className={clsx(classes.common, classes.dangerHover)}
                onClick={() => setOpenDialog(true)}
                disabled={transportState === "started"}
              >
                <FontAwesomeIcon icon={faTrashAlt}/>
              </Button>
            </Box>
            <Box className="six-pieces">
              <Button
                variant="outlined"
                className={classes.common}
                onClick={zoomOut}
                disabled={baseOctaveMultiplyTimes === 2}
              >
                <ZoomOutIcon />
              </Button>
            </Box>
            <Box className="six-pieces">
              <Button
                variant="outlined"
                className={classes.common}
                onClick={zoomIn}
                disabled={baseOctaveMultiplyTimes === 10}
              >
                <ZoomInIcon />
              </Button>
            </Box>
            <Box className="six-pieces">
              <Button
                variant="outlined"
                className={classes.common}
                onClick={() => toggleDrawer(true)}
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
                        <div
                          id={`key:${tone.pitchName}${octaveObj.octave}`}
                          key={`key:${tone.pitchName}${octaveObj.octave}`}
                          className={`${rowClassName} ${tone.pitchName}`}
                        >
                        </div>
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
      <AlertDialog
        open={openDialog}
        title={"ALL CLEAR"}
        text={"キーボードモード、拍子、小節数、テンポ、キーボードの大きさ、入力した音符をすべてクリアします。よろしいですか？"}
        confirm={true}
        onClickNo={handleClickNo}
        onClickOk={handleClickOK}
      />
      <Drawer
        anchor="top"
        open={openDrawer}
        onClose={() => toggleDrawer(false)}
      >
        <Grid container className="controller" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Box display="flex">
              <Box className="thirds">
                <Button
                  variant="outlined"
                  className={clsx(classes.common, state.keyboard.mode === AppData.oneOctave.mode ? classes.keyboardOn : classes.keyboardOff)}
                  onClick={() => dispatch({type: "changeKeyboard", payload: AppData.oneOctave.mode})}
                  disabled={transportState === "started"}
                >
                  {AppData.oneOctave.viewName}
                </Button>
              </Box>
              <Box className="thirds">
                <Button
                  variant="outlined"
                  className={clsx(classes.common, state.keyboard.mode === AppData.toyPiano.mode ? classes.keyboardOn : classes.keyboardOff)}
                  onClick={() => dispatch({type: "changeKeyboard", payload: AppData.toyPiano.mode})}
                  disabled={transportState === "started"}
                >
                  {AppData.toyPiano.viewName}
                </Button>
              </Box>
              <Box className="thirds">
                <Button variant="outlined"
                  className={clsx(classes.common, state.keyboard.mode === AppData.keyboard76.mode ? classes.keyboardOn : classes.keyboardOff)}
                  onClick={() => dispatch({type: "changeKeyboard", payload: AppData.keyboard76.mode})}
                  disabled={transportState === "started"}
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
                  disabled={transportState === "started"}
                >
                  {AppData.twoFour.viewName}
                </Button>
              </Box>
              <Box className="quarters">
                <Button
                  variant="outlined"
                  className={clsx(classes.common, state.beat.mode === AppData.threeFour.mode ? classes.beatOn : classes.beatOff)}
                  onClick={() => dispatch({type: "changeBeat", payload: AppData.threeFour.mode})}
                  disabled={transportState === "started"}
                >
                  {AppData.threeFour.viewName}
                </Button>
              </Box>
              <Box className="quarters">
                <Button
                  variant="outlined"
                  className={clsx(classes.common, state.beat.mode === AppData.fourFour.mode ? classes.beatOn : classes.beatOff)}
                  onClick={() => dispatch({type: "changeBeat", payload: AppData.fourFour.mode})}
                  disabled={transportState === "started"}
                >
                  {AppData.fourFour.viewName}
                </Button>
              </Box>
              <Box className="quarters">
                <Button
                  variant="outlined"
                  className={clsx(classes.common, state.beat.mode === AppData.sixEight.mode ? classes.beatOn : classes.beatOff)}
                  onClick={() => dispatch({type: "changeBeat", payload: AppData.sixEight.mode})}
                  disabled={transportState === "started"}
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
              onMouseDown={() => setIsChanging(true)}
              onChangeCommitted={() => setIsChanging(false)}
              disabled={transportState === "started"}
              iconRotate={true}
              IconLeft={DragHandleIcon}
              IconRight={ReorderIcon}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlSlider
              value={bpm}
              onChange={handleChange}
              min={40}
              max={200}
              onMouseDown={() => setIsChanging(true)}
              onChangeCommitted={() => setIsChanging(false)}
              disabled={false}
              valueLabelDisplay="auto"
              iconRotate={false}
              IconLeft={DirectionsWalkIcon}
              IconRight={DirectionsRunIcon}
            />
          </Grid>
          <Grid item xs={12}>
            <Box m={1} textAlign="center">
              <IconButton className={classes.dark} onClick={() => toggleDrawer(false)}>
                <ExpandLessIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
}