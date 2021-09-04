import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import * as AppData from "../../AppData";
import { Grid } from '../material-ui-wrapper/Grid'
import { Box, Drawer, IconButton, AppBar, Typography } from "@material-ui/core";
import { useButtonStyles } from "../../hooks/useButtonStyles";
import { useDialogState } from "../../hooks/useDialogState";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { PlayStopButtonContainer } from '../buttons/PlayStopButtonContainer';
import { PlayButtonContainer } from '../buttons/PlayButtonContainer';
import { StopButtonContainer } from '../buttons/StopButtonContainer'
import { ClearNotesButtonWithConfirmContainer } from '../buttons/ClearNotesButtonWithConfirmContainer';
import { ToggleScrollButtonContainer } from '../buttons/ToggleScrollButtonContainer';
import { ZoomOutButtonContainer } from '../buttons/ZoomOutButtonContainer';
import { ZoomInButtonContainer } from '../buttons/ZoomInButtonContainer';
import { OpenConfigButtonContainer } from '../buttons/OpenConfigButtonContainer';
import { OpenInfoButtonContainer } from '../buttons/OpenInfoButtonContainer'
import { ChangeKeyboardButtonContainer } from '../buttons/ChangeKeyboardButtonContainer';
import { ChangeBeatButtonContainer } from '../buttons/ChangeBeatButtonContainer';
import { ChangeBpmSliderContainer } from '../sliders/ChangeBpmSliderContainer';
import { ChangeNumberOfBarsSliderContainer } from '../sliders/ChangeNumberOfBarsSliderContainer';
import { isMobile } from 'react-device-detect';
import { useControllerHeight } from '../../hooks/useControllerHeight';
import { PlayButtonInfoContainer } from '../information/PlayButtonInfoContainer';
import { StopButtonInfoContainer } from '../information/StopButtonInfoContainer';
import { ClearNotesButtonInfoContainer } from '../information/ClearNotesButtonInfoContainer';
import { ClearAllButtonInfoContainer } from '../information/ClearAllButtonInfoContainer';
import { ToggleScrollButtonInfoContainer } from '../information/ToggleScrollButtonInfoContainer';
import { ZoomOutButtonInfoContainer } from '../information/ZoomOutButtonInfoContainer';
import { ZoomInButtonInfoContainer } from '../information/ZoomInButtonInfoContainer';
import { OpenConfigButtonInfoContainer } from '../information/OpenConfigButtonInfoContainer';
import { ChangeKeyboardButtonInfoContainer } from '../information/ChangeKeyboardButtonInfoContainer';
import { ChangeBeatButtonInfoContainer } from '../information/ChangeBeatButtonInfoContainer';
import { ChangeNumberOfBarsSliderInfoContainer } from '../information/ChangeNumberOfBarsSliderInfoContainer';
import { ChangeBpmSliderInfoContainer } from '../information/ChangeBpmSliderInfoContainer';
import { ClearAllButtonWithConfirmContainer } from '../buttons/ClearAllButtonWithConfirmContainer';

