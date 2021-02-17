import React, { Fragment, useEffect, useState, useMemo } from 'react'
import { Box } from '@material-ui/core'

const style = {
    width: "150px",
    height: "30px",
    backgroundColor: "grey",
}

const styleClick = {
    width: "150px",
    height: "30px",
    backgroundColor: "blue",
}

const Grids = React.memo((props) => {
    //const grids = new Array(config.gridWidth).fill(null).map((_,i) => ({index: i, tiles: new Array(config.tileHeight).fill(null).map((_,i) => ({index: i, active: false}))}))
    console.log('grids')
    /* const handleClick = (grid) => {
        let newGrids = grids.slice()
        console.log(newGrids)
        
        newGrids[grid.index] = grid
        setGrids(newGrids)
    } */
    
    return (
        <Box display="flex" flexDirection="row">
            {props.grids.map((grid, index) => {
                return (
                    <Grid key={index} grid={grid} /* onClick={handleClick} */></Grid>
                    )
                })}
        </Box>
    )
})

export default Grids

const Grid = React.memo((props) => {
    console.log('grid')
    const [grid, setGrid] = useState(props.grid)
    
    const handleClick = (tiles) => {
        let newGrid = Object.assign({}, props.grid)
        newGrid.tiles = tiles
        //props.onClick(newGrid)
        setGrid(newGrid)
    }
    
    return (
        <Box>
            <Tiles tiles={grid.tiles} onClick={handleClick}></Tiles>
        </Box>
    )
})

const Tiles = (props) => {
    
    const handleClick = (tile) => {
        let newTiles = props.tiles.slice()
        newTiles[tile.index] = tile
        props.onClick(newTiles)
    }

    return (
        <Fragment>
            {props.tiles.map((tile) => {
                return (
                    <Tile key={tile.index} onClick={handleClick} tile={tile}></Tile>
                )
            })}
        </Fragment>
    )
}

const Tile = (props) => {

    const handleClick = () => {
        let newTile = Object.assign({}, props.tile)
        newTile.active = !newTile.active
        props.onClick(newTile)
    }

    return <Box style={style} onClick={handleClick}></Box>
}

/* 
const Tiles = () => {
    //const tiles = new Array(config.tileHeight).fill(null).map((_,i) => ({index: i, active: "false"}))
    const tiles = new Array(config.tileHeight).fill(false)

    function handleClick(index){
        tiles[index] = true
        console.log(tiles)
    }

    return (
        <Fragment>
            {tiles.map((tile, index) => {
                return <Tile key={index} onClick={() => handleClick(index)}>tile{index + ' ' + tile}</Tile>
            })}
        </Fragment>
    )
} */