import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Grid as MuiGrid } from '@material-ui/core'

export const Grid = ({spPortrait, spLandscape, pc, ...other}) => {
  const spPortraitClass = spPortrait ? `MuiGrid-grid-spPortrait-${spPortrait}` : null;
  const spLandscapeClass = spLandscape ? `MuiGrid-grid-spLandscape-${spLandscape}` : null;
  const pcClass = pc ? `MuiGrid-grid-pc-${pc}` : null;
  return <MuiGrid className={clsx(spPortraitClass, spLandscapeClass, pcClass)} {...other} />;
} 

Grid.propTypes = {
  spPortrait: PropTypes.number,
  spLandscape: PropTypes.number,
  pc: PropTypes.number
}