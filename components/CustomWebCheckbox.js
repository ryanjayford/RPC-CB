import React from 'react';
import { createElement } from 'react-native-web';

const WebCheckBox = ({style,currentValue,checkCheck}) => (
    createElement('input', {
        type: 'checkbox',
        checked: currentValue,
        style: style,
        onChange: (event) => {checkCheck()},
    })
);

export default WebCheckBox;