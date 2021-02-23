import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import clsx from 'clsx'

const useKeyboardStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    maxWidth: 150,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    height: 600,
  },
  cell: {
    border: "1px solid #000000",
  },
  whiteKey: {
    height: "32px",
    backgroundColor: "#F5F5F5"
  },
  blackKey: {
    width: "75px",
    height: "16px",
    margin: "-10px 0px",
    backgroundColor: "#696969",
    zIndex: 1,
  },
}));


const list = new Array(49).fill(null).map((_,i) => i) 

const Keyboard = () => {
  const classes = useKeyboardStyles();

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

  const getTop = (rowIndex, keyIndex, originalTop) => {
    return originalTop - gridConf.rowHeight * (basicArray[keyIndex] + 5 * Math.floor(rowIndex/12))
  }

  

  return (
    <List className={classes.root}>
      {list.map(rowIndex => {
  
        let keyIndex = getKeyIndex(rowIndex)
        /* let originalTop = style.top
        let newStyle = Object.assign({}, style)

        newStyle.top = getTop(rowIndex, keyIndex, originalTop) */
        
        return (
          //<Box key={rowIndex} className={classes.cell}>{rowIndex}</Box>
          <Box key={rowIndex} className={clsx(classes.root, classes.cell, isWhiteKey(keyIndex) ? classes.whiteKey : classes.blackKey)}></Box>
        )
      })}
    </List>
  );
}

export default Keyboard