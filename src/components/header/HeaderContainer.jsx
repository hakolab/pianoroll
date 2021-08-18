import React from 'react'
import { Grid, Box, Button } from "@material-ui/core";
import { useButtonStyles } from "./hooks/useButtonStyles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlay, faStop, faEraser, faTrashAlt, faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from 'react-device-detect'
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

export const HeaderContainer = () => {

  const classes = useButtonStyles();

  return (
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
  )
}