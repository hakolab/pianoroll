import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import * as AppData from "../../AppData";
import { Grid } from '../material-ui-wrapper/Grid'
import { Box, Drawer, IconButton } from "@material-ui/core";
import { useButtonStyles } from "../../hooks/useButtonStyles";
import { useDialogState } from "../../hooks/useDialogState";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { PlayStopButtonContainer } from '../buttons/PlayStopButtonContainer';
import { PlayButtonContainer } from '../buttons/PlayButtonContainer';
import { StopButtonContainer } from '../buttons/StopButtonContainer'
import { ClearNotesButtonContainer } from '../buttons/ClearNotesButtonContainer';
import { ClearAllButtonContainer } from '../buttons/ClearAllButtonContainer';
import { ToggleScrollButtonContainer } from '../buttons/ToggleScrollButtonContainer';
import { ZoomOutButtonContainer } from '../buttons/ZoomOutButtonContainer';
import { ZoomInButtonContainer } from '../buttons/ZoomInButtonContainer';
import { OpenDrawerButtonContainer } from '../buttons/OpenDrawerButtonContainer';
import { ChangeKeyboardButtonContainer } from '../buttons/ChangeKeyboardButtonContainer';
import { ChangeBeatButtonContainer } from '../buttons/ChangeBeatButtonContainer';
import { ChangeBpmSliderContainer } from '../sliders/ChangeBpmSliderContainer';
import { ChangeNumberOfBarsSliderContainer } from '../sliders/ChangeNumberOfBarsSliderContainer';
import { isMobile } from 'react-device-detect';
import { useControllerHeight } from '../../hooks/useControllerHeight';

export const ControllerContainer = ({state, controller}) => {
  const classes = useButtonStyles();
  useControllerHeight();

  // 設定ドロワー
  const [isOpenDrawer, drawerDispatcher] = useDialogState(false);

  return (
    <Fragment>
      <Grid container id="header" className="controller" alignItems="center">
        <Grid item xs={12} spPortrait={12} spLandscape={6} pc={6}>
          <Box className="buttons">
            {
              isMobile
              ? <Fragment>
                  <PlayButtonContainer
                    isPlaying={state.isPlaying}
                    action={controller.start}
                  />
                  <StopButtonContainer
                    isPlaying={state.isPlaying}
                    action={controller.stop}
                  />
                </Fragment>
              : <PlayStopButtonContainer
                  start={controller.start}
                  stop={controller.stop}
                  isPlaying={state.isPlaying}
                />
            }
            <ClearNotesButtonContainer
              isPlaying={state.isPlaying}
              action={controller.clearNotes}
            />
            <ClearAllButtonContainer
              isPlaying={state.isPlaying}
              action={controller.clearAll}
            />
          </Box>
        </Grid>
        <Grid item xs={12} spPortrait={12} spLandscape={6} pc={6}>
          <Box className="buttons">
            {
              isMobile &&
              <ToggleScrollButtonContainer
                action={controller.toggleDispatcher.toggle}
                isScrollMode={state.scrollMode}
              />
            }
            <ZoomOutButtonContainer
              action={controller.zoomOut}
              zoom={state.zoom}
            />
            <ZoomInButtonContainer
              action={controller.zoomIn}
              zoom={state.zoom}
            />
            <OpenDrawerButtonContainer
              action={drawerDispatcher.open}
            />
          </Box>
        </Grid>
      </Grid>

      <Drawer
        anchor="top"
        open={isOpenDrawer}
        onClose={drawerDispatcher.close}
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
              <ChangeNumberOfBarsSliderContainer
                value={state.numberOfBars}
                onChange={controller.changeNumberOfBars}
                disabled={state.isPlaying}
              />
            </Grid>
            <Grid item xs={12} spPortrait={12} spLandscape={6}>
              <ChangeBpmSliderContainer
                value={state.bpm}
                onChange={controller.changeBpm}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} spPortrait={12} spLandscape={12}>
              <Box m={1} textAlign="center">
                <IconButton className={classes.dark} onClick={drawerDispatcher.close}>
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