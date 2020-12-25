import React from 'react'
import { HuePicker, AlphaPicker } from 'react-color'
import { Box, Grid } from '@material-ui/core' 
import CustomHuePicker from './Hue/CustomHue'

class App extends React.Component {
    state = {
        pickerColor: "#FF0000",
        box: {
            backgroundColor: "#FF0000" 
        }
    }

    handleChangeComplete = (color, event) => {
        this.setState({
            pickerColor: color.hex,
            box: {
                backgroundColor: color.hex
            }
        })
    }

    render(){
        return(
            <div>
                <div style={this.state.box}>test</div>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <CustomHuePicker
                            color={this.state.pickerColor}
                            onChangeComplete={this.handleChangeComplete}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default App