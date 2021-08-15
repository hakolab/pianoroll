import React from "react";
import { usePianoRoll } from "./hooks/usePianoRoll";
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
import ControlSlider from "./components/ControlSlider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlay, faStop, faEraser, faTrashAlt, faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import { useButtonStyles } from "./hooks/useButtonStyles";
import AlertDialog from "./components/AlertDialog";
import ConfirmDialog from "./components/ConfirmDialog";
import clsx from 'clsx'
import Key from './components/Key'
import { isMobile } from 'react-device-detect'
import { useDialogState } from "./hooks/useDialogState";

export default function PianoRollApp() {
  const [state, controller] = usePianoRoll();
  //console.log("state in PianoRoll")
  //console.log(state)

  // Resume確認
  const [isOpenConfirmResume, confirmResumeDispatcher] = useDialogState(true);
  // clear確認
  const [isOpenConfirmClear, confirmClearDispatcher] = useDialogState(false);
  // allClear確認
  const [isOpenConfirmAllClear, confirmAllClearDispatcher] = useDialogState(false);
  // 設定ドロワー
  const [isOpenDrawer, drawerDispatcher] = useDialogState(false);

  const classes = useButtonStyles();

  function handleMouseDown(event, octave, row, col) {
    // 要素をドラッグしようとするのを防ぐ
    event.preventDefault();
    controller.toggleActivationOfNote(octave, row, col);
  }

  function handleMouseEnter(event, octave, row, col) {
    // 左クリックされていなければ return
    if (event.buttons !== 1) {
      return;
    }

    event.preventDefault();
    controller.toggleActivationOfNote(octave, row, col);
  }

  function start() {
    controller.start();
  }

  function stop() {
    controller.stop();
  }

  function clearNotes() {
    controller.clearNotes();
  }

  function clearAll() {
    controller.clearAll();
  }

  function handleClickResumeOk(){
    Tone.context.resume().then(() => {
      confirmResumeDispatcher.close();
    })
  }

  return (
    <div id="container">
      <Grid container id="header" className="controller" alignItems="center">
        <Grid item xs>
          <Box display="flex">
            <Box className="six-pieces">
              <Button
                variant="outlined"
                className={classes.common}
                onClick={state.isPlaying ? stop : start}>
                {
                  state.isPlaying
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
                disabled={state.isPlaying}
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
                  className={clsx(classes.common, state.scrollMode === true && classes.scrollOn)}
                  onClick={() => controller.toggleScrollMode()}
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
                  disabled={state.isPlaying}
                >
                  <FontAwesomeIcon icon={faTrashAlt}/>
                </Button>
              }
            </Box>
            <Box className="six-pieces">
              <Button
                variant="outlined"
                className={classes.common}
                onClick={controller.zoomOut}
                disabled={state.zoom === AppData.zoomMin}
              >
                <ZoomOutIcon />
              </Button>
            </Box>
            <Box className="six-pieces">
              <Button
                variant="outlined"
                className={classes.common}
                onClick={controller.zoomIn}
                disabled={state.zoom === AppData.zoomMax}
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
                <div id={`octave:${octaveObj.octave}`} key={`octave:${octaveObj.octave}`} className={clsx("octave", AppData.getOctaveClassName(octaveObj.tones.length))}>
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
                          onPress={() => controller.toggleIsPress(octaveIndex, toneIndex, true)}
                          onRelease={() => controller.toggleIsPress(octaveIndex, toneIndex, false)}
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
                <div id={`octave:${octaveObj.octave}`} key={`octave:${octaveObj.octave}`} className={clsx("octave", AppData.getOctaveClassName(octaveObj.tones.length))}>
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
                              if (state.currentStep === noteIndex) {
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
                  onClick={() => controller.changeKeyboard(AppData.oneOctave.mode)}
                  disabled={state.isPlaying}
                >
                  {AppData.oneOctave.viewName}
                </Button>
              </Box>
              <Box className="thirds">
                <Button
                  variant="outlined"
                  className={clsx(classes.common, state.keyboard.mode === AppData.toyPiano.mode ? classes.keyboardOn : classes.keyboardOff)}
                  onClick={() => controller.changeKeyboard(AppData.toyPiano.mode)}
                  disabled={state.isPlaying}
                >
                  {AppData.toyPiano.viewName}
                </Button>
              </Box>
              <Box className="thirds">
                <Button variant="outlined"
                  className={clsx(classes.common, state.keyboard.mode === AppData.keyboard76.mode ? classes.keyboardOn : classes.keyboardOff)}
                  onClick={() => controller.changeKeyboard(AppData.keyboard76.mode)}
                  disabled={state.isPlaying}
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
                  onClick={() => controller.changeBeat(AppData.twoFour.mode)}
                  disabled={state.isPlaying}
                >
                  {AppData.twoFour.viewName}
                </Button>
              </Box>
              <Box className="quarters">
                <Button
                  variant="outlined"
                  className={clsx(classes.common, state.beat.mode === AppData.threeFour.mode ? classes.beatOn : classes.beatOff)}
                  onClick={() => controller.changeBeat(AppData.threeFour.mode)}
                  disabled={state.isPlaying}
                >
                  {AppData.threeFour.viewName}
                </Button>
              </Box>
              <Box className="quarters">
                <Button
                  variant="outlined"
                  className={clsx(classes.common, state.beat.mode === AppData.fourFour.mode ? classes.beatOn : classes.beatOff)}
                  onClick={() => controller.changeBeat(AppData.fourFour.mode)}
                  disabled={state.isPlaying}
                >
                  {AppData.fourFour.viewName}
                </Button>
              </Box>
              <Box className="quarters">
                <Button
                  variant="outlined"
                  className={clsx(classes.common, state.beat.mode === AppData.sixEight.mode ? classes.beatOn : classes.beatOff)}
                  onClick={() => controller.changeBeat(AppData.sixEight.mode)}
                  disabled={state.isPlaying}
                >
                  {AppData.sixEight.viewName}
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlSlider
              value={state.numberOfBars}
              onChange={(event, newValue) => controller.changeNumberOfBars(newValue)}
              min={2}
              max={16}
              disabled={state.isPlaying}
              iconRotate={true}
              IconLeft={DragHandleIcon}
              IconRight={ReorderIcon}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlSlider
              value={state.bpm}
              onChange={(event, newValue) => controller.changeBpm(newValue)}
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
                  disabled={state.isPlaying}
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
    </div>
  );
}