import React from 'react'
import { Grid, Slider } from '@material-ui/core'
import { connect } from 'react-redux'
import { change } from './Store'
import CustomSlider from './CustomSlider'

class App extends React.Component {

    constructor(props){
        super(props)
    }

    handleChange = (event, newValue) => {
        this.props.dispatch(change(event, newValue))
    }

    handleChange_another = (event, newValue) => {
        this.props.dispatch(change(event, newValue))
    }

    s = {
        height: "50px"
    }

    renderSlider(obj){
        return (
            <CustomSlider
                id={obj.id}
                step={obj.step}
                max={obj.max}
                onChange={(event, newValue) => this.handleChange(event, newValue)}
                value={obj.value} />
        )
    }

    render(){
        return(
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CustomSlider
                            id={this.props.conf.width.id}
                            step={this.props.conf.width.step}
                            max={this.props.conf.width.max}
                            onChange={(event, newValue) => this.handleChange(event, newValue)}
                            value={this.props.conf.width.value} />
                        <div style={this.s}></div>
                        <CustomSlider
                            id={this.props.conf.height.id}
                            step={this.props.conf.height.step}
                            max={this.props.conf.height.max}
                            onChange={(event, newValue) => this.handleChange(event, newValue)}
                            value={this.props.conf.height.value} />
                        <div style={this.s}></div>
                        <Slider 
                            id={this.props.conf.width.id}
                            step={this.props.conf.width.step}
                            max={this.props.conf.width.max}
                            onChange={(event, newValue) => this.handleChange_another(event, newValue)}
                            value={this.props.conf.width.value} />
                    </Grid>
                    <Grid item xs={6}>
                        <div>test</div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

App = connect((state) => state)(App)
export default App