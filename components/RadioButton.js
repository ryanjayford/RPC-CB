/**
 * khristler: 4/12/2022
 * info: Custom Radio Button
 *  
 * Props:
        data:               Array of object use to display the radio buttons, 
                            *Sample format: 
                                -   [
                                        { id: 1, name: "Yes" },
                                        { id: 2, name: "No" }
                                    ]
        onSelect:           function use when radio button is clicked *Required*, 
                            *Sample format: 
                                - onSelect={(item) => {alert(item.id)}}

        value:              Use for the current active radio button, when not use all radio buttons will be blank, 
        ContainerStyle:     Style for the container of all the radio buttons, 
        InnerStyle:         Style for the inner circle of the radio buttons, 
        OuterStyle:         Style for the outer circle of the radio buttons, 
        TextStyle:          Style for the text of the radio buttons, 
*/

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default ({ data, onSelect, value, ContainerStyle, InnerStyle, OuterStyle, TextStyle }) => {

    const [RadioData, setRadioData] = useState(data);

    React.useEffect(() => {
        setRadioData(data)
    }, [data]);

    const RadioButton = ({ onPress, selected, id, children }) => {
        return (
            <View style={styles.radioButtonContainer}>
                <TouchableOpacity onPress={onPress} disabled={selected === id ? true : false} style={[styles.radioButton,OuterStyle]}>
                    {selected === id ? <View style={[styles.radioButtonIcon,InnerStyle]} /> : null}
                </TouchableOpacity>
                <TouchableOpacity disabled={selected === id ? true : false} onPress={onPress}>
                    <Text style={[styles.radioButtonText,TextStyle]}>{children}</Text>
                </TouchableOpacity>
            </View>
        );
    };

  return (
    <>
        {RadioData !== undefined ?
            <View style={ContainerStyle}>
                {RadioData.map((item) => (
                    <RadioButton
                        onPress={() => onSelect(item)}
                        selected={value}
                        key={item.id}
                        id={item.id}
                    >
                        {item.name}
                    </RadioButton>
                ))}
            </View>
            :
            null
        }
    </>
  );  
} 

const styles = StyleSheet.create({
    radioButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 25,
        marginBottom: 2.5,
        marginTop: 2.5
    },
    radioButton: {
        height: 20,
        width: 20,
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E6E6E6",
        alignItems: "center",
        justifyContent: "center"
    },
    radioButtonIcon: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: "#98CFB6"
    },
    radioButtonText: {
        fontSize: 16,
        marginLeft: 16
    }
})