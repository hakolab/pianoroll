import React from "react";
import * as Tone from "tone";
import './styles.scss'
import PianoRoll from './PianoRoll'
import { usePianoRoll } from "./hooks/usePianoRoll";
import AlertDialog from "./components/AlertDialog";
import { useDialogState } from "./hooks/useDialogState";
import { ControllerContainer } from "./components/controller/ControllerContainer";

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
      <PianoRoll
        state={state}
        controller={controller}
      />
      <AlertDialog
        open={isOpenConfirmResume}
        title={"NOTIFICATION"}
        text={"PianoRoll は音が鳴ります！"}
        onClose={handleClickResumeOk}
      />
    </div>
  );
}