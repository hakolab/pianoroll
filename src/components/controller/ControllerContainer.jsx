import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import * as AppData from "../../AppData";
import clsx from 'clsx'
import ControlSlider from "../ControlSlider";
//import AlertDialog from "./components/AlertDialog";
import ConfirmDialog from "../ConfirmDialog";
import { Grid, Box, Button, Drawer, IconButton } from "@material-ui/core";
import { useButtonStyles } from "../../hooks/useButtonStyles";
import { useDialogState } from "../../hooks/useDialogState";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlay, faStop, faEraser, faTrashAlt, faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ReorderIcon from '@material-ui/icons/Reorder';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import { isMobile } from 'react-device-detect'

export const ControllerContainer = ({state, controller}) => {
  const classes = useButtonStyles();

  // clear確認
  const [isOpenConfirmClear, confirmClearDispatcher] = useDialogState(false);
  // allClear確認
  const [isOpenConfirmAllClear, confirmAllClearDispatcher] = useDialogState(false);
  // 設定ドロワー
  const [isOpenDrawer, drawerDispatcher] = useDialogState(false);

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

  return (
    <Fragment>
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
    </Fragment>
  )
}

ControllerContainer.propTypes = {
  state: PropTypes.object,
  controller: PropTypes.object
}