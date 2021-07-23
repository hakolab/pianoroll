function Back(){
  return (
    <div id="piano-roll">
    {
      state.keyboard.data.map((octaveObj, octaveIndex) => {
        return (
          <div id={`octave:${octaveObj.octave}`} key={`octave:${octaveObj.octave}`} className={clsx("octave", getOctaveClassName(octaveObj.tones.length))}>
            <div className={`keyboard ${state.keyboard.mode}`}>
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
                    <div
                      id={`key:${tone.pitchName}${octaveObj.octave}`}
                      key={`key:${tone.pitchName}${octaveObj.octave}`}
                      className={`${rowClassName} ${tone.pitchName}`}
                    >
                    </div>
                  )
                })
              }
            </div>
            <div id="grid-roll" className={`grid ${state.beat.mode}`}>
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
                          if (currentStep === noteIndex) {
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
          </div>
        )
      })
    }
    </div>
  )
}