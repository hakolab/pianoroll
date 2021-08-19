import { clone } from './utils/recursiveCopy'

const twoFour = {
  mode: 'two-four',
  viewName: '2/4',
  numberOfNotesInBar: 4
}

const threeFour = {
  mode: 'three-four',
  viewName: '3/4',
  numberOfNotesInBar: 6
}

const fourFour = {
  mode: 'four-four',
  viewName: '4/4',
  numberOfNotesInBar: 8
}

const sixEight = {
  mode: 'six-eight',
  viewName: '6/8',
  numberOfNotesInBar: 6
}

const oneOctave = {
  mode: "oneOctave",
  viewName: "one octave",
  data: [
    {
      octave: 5,
      tones: [
        { pitchName: "C", keyType: "white" }
      ]
    },
    {
      octave: 4,
      tones: [
        { pitchName: "B", keyType: "white" },
        { pitchName: "Bb", keyType: "black" },
        { pitchName: "A", keyType: "white" },
        { pitchName: "Ab", keyType: "black" },
        { pitchName: "G", keyType: "white" },
        { pitchName: "Gb", keyType: "black" },
        { pitchName: "F", keyType: "white" },
        { pitchName: "E", keyType: "white" },
        { pitchName: "Eb", keyType: "black" },
        { pitchName: "D", keyType: "white" },
        { pitchName: "Db", keyType: "black" },
        { pitchName: "C", keyType: "white" }
      ]
    }
  ]
}

const toyPiano = {
  mode: "toyPiano",
  viewName: "toy piano",
  data: [
  {
    octave: 8,
    tones: [
      { pitchName: "C", keyType: "white" }
    ]
  },
  {
    octave: 7,
    tones: [
      { pitchName: "B", keyType: "white" },
      { pitchName: "Bb", keyType: "black" },
      { pitchName: "A", keyType: "white" },
      { pitchName: "Ab", keyType: "black" },
      { pitchName: "G", keyType: "white" },
      { pitchName: "Gb", keyType: "black" },
      { pitchName: "F", keyType: "white" },
      { pitchName: "E", keyType: "white" },
      { pitchName: "Eb", keyType: "black" },
      { pitchName: "D", keyType: "white" },
      { pitchName: "Db", keyType: "black" },
      { pitchName: "C", keyType: "white" }
    ]
  },
  {
    octave: 6,
    tones: [
      { pitchName: "B", keyType: "white" },
      { pitchName: "Bb", keyType: "black" },
      { pitchName: "A", keyType: "white" },
      { pitchName: "Ab", keyType: "black" },
      { pitchName: "G", keyType: "white" },
      { pitchName: "Gb", keyType: "black" },
      { pitchName: "F", keyType: "white" },
      { pitchName: "E", keyType: "white" },
      { pitchName: "Eb", keyType: "black" },
      { pitchName: "D", keyType: "white" },
      { pitchName: "Db", keyType: "black" },
      { pitchName: "C", keyType: "white" }
    ]
  },
  {
    octave: 5,
    tones: [
      { pitchName: "B", keyType: "white" },
      { pitchName: "Bb", keyType: "black" },
      { pitchName: "A", keyType: "white" },
      { pitchName: "Ab", keyType: "black" },
      { pitchName: "G", keyType: "white" },
      { pitchName: "Gb", keyType: "black" },
      { pitchName: "F", keyType: "white" }
    ]
  },
]
}

