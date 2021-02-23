import React, { useRef } from 'react'
import {ScrollSync, Grid, List} from 'react-virtualized'
import { Box, List as MuiList } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles({
  root: {
    padding: 0,
    //border: "1px solid #000000",
  },
  header: {
    backgroundColor: "silver"
  },
  body: {
    backgroundColor: "lightblue"
  },
  whiteKey: {
    borderTop: "1px solid #808080",
    borderRight: "1px solid #808080",
    borderLeft: "1px solid #808080",
    //borderBottom: "1px solid #808080",
    backgroundColor: "#F5F5F5"
  },
  blackKey: {
    borderTop: "1px solid #808080",
    borderRight: "1px solid #808080",
    borderLeft: "1px solid #808080",
    //borderBottom: "1px solid #808080",
    backgroundColor: "#696969",
  },
})

const list = new Array(49).fill(null).map((_,i) => i) 

const useKeyboardStyles = makeStyles((theme) => ({
  root: {
    width: '125',
    maxWidth: 125,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    height: 353,
    borderTop: "1px solid #000000",
    borderLeft: "1px solid #000000",
    borderRight: "1px solid #000000",
    '&::-webkit-scrollbar': {
      display: 'none'
    },
  },
  cell: {
    //outline: "1px solid #000000",
  },
  whiteKey: {
    height: "32px",
    backgroundColor: "#F5F5F5",
  },
  blackKey: {
    width: "75px",
    height: "16px",
    margin: "-9px 0px",
    backgroundColor: "#696969",
    zIndex: 1,
  },
}));

const gridConf = {
  columnWidth: 60,
  columnCount: 64,
  height: 353,
  overscanColumnCount: 0,
  overscanRowCount: 10,
  rowHeight: 32,
  rowCount: 49,
  keyboradWidth: 125,
}

const MyScrollSync = () => {
  const classes = useStyles()
  const classesKeyboard = useKeyboardStyles();

  const basicArray = [0,0,0,1,1,2,2,3,3,3,4,4]

  const isWhiteKey = (keyIndex) => {
    switch(keyIndex){
      case 0:
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
        return true
      default:
    }
    return false
  }

  const isBlackKey = (keyIndex) => {
    return !isWhiteKey(keyIndex)
  }

  const getKeyIndex = (rowIndex) => {
    // Notes: start from 0
    let keyIndex = rowIndex
    while(true){
      if(keyIndex < 12)break
      keyIndex -= 12
    }
    return keyIndex
  }

  const renderLeftHeaderCell = ({columnIndex, key, style}) => {
    return (
      <Box style={style} key={key} className={classes.root}></Box>
    )
  }


  const getTop = (rowIndex, keyIndex, originalTop) => {
    return originalTop - gridConf.rowHeight * (basicArray[keyIndex] + 5 * Math.floor(rowIndex/12))
  }

  const renderLeftSideCell = ({columnIndex, key, rowIndex, style}) => {

    let keyIndex = getKeyIndex(rowIndex)
    let originalTop = style.top
    let newStyle = Object.assign({}, style)

    newStyle.top = getTop(rowIndex, keyIndex, originalTop)

    //console.log('keyIdx ' + keyIndex + ", isWhite " + isWhiteKey(keyIndex))


    return (
      <Box style={newStyle} key={key} className={clsx(classes.root, isWhiteKey(keyIndex) ? (rowIndex === 0 ? classes.whiteKeyTop : classes.whiteKey) : classes.blackKey)}></Box>
    )
  }

  const renderHeaderCell = ({columnIndex, key, rowIndex, style}) => {
    return (
      <Box style={style} key={key} className={clsx(classes.root, classes.header)}>{/* c {columnIndex}, r{rowIndex} */}</Box>
    )
  }

  const renderBodyCell = ({columnIndex, key, rowIndex, style}) => {

    let keyIndex = getKeyIndex(rowIndex)

    return (
      <Box style={style} key={key} className={clsx(classes.root, classes.body, isWhiteKey(keyIndex) ? classes.whiteKey : classes.blackKey)}>{/* c {columnIndex}, r{rowIndex} */}</Box>
    )
  }

  const getHeight = ({index}) => {
    if(index === 0){
      return 34
    }

    const keyIndex = getKeyIndex(index)
    console.log(keyIndex)

    if(isWhiteKey(keyIndex)){
      switch(keyIndex){
        case 3:
        case 5:
        case 10:
          return 16
        default:        
      }

      return 22
    }else{
      return 18
    }

  }

  const ref = useRef(null)

  const onScrollTest = (scrollTop) => {

    if(ref.current != null){
      ref.current.scrollTop = scrollTop
    }
  }

  return (
    <ScrollSync>
      {({
        clientHeight,
        clientWidth,
        onScroll,
        scrollHeight,
        scrollLeft,
        scrollTop,
        scrollWidth,
      }) => {

        return (
          <Box display="flex" flexDirection="row">
            <Box>
              <Box>
                <Grid
                  cellRenderer={renderLeftHeaderCell}
                  width={gridConf.keyboradWidth}
                  height={gridConf.rowHeight}
                  rowHeight={gridConf.rowHeight}
                  columnWidth={gridConf.keyboradWidth}
                  rowCount={1}
                  columnCount={1}
                />
              </Box>
              {/* left side grid */}
              <Box>
                <MuiList ref={ref} className={classesKeyboard.root} disablePadding={true} onScroll={onScrollTest(scrollTop)}>
                  {list.map(rowIndex => {
              
                    let keyIndex = getKeyIndex(rowIndex)
                    /* let originalTop = style.top
                    let newStyle = Object.assign({}, style)

                    newStyle.top = getTop(rowIndex, keyIndex, originalTop) */
                    
                    return (
                      //<Box key={rowIndex} className={classes.cell}>{rowIndex}</Box>
                      <Box key={rowIndex} className={clsx(classesKeyboard.root, classesKeyboard.cell, isWhiteKey(keyIndex) ? classesKeyboard.whiteKey : classesKeyboard.blackKey)}></Box>
                    )
                  })}
                </MuiList>
              </Box>
            </Box>
            <Box>
              <Box>
                <Grid
                  className={clsx(classes.root, classes.header)}
                  columnWidth={gridConf.columnWidth}
                  columnCount={gridConf.columnCount}
                  height={gridConf.rowHeight}
                  overscanColumnCount={gridConf.overscanColumnCount}
                  cellRenderer={renderHeaderCell}
                  rowHeight={gridConf.rowHeight}
                  rowCount={1}
                  scrollLeft={scrollLeft}
                  width={440}
                />
              </Box>
              <Box>
                <Grid
                  columnWidth={gridConf.columnWidth}
                  columnCount={gridConf.columnCount}
                  height={gridConf.height}
                  onScroll={onScroll}
                  overscanColumnCount={gridConf.overscanColumnCount}
                  overscanRowCount={gridConf.overscanRowCount}
                  cellRenderer={renderBodyCell}
                  rowHeight={getHeight}
                  rowCount={gridConf.rowCount}
                  width={440}
                />
              </Box>
            </Box>
          </Box>
        )
      }}
    </ScrollSync>
  )
}

export default MyScrollSync