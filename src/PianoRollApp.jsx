import React from "react";
import * as Tone from "tone";
import './styles.scss'
import { KeyboardContainer } from './components/keyboard/KeyboardContainer'
import { GridContainer } from "./components/grid/GridContainer";
import { usePianoRoll } from "./hooks/usePianoRoll";
import AlertDialog from "./components/AlertDialog";
import { useDialogState } from "./hooks/useDialogState";
import { ControllerContainer } from "./components/controller/ControllerContainer";
import { KeyboardContextProvider } from './components/keyboard-context-provider/KeyboardContextProvider'
import { GridContextProvider } from "./components/grid-context-provider/GridContextProvider";

//export const KeyboardControllerContext = createContext();

export default function PianoRollApp() {
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
          controller={{toggleActivationOfNote: controller.toggleActivationOfNote}}
          currentStep={state.currentStep}
          notes={state.notes}
        >
          <GridContainer
            beat={state.beat}
            keyboard={state.keyboard}
          />
        </GridContextProvider>
      </div>
      <AlertDialog
        open={isOpenConfirmResume}
        title={"NOTIFICATION"}
        text={"PianoRoll は音が鳴ります！"}
        onClose={handleClickResumeOk}
      />
    </div>
  );
}