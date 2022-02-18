import React from 'react';
import { createElement } from 'react-native-web';

const WebDatePicker = ({style,currentValue,Changedate}) => (
    createElement('input', {
        type: 'date',
        value: currentValue,
        style: style,
        onChange: (event) => {Changedate(event.target.value)},
    })
);

export default WebDatePicker;