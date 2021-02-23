import React, { Fragment } from 'react';
import PianoRoll from './PianoRoll'

const App = () => {
  return (
    <Fragment>
      <PianoRoll />
    </Fragment>    
  )
}

/* function _App() {
  const [currentStep, setCurrentStep] = useState(true)

  function handleClick(){
    const steps = new Array(Config.gridWidth).fill(null).map((_,i) => i)

    const synth = new Tone.Synth().toDestination();
    const seq = new Tone.Sequence((time, step) => {
      setCurrentStep(step)
      //let notes = getNotes

      //synth.triggerAttackRelease(note, 0.1, time);
      // subdivisions are given as subarrays
    }, steps).start(0);
    Tone.Transport.start();
  }

  const grids = new Array(Config.gridWidth).fill(null).map((_,i) => i)

  const [isActiveTile, setIsActiveTile] = useState("false")

  return (
    <Fragment>
      <Box>
        <Button onClick={handleClick}>start</Button>
      </Box>
      <Box display="flex" flexDirection="row">
        {grids.map(grid => {
          return (
            <Grid selection={currentStep === grid} key={grid}>
              <Tiles set={setIsActiveTile}></Tiles>
              <p>{isActiveTile}</p>
            </Grid>
          )
        })}
      </Box>
    </Fragment>
  );
} */

export default App