const keyboard76 = {
  mode: "keyboard76",
  viewName: "keyboard 76",
  data: [
    {
      octave: 7,
      tones: [
        { pitchName: "G", keyType: "white" },
        { pitchName: "Gb", keyType: "black" },
        { pitchName: "F", keyType: "white" },
        { pitchName: "E", keyType: "white" },
        { pitchName: "Eb", keyType: "black" },
        { pitchName: "D", keyType: "white" },
        { pitchName: "Db", keyType: "black" },
        { pitchName: "C", keyType: "white" }
      ]
    },
    {
      octave: 6,
      tones: [
        { pitchName: "B", keyType: "white" },
        { pitchName: "Bb", keyType: "black" },
        { pitchName: "A", keyType: "white" },
        { pitchName: "Ab", keyType: "black" },
        { pitchName: "G", keyType: "white" },
        { pitchName: "Gb", keyType: "black" },
        { pitchName: "F", keyType: "white" },
        { pitchName: "E", keyType: "white" },
        { pitchName: "Eb", keyType: "black" },
        { pitchName: "D", keyType: "white" },
        { pitchName: "Db", keyType: "black" },
        { pitchName: "C", keyType: "white" }
      ]
    },
    {
      octave: 5,
      tones: [
        { pitchName: "B", keyType: "white" },
        { pitchName: "Bb", keyType: "black" },
        { pitchName: "A", keyType: "white" },
        { pitchName: "Ab", keyType: "black" },
        { pitchName: "G", keyType: "white" },
        { pitchName: "Gb", keyType: "black" },
        { pitchName: "F", keyType: "white" },
        { pitchName: "E", keyType: "white" },
        { pitchName: "Eb", keyType: "black" },
        { pitchName: "D", keyType: "white" },
        { pitchName: "Db", keyType: "black" },
        { pitchName: "C", keyType: "white" }
      ]
    },
    {
      octave: 4,
      tones: [
        { pitchName: "B", keyType: "white" },
        { pitchName: "Bb", keyType: "black" },
        { pitchName: "A", keyType: "white" },
        { pitchName: "Ab", keyType: "black" },
        { pitchName: "G", keyType: "white" },
        { pitchName: "Gb", keyType: "black" },
        { pitchName: "F", keyType: "white" },
        { pitchName: "E", keyType: "white" },
        { pitchName: "Eb", keyType: "black" },
        { pitchName: "D", keyType: "white" },
        { pitchName: "Db", keyType: "black" },
        { pitchName: "C", keyType: "white" }
      ]
    },
    {
      octave: 3,
      tones: [
        { pitchName: "B", keyType: "white" },
        { pitchName: "Bb", keyType: "black" },
        { pitchName: "A", keyType: "white" },
        { pitchName: "Ab", keyType: "black" },
        { pitchName: "G", keyType: "white" },
        { pitchName: "Gb", keyType: "black" },
        { pitchName: "F", keyType: "white" },
        { pitchName: "E", keyType: "white" },
        { pitchName: "Eb", keyType: "black" },
        { pitchName: "D", keyType: "white" },
        { pitchName: "Db", keyType: "black" },
        { pitchName: "C", keyType: "white" }
      ]
    },
    {
      octave: 2,
      tones: [
        { pitchName: "B", keyType: "white" },
        { pitchName: "Bb", keyType: "black" },
        { pitchName: "A", keyType: "white" },
        { pitchName: "Ab", keyType: "black" },
        { pitchName: "G", keyType: "white" },
        { pitchName: "Gb", keyType: "black" },
        { pitchName: "F", keyType: "white" },
        { pitchName: "E", keyType: "white" },
        { pitchName: "Eb", keyType: "black" },
        { pitchName: "D", keyType: "white" },
        { pitchName: "Db", keyType: "black" },
        { pitchName: "C", keyType: "white" }
      ]
    },
    {
      octave: 1,
      tones: [
        { pitchName: "B", keyType: "white" },
        { pitchName: "Bb", keyType: "black" },
        { pitchName: "A", keyType: "white" },
        { pitchName: "Ab", keyType: "black" },
        { pitchName: "G", keyType: "white" },
        { pitchName: "Gb", keyType: "black" },
        { pitchName: "F", keyType: "white" },
        { pitchName: "E", keyType: "white" }
      ]
    },
  ]
}

function getKeyboardsName(){
  return [
    { mode: oneOctave.mode, viewName: oneOctave.viewName },
    { mode: toyPiano.mode, viewName: toyPiano.viewName },
    { mode: keyboard76.mode, viewName: keyboard76.viewName }
  ]
}

function getBeatsName(){
  return [
    { mode: twoFour.mode, viewName: twoFour.viewName },
    { mode: threeFour.mode, viewName: threeFour.viewName },
    { mode: fourFour.mode, viewName: fourFour.viewName },
    { mode: sixEight.mode, viewName: sixEight.viewName }
  ]
}

function getBeat(mode){
  switch(mode){
    case "two-four":
      return clone(twoFour)
    case "three-four":
      return clone(threeFour)
    case "four-four":
      return clone(fourFour)
    case "six-eight":
      return clone(sixEight)
    default:
  }
}

function getKeyboard(mode){
  switch(mode){
    case "oneOctave":
      return clone(oneOctave)
    case "toyPiano":
      return clone(toyPiano)
    case "keyboard76":
      return clone(keyboard76)
    default:
  }
}

function getOctaveClassName(length){
  switch(length){
    case 1:
      return "key-1"
    case 7:
      return "key-7"
    case 8:
      return "key-8"
    case 12:
      return "key-12"
    default:
      return ""
  }
}

const zoomMin = 2;
const zoomMax = 10;

export {
  twoFour,
  threeFour,
  fourFour,
  sixEight,
  oneOctave,
  toyPiano,
  keyboard76,
  zoomMin,
  zoomMax,
  getBeat,
  getKeyboard,
  getKeyboardsName,
  getBeatsName,
  getOctaveClassName
}