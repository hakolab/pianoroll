import React from 'react'
import { IconButton, AppBar, Typography } from "@material-ui/core";
import { useButtonStyles } from '../../hooks/useButtonStyles';

export const InformationContainer = () => {
  const classes = useButtonStyles();
  
  return (
    <div style={{height: "100vh"}}>
    <AppBar position="static">
      <div style={{padding: "8px", textAlign: "center"}}>
        <Typography variant="h5">
          PianoRoll
        </Typography>
        <Typography variant="caption">
          Version 1.0
        </Typography>
      </div>
    </AppBar>
    <div style={{padding: "8px"}}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box display="flex">
            <Box minWidth="60px" width="60px" height="40px">
              <PlayButtonContainer />
            </Box>
            <Box style={{marginLeft: "8px"}}>
              <Typography variant="body2">
                シーケンサーを動かして、演奏を始めます。
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex">
            <Box minWidth="60px" width="60px" height="40px">
              <StopButtonContainer isPlaying={true}/>
            </Box>
            <Box style={{marginLeft: "8px"}}>
              <Typography variant="body2">
                シーケンサーを止めて、演奏を終了します。
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex">
            <Box minWidth="60px" width="60px" height="40px">
              <ClearNotesButtonContainer />
            </Box>
            <Box style={{marginLeft: "8px"}}>
              <Typography variant="body2">
                入力した音符をクリアします。
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex">
            <Box minWidth="60px" width="60px" height="40px">
              <ClearAllButtonContainer />
            </Box>
            <Box style={{marginLeft: "8px"}}>
              <Typography variant="body2">
                入力した音符やキーボードモード、テンポなどをすべてクリアします。
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex">
            <Box minWidth="60px" width="60px" height="40px">
              <ToggleScrollButtonContainer/>
            </Box>
            <Box style={{marginLeft: "8px"}}>
              <Typography variant="body2">
                グリッド内でスワイプするとスクロールができるようになります。
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex">
            <Box minWidth="60px" width="60px" height="40px">
              <ZoomOutButtonContainer />
            </Box>
            <Box style={{marginLeft: "8px"}}>
              <Typography variant="body2">
                鍵盤、グリッドを縮小して表示します。
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex">
            <Box minWidth="60px" width="60px" height="40px">
              <ZoomInButtonContainer />
            </Box>
            <Box style={{marginLeft: "8px"}}>
              <Typography variant="body2">
                鍵盤、グリッドを拡大して表示します。
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex">
            <Box minWidth="60px" width="60px" height="40px">
              <OpenConfigButtonContainer />
            </Box>
            <Box style={{marginLeft: "8px"}}>
              <Typography variant="body2">
                設定ウインドウを開きます。
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex">
            <Box minWidth="60px" width="60px" height="40px">
              <ChangeKeyboardButtonContainer
                target={{viewName: "keyboard mode"}}
                keyboardObject={{mode: "keyboard mode"}}
              />
            </Box>
            <Box style={{marginLeft: "8px"}}>
              <Typography variant="body2">
                キーボードモードを変更します。
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex">
            <Box minWidth="60px" width="60px" height="40px">
              <ChangeBeatButtonContainer
                target={{viewName: "beat mode"}}
                beatObject={{mode: "beat mode"}}
              />
            </Box>
            <Box style={{marginLeft: "8px"}}>
              <Typography variant="body2">
                拍子を変更します。
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <ChangeNumberOfBarsSliderContainer
                value={4}
              />
            </Grid>
            <Grid item xs={8}>
              <Box>
                <Typography variant="body2">
                  小節数を変更します。
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <ChangeBpmSliderContainer
                value={120}
              />
            </Grid>
            <Grid item xs={8}>
              <Box>
                <Typography variant="body2">
                  テンポを変更します。
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Box m={1} textAlign="center">
            <IconButton className={classes.dark} onClick={infoDispatcher.close}>
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </div>
  </div>
  )
}