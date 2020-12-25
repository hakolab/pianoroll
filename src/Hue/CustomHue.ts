import { Component } from "react";
import {HuePicker,HuePickerProps} from 'react-color'

export interface CustomHuePickerProps extends HuePickerProps {
    id?: string
}

export default class CustomHuePicker extends Component<CustomHuePickerProps> { }