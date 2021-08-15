import React from 'react'
import * as AppData from './AppData'
import clsx from 'clsx'
import Key from './components/Key'

export const PianoRoll = (state, controller) => {

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
  
  return (
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
  )
}