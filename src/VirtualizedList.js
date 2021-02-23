import React, { Fragment, useEffect, useState } from 'react'
import { VariableSizeList as List, areEqual } from 'react-window';
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { Box, Button } from '@material-ui/core'
import * as Tone from 'tone'
import { PureComponent } from 'react';

const config = {
  numberOfColumns: 64,
  numberOfRows: 49,
}

const useGrid = () => {
  //const [grid, setGrid] = useState(new Array(config.numberOfRows).fill(null).map((_,i) => (new Array(config.numberOfColumns).fill(null).map((_,j) => (` row ${i} col${j}`)))))
  const [grid, setGrid] = useState(new Array(config.numberOfRows).fill(null).map((_,i) => (new Array(config.numberOfColumns).fill(null).map((_,j) => (false)))))
  
  const getColumn = (columnIndex) => {
    return grid.map(item => item[columnIndex])
  }
  
  const getRow = (rowIndex) => {
    return grid[rowIndex]
  }

  const getCell = (rowIndex, columnIndex) => {
    return grid[rowIndex][columnIndex]
  }

  const addColumn = () => {
    let newGrid = []
    grid.map((item, index) => {
      newGrid[index] = item.concat(new Array(1).fill(null).map((_,i) => (` row ${index} col${item.length}`)))
    })
    setGrid(newGrid)
  }

  return [grid, getColumn, getRow, getCell, addColumn]
}

const useStyles = makeStyles({
  root: {
    border: "1px solid #b0c4de",
    backgroundColor: "#ffffff"
  },
  cell: {
    width: "100%",
    height: "100%",
  },
  select: {
    backgroundColor:"#f0f8ff"
  },
  active: {
    backgroundColor: "#ffffe0",
    '&:hover': {
        backgroundColor: "#fafad2"
    },
},
nonActive: {
    backgroundColor: 'tranceparent',
    '&:hover': {
        backgroundColor: '#FCFCFC',
    },
}

})
 
const VirtualizedList = (props) => {

  const [grid, getColumn, getRow, getCell, addColumn] = useGrid()

  useEffect(() => {
    console.log(grid)
  },[grid])

  const classes = useStyles()
  const [currentStep, setCurrentStep] = useState(false)

  function handleClick(){
    const steps = new Array(64).fill(null).map((_,i) => i)

    const synth = new Tone.Synth().toDestination();
    const seq = new Tone.Sequence((time, step) => {
      setCurrentStep(step)
      getNotes(step)
      //let notes = getNotes

      //synth.triggerAttackRelease(note, 0.1, time);
      // subdivisions are given as subarrays
    }, steps).start(0);
    Tone.Transport.start();
  }

  const handleClickAdd = () => {
    addColumn()
    //console.log(grids)
  }

  const cellStyle = {
    border: "1px solid #000000",
  }

  const columnWidths = new Array(1000)
  .fill(true)
  .map(() => 75 + Math.round(Math.random() * 50));
 
const getItemSize = index => columnWidths[index];
 
const Column = ({ index, style }) => (
  <Box style={style} display="flex" flexDirection="column"><Box style={cellStyle}>Column {index}</Box></Box>
);
 
 

  return (
    <Fragment>
      <Box>
        <Button onClick={handleClick}>start</Button>
      </Box>
      <Box>
        <Button onClick={handleClickAdd}>add</Button>
      </Box>

      <List
        height={1000}
        itemCount={1000}
        itemSize={getItemSize}
        layout="horizontal"
        width={300}
      >
        {Column}
      </List>
    </Fragment>
  )
};

const Cell = React.memo(({ data, currentStep }) => {
  const classes = useStyles()

  const [isActive, setIsActive] = useState(data.data[data.rowIndex][data.columnIndex])

  const handleClick = () => {
    setIsActive(!isActive)
  }

  return (
    <div
      style={data.style}
      className={classNames(classes.root, currentStep === data.columnIndex ? classes.select : "")}
      onClick={handleClick}
      >
        <div className={classNames(classes.cell, isActive ? classes.active : classes.nonActive)}>
        </div>
      {/* {data.data[data.rowIndex][data.columnIndex]} */}
      
    </div>
  )
}, areEqual)

export default VirtualizedList