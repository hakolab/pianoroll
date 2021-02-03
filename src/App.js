import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { Box, Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Stamp from './Stamp';

const ButtonLikeTab = withStyles({
    root: {
        width: "150px",
        borderRadius: "0",
    }
})(Button)

export default function App(){
    return (
        <Router>
            <Box display="flex" flexDirection="row">
                <Box flexGrow={1}>
                    <Link to="/Demo">
                        <Brightness7Icon />
                    </Link>
                </Box>
                <Box>
                    <Link to="/Demo" style={{textDecoration: "none"}}>
                        <ButtonLikeTab size="large">
                            Stamp
                        </ButtonLikeTab>
                    </Link>
                </Box>
                <Box>
                    <Link to="/Demo/gallery" style={{textDecoration: "none"}}>
                        <ButtonLikeTab size="large">
                            Gallery
                        </ButtonLikeTab>
                    </Link>
                </Box>
                <Box>
                    <Link to="/Demo/about" style={{textDecoration: "none"}}>
                        <ButtonLikeTab size="large">
                            About
                        </ButtonLikeTab>
                    </Link>
                </Box>
            </Box>

                <Route exact path="/Demo">
                    <Stamp />
                </Route>
                <Route path="/Demo/gallery">
                    Stamps written by various people.
                </Route>
                <Route path="/Demo/about">
                    About Stamp
                </Route>

        </Router>
    )
}