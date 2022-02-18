import React from 'react';
import { createElement } from 'react-native-web';

const WebDatePicker = ({style,Isdisabled,currentValue,Changedate}) => (
    createElement('input', {
        type: 'date',
        disabled: Isdisabled,
        value: currentValue,
        style: style,
        onChange: (event) => {Changedate(event.target.value)},
    })
);

export default WebDatePicker;