export const ControllerContainer = ({state, controller}) => {
  // eslint-disable-next-line no-undef
  const version = PIANO_ROLL_VERSION;
  
  const classes = useButtonStyles();
  useControllerHeight();

  // 設定ドロワー
  const [isOpenConfig, configDispatcher] = useDialogState(false);
  // ヘルプドロワー
  const [isOpenInfo, infoDispatcher] = useDialogState(false);

  function openInfo(){
    isMobile && controller.pianoRollEventDispatcher.touch.set(false)
    infoDispatcher.open();
  }

  function closeInfo(){
    isMobile && controller.pianoRollEventDispatcher.touch.set(true)
    infoDispatcher.close();
  }

  return (
    <Fragment>
      <Grid container className="header controller" alignItems="center">
        <Grid item xs={12} spPortrait={12} spLandscape={6} pc={6}>
          <Box className="buttons">
            {
              isMobile
              ? <PlayStopButtonContainer
                  start={controller.start}
                  stop={controller.stop}
                  isPlaying={state.isPlaying}
                />
              : <Fragment>
                  <PlayButtonContainer
                    isPlaying={state.isPlaying}
                    action={controller.start}
                  />
                  <StopButtonContainer
                    isPlaying={state.isPlaying}
                    action={controller.stop}
                  />
                </Fragment>
            }
            <ClearNotesButtonWithConfirmContainer
              isPlaying={state.isPlaying}
              action={controller.clearNotes}
            />
            <ClearAllButtonWithConfirmContainer
              isPlaying={state.isPlaying}
              action={controller.clearAll}
            />
            {
              isMobile &&
              <ToggleScrollButtonContainer
                action={controller.pianoRollEventDispatcher.scroll.toggle}
                isScrollMode={state.scrollMode}
              />
            }
          </Box>
        </Grid>
        <Grid item xs={12} spPortrait={12} spLandscape={6} pc={6}>
          <Box className="buttons">
            <ZoomOutButtonContainer
              action={controller.zoomOut}
              zoom={state.zoom}
            />
            <ZoomInButtonContainer
              action={controller.zoomIn}
              zoom={state.zoom}
            />
            <OpenConfigButtonContainer
              action={configDispatcher.open}
            />
            <OpenInfoButtonContainer
              action={openInfo}
            />
          </Box>
        </Grid>
      </Grid>
      <Drawer
        anchor="bottom"
        open={isOpenInfo}
        onClose={closeInfo}
      >
        <div id="info">
          <AppBar position="sticky" className="header">
            <div className="title">
              <Typography variant="h5">
                PianoRoll
              </Typography>
              <Typography variant="caption">
                Version {version}
              </Typography>
            </div>
          </AppBar>
          <div className="container">
            <Grid container spacing={2}>
              <Grid item xs={12} spPortrait={12} spLandscape={6}>
                <PlayButtonInfoContainer />
              </Grid>
              <Grid item xs={12} spPortrait={12} spLandscape={6}>
                <StopButtonInfoContainer />
              </Grid>
              <Grid item xs={12} spPortrait={12} spLandscape={6}>
                <ClearNotesButtonInfoContainer />
              </Grid>
              <Grid item xs={12} spPortrait={12} spLandscape={6}>
                <ClearAllButtonInfoContainer />
              </Grid>
              <Grid item xs={12} spPortrait={12} spLandscape={6}>
                <ZoomOutButtonInfoContainer />
              </Grid>
              <Grid item xs={12} spPortrait={12} spLandscape={6}>
                <ZoomInButtonInfoContainer />
              </Grid>
              <Grid item xs={12} spPortrait={12} spLandscape={6}>
                <ToggleScrollButtonInfoContainer />
              </Grid>
              <Grid item xs={12} spPortrait={12} spLandscape={6}>
                <OpenConfigButtonInfoContainer />
              </Grid>
              <Grid item xs={12} spPortrait={12} spLandscape={6}>
                <ChangeKeyboardButtonInfoContainer />
              </Grid>
              <Grid item xs={12} spPortrait={12} spLandscape={6}>
                <ChangeBeatButtonInfoContainer />
              </Grid>
              <Grid item xs={12} spPortrait={12} spLandscape={6}>
                <ChangeNumberOfBarsSliderInfoContainer />
              </Grid>
              <Grid item xs={12} spPortrait={12} spLandscape={6}>
                <ChangeBpmSliderInfoContainer />
              </Grid>
              <Grid item xs>
                <Box m={1} textAlign="center">
                  <IconButton className={classes.dark} onClick={closeInfo}>
                    <ExpandMoreIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </div>
        </div>
      </Drawer>

      <Drawer
        anchor="top"
        open={isOpenConfig}
        onClose={configDispatcher.close}
      >
        <div className="drawer">
          <Grid container className="controller" alignItems="center">
            <Grid item xs={12} spPortrait={12} spLandscape={6}>
              <Box className="buttons">
                <ChangeKeyboardButtonContainer
                  action={controller.changeKeyboard}
                  keyboardObject={state.keyboard}
                  target={AppData.oneOctave}
                  isPlaying={state.isPlaying}
                />
                <ChangeKeyboardButtonContainer
                  action={controller.changeKeyboard}
                  keyboardObject={state.keyboard}
                  target={AppData.toyPiano}
                  isPlaying={state.isPlaying}
                />
                <ChangeKeyboardButtonContainer
                  action={controller.changeKeyboard}
                  keyboardObject={state.keyboard}
                  target={AppData.keyboard76}
                  isPlaying={state.isPlaying}
                />
              </Box>
            </Grid>
            <Grid item xs={12} spPortrait={12} spLandscape={6}>
              <Box className="buttons">
                <ChangeBeatButtonContainer
                  action={controller.changeBeat}
                  beatObject={state.beat}
                  target={AppData.twoFour}
                  isPlaying={state.isPlaying}
                />
                <ChangeBeatButtonContainer
                  action={controller.changeBeat}
                  beatObject={state.beat}
                  target={AppData.threeFour}
                  isPlaying={state.isPlaying}
                />
                <ChangeBeatButtonContainer
                  action={controller.changeBeat}
                  beatObject={state.beat}
                  target={AppData.fourFour}
                  isPlaying={state.isPlaying}
                />
                <ChangeBeatButtonContainer
                  action={controller.changeBeat}
                  beatObject={state.beat}
                  target={AppData.sixEight}
                  isPlaying={state.isPlaying}
                />
              </Box>
            </Grid>
            <Grid item xs={12} spPortrait={12} spLandscape={6}>
              <Box mt={1}>
                <ChangeNumberOfBarsSliderContainer
                  value={state.numberOfBars}
                  onChange={controller.changeNumberOfBars}
                  disabled={state.isPlaying}
                  showLabel={true}
                />
              </Box>
            </Grid>
            <Grid item xs={12} spPortrait={12} spLandscape={6}>
              <Box mt={1}>
                <ChangeBpmSliderContainer
                  value={state.bpm}
                  onChange={controller.changeBpm}
                  disabled={false}
                  showLabel={true}
                />
              </Box>
            </Grid>
            <Grid item xs={12} spPortrait={12} spLandscape={12}>
              <Box m={1} textAlign="center">
                <IconButton className={classes.dark} onClick={configDispatcher.close}>
                  <ExpandLessIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Drawer>
    </Fragment>
  )
}

ControllerContainer.propTypes = {
  state: PropTypes.object,
  controller: PropTypes.object
}