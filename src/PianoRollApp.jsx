import React from 'react'
import './styles.scss'
import { usePianoRoll } from './hooks/usePianoRoll';
import { useDialogState } from './hooks/useDialogState';
import * as Tone from "tone";
import { ControllerContainer } from './components/controller/ControllerContainer';
import { KeyboardContextProvider } from './components/keyboard-context-provider/KeyboardContextProvider';
import { KeyboardContainer } from './components/keyboard/KeyboardContainer';
import { GridContextProvider } from './components/grid-context-provider/GridContextProvider';
import { GridContainer } from './components/grid/GridContainer';
import { AlertDialogContainer } from './components/dialogs/AlertDialogContainer';
import { ThemeProvider } from './components/theme-provider/ThemeProvider';

export const PianoRollApp = () => {
  const [state, controller] = usePianoRoll();
  //console.log("state in PianoRoll")
  //console.log(state)

  // Resume確認
  const [isOpenConfirmResume, confirmResumeDispatcher] = useDialogState(true);

  function handleClickResumeOk(){
    Tone.context.resume().then(() => {
      confirmResumeDispatcher.close();
    })
  }

  return (
    <div id="container">
      <ThemeProvider>
      <ControllerContainer
        state={state}
        controller={controller}
      />
      <div id="piano-roll">
        <KeyboardContextProvider controller={{toggleIsPress: controller.toggleIsPress}}>
          <KeyboardContainer
            mode={state.keyboard.mode}
            data={state.keyboard.data}
            keyNotes={state.keyNotes}
          />
        </KeyboardContextProvider>
        <GridContextProvider
          currentStep={state.currentStep}
          notes={state.notes}
        >
          <GridContainer
            beat={state.beat}
            keyboard={state.keyboard}
          />
        </GridContextProvider>
      </div>
      <AlertDialogContainer
        open={isOpenConfirmResume}
        title={"NOTIFICATION"}
        text={"PianoRoll は音が鳴ります！"}
        onClose={handleClickResumeOk}
      />
      </ThemeProvider>
    </div>
  );
}